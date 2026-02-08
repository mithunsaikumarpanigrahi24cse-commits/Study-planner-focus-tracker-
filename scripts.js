let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let timerInterval = null;
let totalSeconds = 0;

 // Adding the tasks
function addTask(){
    let subject = document.getElementById("subject").value;
    let topic = document.getElementById("topic").value;
    let time = document.getElementById("time").value;
    let priority = document.getElementById("priority").value;

    if (subject === "" || topic === "" || time === ""){  //filling all fields is necessary
        alert("Please fill all fields");
        return;
    }

    let task ={
        id: Date.now(),
        subject,
        topic,
        time,
        priority,
        completed: false
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
    clearInputs();
}
  // for displaying the input tasks ,a function
function displayTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {              // arrow function i am using here
        let li = document.createElement("li");
      li.innerHTML = `
  <div>
    <strong>${task.subject}</strong> - ${task.topic}
    <br>
    <small>${task.time} min | Priority: ${task.priority}</small>
  </div>
  <div>
    <button onclick="markComplete(${task.id})">Completed</button>
    <button onclick="deleteTask(${task.id})">Delete</button>
  </div>
`;

        if (task.completed) {
            li.style.textDecoration = "line-through";
        }

        taskList.appendChild(li);
    });
}

function markComplete(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: true } : task
    );

    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function clearInputs() {
    document.getElementById("subject").value = "";
    document.getElementById("topic").value = "";
    document.getElementById("time").value = "";
}
 
// Start Timer function

function updateTimerDisplay() {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const h = hours.toString().padStart(2, "0");
  const m = minutes.toString().padStart(2, "0");
  const s = seconds.toString().padStart(2, "0");

  document.getElementById("timer").innerText = `${h}:${m}:${s}`;
}

function startTimer() {
  if (timerInterval !== null) return;

  timerInterval = setInterval(() => {
    totalSeconds++;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  stopTimer();
  totalSeconds = 0;
  updateTimerDisplay();
}

 
displayTasks();