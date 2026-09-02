const input = document.querySelector(".txt");
const addButton = document.querySelector("#add");
const lista = document.querySelector(".lista-prov");
const dateInp = document.querySelector(".date");
const timeInp = document.querySelector(".time");

export let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
export let deletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || [];

function createTask(text, date, time) {
  const task = document.createElement("div");
  task.classList.add("task");
  task.textContent = text;
  task.dataset.date = date;
  task.dataset.time = time;
  lista.appendChild(task);

  const delbut = document.createElement("button");
  delbut.classList.add("delete");
  delbut.textContent = "X";
  task.appendChild(delbut);

  delbut.addEventListener("click", () => {
    const index = tasks.findIndex(item =>
      item[0] === text &&
      item[1] === task.dataset.date &&
      item[2] === task.dataset.time
    );

    if (index !== -1) {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    deletedTasks.push([text, task.dataset.date, task.dataset.time]);
    localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
    task.remove();
  });
}

addButton.addEventListener("click", () => {
  if (input.value.trim() !== "" && dateInp.value !== "" && timeInp.value !== "") {
    const text = input.value;
    tasks.push([text, dateInp.value, timeInp.value]);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    createTask(text, dateInp.value, timeInp.value);
    input.value = "";
  }
});

for (let i = 0; i < tasks.length; i++)
  createTask(tasks[i][0], tasks[i][1], tasks[i][2]);