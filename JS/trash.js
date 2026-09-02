let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const deletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || [];

const azi = document.querySelector(".azi");
const maine = document.querySelector(".maine");
const candva = document.querySelector(".candva");
const deleteAll = document.querySelector(".clear-all");

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const aziString = today.getFullYear() + "-" +
  String(today.getMonth() + 1).padStart(2, "0") + "-" +
  String(today.getDate()).padStart(2, "0");

const maineString = tomorrow.getFullYear() + "-" +
  String(tomorrow.getMonth() + 1).padStart(2, "0") + "-" +
  String(tomorrow.getDate()).padStart(2, "0");

const taskuriAzi = [];
const taskuriMaine = [];
const taskuriCandva = [];

for (const task of deletedTasks) {
  if (task[1] === aziString) taskuriAzi.push(task);
  else if (task[1] === maineString) taskuriMaine.push(task);
  else taskuriCandva.push(task);
}

function createDeletedTask(task, container) {
  const delElem = document.createElement("div");
  delElem.textContent = task[0];
  delElem.classList.add("delitem");
  container.appendChild(delElem);

  const dele = document.createElement("button");
  dele.textContent = "X";
  dele.classList.add("delete");
  delElem.appendChild(dele);

  const redo = document.createElement("button");
  redo.textContent = "↻";
  redo.classList.add("inapoi");
  delElem.appendChild(redo);

  dele.addEventListener("click", () => {
    const index = deletedTasks.findIndex(item =>
      item[0] === task[0] &&
      item[1] === task[1] &&
      item[2] === task[2]
    );

    if (index !== -1) {
      deletedTasks.splice(index, 1);
      localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
    }

    delElem.remove();
  });

  redo.addEventListener("click", () => {
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    const index = deletedTasks.findIndex(item =>
      item[0] === task[0] &&
      item[1] === task[1] &&
      item[2] === task[2]
    );

    if (index !== -1) {
      deletedTasks.splice(index, 1);
      localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
    }

    delElem.remove();
  });
}

for (const task of taskuriAzi) createDeletedTask(task, azi);
for (const task of taskuriMaine) createDeletedTask(task, maine);
for (const task of taskuriCandva) createDeletedTask(task, candva);

deleteAll.addEventListener("click", () => {
  deletedTasks.length = 0;
  localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));

  azi.innerHTML = "";
  maine.innerHTML = "";
  candva.innerHTML = "";
});