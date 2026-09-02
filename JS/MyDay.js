let today = new Date();
let todayi = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + 
                  String(today.getDate()).padStart(2, "0");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let aziTask = tasks.filter(task => task[1] === todayi);
const clearAll = document.querySelector(".clear-all");
for(let i=0;i<aziTask.length;i++)
{
  let ora = Number(aziTask[i][2].split(":")[0]);
  if(ora === 0) ora = 24;
  let id = String(ora);
  const undea = document.getElementById(id);
  const box = document.createElement("div");
  box.classList.add("delitem");
  box.textContent = aziTask[i][0];
  undea.appendChild(box);
  const dele = document.createElement("button");
  dele.classList.add("delete");
  dele.textContent = "X";
  box.appendChild(dele);
  dele.addEventListener("click", () => {
    
    const deletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || [];

    deletedTasks.push(aziTask[i]);

    localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));

    const index = tasks.findIndex(task => task[0]=== aziTask[i][0] &&
                                  task[1] === aziTask[i][1] &&
                                  task[2] === aziTask[i][2] )

    if(index!=-1)
    {
      tasks.splice(index,1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    box.remove();
  });
}

clearAll.addEventListener("click", () => {
    localStorage.removeItem("tasks");
    location.reload();
});