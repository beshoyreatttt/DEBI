//Declaring Variables
let arrayOfTips = [
  '"Stay positive, work hard, make it happen."',
  '"Take a moment each day to reflect on what you\'re thankful for. This can boost your mood and perspective."',
  '"Drink plenty of water throughout the day. Staying hydrated is essential for physical and mental health."',
  '"Break larger tasks into smaller, manageable goals. This makes them less overwhelming and easier to achieve."',
  '"Aim for 7-9 hours of quality sleep each night to enhance your mood and productivity."',
  '"Spend a few minutes each day practicing mindfulness or meditation to reduce stress and increase awareness."',
  '"Spend a few minutes each day practicing mindfulness or meditation to reduce stress and increase awareness."',
];
let counter = 0;
let tipElement = document.getElementById("dailyTip");
let taskNameInput = document.getElementById("taskNameInput");
let taskDateInput = document.getElementById("taskDateInput");
let taskPriorityInput = document.getElementById("taskPriorityInput");
let arrayOfTasks = [];
let addOrUpdateTaskBtn = document.getElementById("addOrUpdateTaskBtn");
let liElements = "";
let currentElement = 0;
//start tpis Slider
function tipsSlider() {
  tipElement.innerHTML = arrayOfTips[counter++];
  if (counter >= arrayOfTips.length) {
    counter = 0;
  }
  setTimeout(tipsSlider, 30000);
}

tipsSlider();

//end tips Slider

// start create and update
// first get old data from local storage
let item = JSON.parse(localStorage.getItem("tasks"));
if (localStorage.length) {
  for (let i = 0; i < item.length; i++) {
    arrayOfTasks.push(item[i]);
  } 
}


//second render storage elements
showElements();

addOrUpdateTaskBtn.addEventListener('click', function () {
  if (taskNameInput.value&&taskDateInput.value) {
    if (addOrUpdateTaskBtn.innerHTML == "Add Task") {
      create();
    } else {
      update();
    }
  }

});
function emptyInputs() {
  taskNameInput.value = "";
  taskDateInput.value = "";
  taskPriorityInput.value = "Low";
}

function create() {
  let taskObj = {
    taskName: taskNameInput.value,
    taskDate: taskDateInput.value,
    taskPriority: taskPriorityInput.value,
  };
  arrayOfTasks.push(taskObj);
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
  showElements();
  emptyInputs();
}

//read elements and render it on taskList
function showElements() {
  let li = document.getElementById("taskList");
  liElements = "";
  for (let i = 0; i < arrayOfTasks.length; i++) {
    liElements += `<li>
          <div class="task-details">
            <strong>${arrayOfTasks[i].taskName}</strong>
            <span>${arrayOfTasks[i].taskDate}</span>
            <div class="${arrayOfTasks[i].taskPriority}">${arrayOfTasks[i].taskPriority}</div>
          </div>
          <div class="actions">
            <button class="edit">Edite</button>
            <button class="delete">Done</button>
          </div>
         </li>`;
  }

  li.innerHTML = liElements;
  
  // edite event
  let editeBtn = document.querySelectorAll(".edit");
  editeBtn.forEach(function (button, index) {
    button.addEventListener('click', function () {
      currentElement = index;
      addOrUpdateTaskBtn.innerHTML = "Edite Task";
      taskNameInput.value = `${arrayOfTasks[index].taskName}`;
      taskDateInput.value = `${arrayOfTasks[index].taskDate}`;
      taskPriorityInput.value = `${arrayOfTasks[index].taskPriority}`;
    });
  });


  //Delete elements
let deleteElement = document.querySelectorAll(".delete");
deleteElement.forEach(function (button, index) {
  button.addEventListener('click', function () {
    if (addOrUpdateTaskBtn.innerHTML === "Add Task") {
    arrayOfTasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
    showElements();
    }  
  });
});
}

//update elements



function update() {
  arrayOfTasks[currentElement].taskName = taskNameInput.value;
  arrayOfTasks[currentElement].taskDate = taskDateInput.value;
  arrayOfTasks[currentElement].taskPriority = taskPriorityInput.value;
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
  addOrUpdateTaskBtn.innerHTML = "Add Task";
  emptyInputs();
  showElements();
}


