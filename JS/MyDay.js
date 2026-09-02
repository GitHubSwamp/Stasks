const today = new Date();
const todayi = today.getFullYear() + "-" +
  String(today.getMonth() + 1).padStart(2, "0") + "-" +
  String(today.getDate()).padStart(2, "0");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const aziTask = tasks.filter(task => task[1] === todayi);
const clearAll = document.querySelector(".clear-all");

for (const taskData of aziTask) {
  let ora = Number(taskData[2].split(":")[0]);
  if (ora === 0) ora = 24;

  const undea = document.getElementById(String(ora));
  const box = document.createElement("div");
  box.classList.add("delitem");
  box.textContent = taskData[0];
  undea.appendChild(box);

  const dele = document.createElement("button");
  dele.classList.add("delete");
  dele.textContent = "X";
  box.appendChild(dele);

  dele.addEventListener("click", () => {
    const deletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || [];
    deletedTasks.push(taskData);
    localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));

    const index = tasks.findIndex(task =>
      task[0] === taskData[0] &&
      task[1] === taskData[1] &&
      task[2] === taskData[2]
    );

    if (index !== -1) {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    box.remove();
  });
}

clearAll.addEventListener("click", () => {
  localStorage.removeItem("tasks");
  location.reload();
});