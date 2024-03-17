document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const taskDateTime = document.getElementById("taskDateTime");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const extendMap = new Map(); // Store task names and their last extended times
  
    // Function to add a task to the list
    function addTask(task, dateTime) {
      const li = document.createElement("li");
      const taskText = document.createElement("span");
      taskText.textContent = `${task} - Due: ${dateTime}`;
      li.appendChild(taskText);
  
      const extendBtn = document.createElement("button");
      extendBtn.textContent = "Extend Time";
      extendBtn.addEventListener("click", function () {
        extendTaskTime(task, dateTime, li);
      });
      li.appendChild(extendBtn);
  
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete Task";
      deleteBtn.addEventListener("click", function () {
        li.remove();
      });
      li.appendChild(deleteBtn);
  
      taskList.appendChild(li);
  
      scheduleNotification(task, dateTime, task, true); // 5 minutes prior reminder
    }
  
    // Function to schedule and send notifications
    function scheduleNotification(task, dateTime, message, isReminder) {
      // ... (unchanged from previous code)
    }
  
    // Function to extend task time by one hour
    function extendTaskTime(task, dateTime, li) {
      const currentTime = new Date().getTime();
      const lastExtendedTime = extendMap.get(task) || 0;
      const timeDifference = currentTime - lastExtendedTime;
  
      if (timeDifference >= 3300000) { // Allow extension once every 55 minutes (55 * 60 * 1000 = 3300000 milliseconds)
        const taskTime = new Date(dateTime);
        taskTime.setHours(taskTime.getHours() + 1);
        const taskText = li.querySelector('span');
        taskText.textContent = `${task} - Due: ${taskTime}`;
        scheduleNotification(task, taskTime, task, false);
        extendMap.set(task, currentTime);
      } else {
        alert("You can extend the task only once every 55 minutes.");
      }
    }
  
    // Event listener for adding a task
    addTaskBtn.addEventListener("click", function () {
      const task = taskInput.value.trim();
      const dateTime = taskDateTime.value;
  
      if (task !== "" && dateTime !== "") {
        addTask(task, dateTime);
        taskInput.value = "";
        taskDateTime.value = "";
      } else {
        alert("Please enter a task and set a date and time!");
      }
    });
  
    // Request permission for notifications
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  });
  