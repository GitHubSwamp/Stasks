const input = document.querySelector(".txt");
const addButton = document.querySelector("#add");
const lista = document.querySelector(".lista-prov");
const dateInp = document.querySelector(".date");
const timeInp = document.querySelector(".time");
export let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
export let deletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || [];
addButton.addEventListener("click", () => {
  if(input.value.trim() !== "" && dateInp.value !== "" && timeInp.value !== "")
  {
    const text = input.value;
    tasks.push([text, dateInp.value, timeInp.value]);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    const task = document.createElement("div");
    task.classList.add("task");
    task.textContent = text;
    task.dataset.date = dateInp.value;
    task.dataset.time = timeInp.value;
    lista.appendChild(task);
    const delbut = document.createElement("button");
    delbut.classList.add("delete");
    task.appendChild(delbut);
    delbut.textContent = "X";
    input.value = "";
    delbut.addEventListener("click", () => {
      const index = tasks.findIndex(item =>
      item[0] === text &&
      item[1] === task.dataset.date &&
      item[2] === task.dataset.time
      );

      if(index !== -1)
      {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }

      deletedTasks.push([text, task.dataset.date, task.dataset.time]);
      localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));

      task.remove();
        });
  }
});
for(let i = 0; i < tasks.length; i++)
{
    const text = tasks[i][0];

    const task = document.createElement("div");

    task.classList.add("task");

    task.textContent = tasks[i][0];

    task.dataset.date = tasks[i][1];

    task.dataset.time = tasks[i][2];

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

      if(index !== -1)
      {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }

      deletedTasks.push([text, task.dataset.date, task.dataset.time]);
      localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));

      task.remove();
    });
}