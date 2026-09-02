let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const deletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || [];
const azi = document.querySelector(".azi");
const maine = document.querySelector(".maine");
const candva = document.querySelector(".candva");
const deleteAll = document.querySelector(".clear-all");

const today = new Date();

const tomorrow = new Date();

tomorrow.setDate(tomorrow.getDate() + 1);

const aziString = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + 
                  String(today.getDate()).padStart(2, "0");

const maineString = tomorrow.getFullYear() + "-" + String(tomorrow.getMonth() + 1).padStart(2, "0") + "-" + 
                    String(tomorrow.getDate()).padStart(2, "0");
        
const taskuriAzi = [];
const taskuriMaine = [];
const taskuriCandva = [];

for(let i=0 ;i<deletedTasks.length; i++)
{
  if(deletedTasks[i][1] === aziString)
  {
    taskuriAzi.push(deletedTasks[i]);
  }
  else if(deletedTasks[i][1] === maineString)
  {
    taskuriMaine.push(deletedTasks[i]);
  }
  else
  {
    taskuriCandva.push(deletedTasks[i]);
  }
}

for(let i=0;i<taskuriAzi.length;i++)
{
  const delElem = document.createElement("div");
  delElem.textContent = taskuriAzi[i][0];
  delElem.classList.add("delitem");
  azi.appendChild(delElem);
  const dele = document.createElement("button");
  dele.textContent = "X";
  dele.classList.add("delete");
  delElem.appendChild(dele);
  const redo = document.createElement("button");
  redo.textContent = "↻";
  redo.classList.add("inapoi");
  delElem.appendChild(redo);
  dele.addEventListener ("click", () => {
    const index = deletedTasks.findIndex(task => task[0] === taskuriAzi[i][0] && task[1] === taskuriAzi[i][1] 
      && task[2] === taskuriAzi[i][2]);
    if(index !== -1)
    {
      deletedTasks.splice(index,1);
      localStorage.setItem(
        "deletedTasks",
        JSON.stringify(deletedTasks)
      );
    }
    delElem.remove();
  });
  redo.addEventListener ("click" , () => {
      const task = taskuriAzi[i];

      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      const index = deletedTasks.findIndex(item =>
        item[0] === task[0] &&
        item[1] === task[1] &&
        item[2] === task[2]
      );

      if(index !== -1)
      {
        deletedTasks.splice(index, 1);
        localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
      }

      delElem.remove();
  });
}

for(let i=0;i<taskuriMaine.length;i++)
{
  const delElem = document.createElement("div");
  delElem.textContent = taskuriMaine[i][0];
  delElem.classList.add("delitem");
  maine.appendChild(delElem);
  const dele = document.createElement("button");
  dele.textContent = "X";
  dele.classList.add("delete");
  delElem.appendChild(dele);
  const redo = document.createElement("button");
  redo.textContent = "↻";
  redo.classList.add("inapoi");
  delElem.appendChild(redo);
  dele.addEventListener ("click", () => {
   const index = deletedTasks.findIndex(task => task[0] === taskuriMaine[i][0] && task[1] === taskuriMaine[i][1] 
      && task[2] === taskuriMaine[i][2]);
    if(index !== -1)
    {
      deletedTasks.splice(index,1);
      localStorage.setItem(
        "deletedTasks",
        JSON.stringify(deletedTasks)
      );
    }
    delElem.remove();
});
  redo.addEventListener ("click" , () => {
      const task = taskuriMaine[i];

      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      const index = deletedTasks.findIndex(item =>
        item[0] === task[0] &&
        item[1] === task[1] &&
        item[2] === task[2]
      );

      if(index !== -1)
      {
        deletedTasks.splice(index, 1);
        localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
      }

      delElem.remove();
  });
}

for(let i=0;i<taskuriCandva.length;i++)
{
  const delElem = document.createElement("div");
  delElem.textContent = taskuriCandva[i][0];
  delElem.classList.add("delitem");
  candva.appendChild(delElem);
  const dele = document.createElement("button");
  dele.textContent = "X";
  dele.classList.add("delete");
  delElem.appendChild(dele);
  const redo = document.createElement("button");
  redo.textContent = "↻";
  redo.classList.add("inapoi");
  delElem.appendChild(redo);
  dele.addEventListener ("click", () => {
    const index = deletedTasks.findIndex(task => task[0] === taskuriCandva[i][0] && task[1] === taskuriCandva[i][1] 
      && task[2] === taskuriCandva[i][2]);
    if(index !== -1)
    {
      deletedTasks.splice(index,1);
      localStorage.setItem(
        "deletedTasks",
        JSON.stringify(deletedTasks)
      );
    }
    delElem.remove();
});
  redo.addEventListener ("click" , () => {
      const task = taskuriCandva[i];

      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      const index = deletedTasks.findIndex(item =>
        item[0] === task[0] &&
        item[1] === task[1] &&
        item[2] === task[2]
      );

      if(index !== -1)
      {
        deletedTasks.splice(index, 1);
        localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
      }

      delElem.remove();
  });
}

deleteAll.addEventListener("click", () => {
  deletedTasks.length = 0;

  localStorage.setItem(
    "deletedTasks",
    JSON.stringify(deletedTasks)
  );

  azi.innerHTML="";
  maine.innerHTML="";
  candva.innerHTML="";  
});





