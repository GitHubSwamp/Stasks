const ele = document.querySelector(".month");
const spate = document.querySelector("#ba");
const fata = document.querySelector("#fa");
const lun = document.querySelector("#a1");
const marti = document.querySelector("#a2");
const miercuri = document.querySelector("#a3");
const joi = document.querySelector("#a4");
const vineri = document.querySelector("#a5");
const sambata = document.querySelector("#a6");
const duminica = document.querySelector("#a0");

let luni = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

let zileLuna = [
    31, 28, 31, 30, 31, 30,
    31, 31, 30, 31, 30, 31
];

let data = new Date();
let pozcur = data.getMonth();

ele.textContent = luni[pozcur];

function genereazaLuna() {
    let date = new Date(2026, pozcur, 1);
    let primaZi = (date.getDay() + 6) % 7;

    ele.textContent = luni[pozcur];

    for(let i = 0; i < primaZi; i++)
    {
        let divv = document.createElement("div");
        divv.classList.add("elementspec");

        if(i == 0)
            lun.appendChild(divv);
        else if(i == 1)
            marti.appendChild(divv);
        else if(i == 2)
            miercuri.appendChild(divv);
        else if(i == 3)
            joi.appendChild(divv);
        else if(i == 4)
            vineri.appendChild(divv);
        else if(i == 5)
            sambata.appendChild(divv);
    }

    for(let i = 1; i <= zileLuna[pozcur]; i++)
    {
        let divo = document.createElement("div");
        divo.classList.add("element");

        if(primaZi == 6)
            duminica.appendChild(divo);
        else if(primaZi == 0)
            lun.appendChild(divo);
        else if(primaZi == 1)
            marti.appendChild(divo);
        else if(primaZi == 2)
            miercuri.appendChild(divo);
        else if(primaZi == 3)
            joi.appendChild(divo);
        else if(primaZi == 4)
            vineri.appendChild(divo);
        else if(primaZi == 5)
            sambata.appendChild(divo);

        divo.textContent = i;

        let luna = String(pozcur + 1).padStart(2, "0");
        let zi = String(i).padStart(2, "0");

        let dataZi = `2026-${luna}-${zi}`;

        divo.addEventListener("mouseenter", () => {

            // Verificăm taskurile actuale din localStorage
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

            let taskuriZi = tasks.filter(task => task[1] === dataZi);

            // Dacă nu mai există taskuri, nu facem nimic
            if(taskuriZi.length === 0)
                return;

            let taskElem = null;
            let mousePeZi = true;
            let mousePeMeniu = false;
            let timeoutMeniu = null;

            function inchideMeniu() {
                timeoutMeniu = setTimeout(() => {
                    if(!mousePeZi && !mousePeMeniu && taskElem)
                    {
                        taskElem.remove();
                        taskElem = null;
                    }
                }, 100);
            }

            taskElem = document.createElement("div");
            taskElem.classList.add("taskElem");

            let taskuriSortate = [...taskuriZi];

            taskuriSortate.sort((a, b) => {
                return a[2].localeCompare(b[2]);
            });

            for(let j = 0; j < taskuriSortate.length; j++)
            {
                let elemDeTask = document.createElement("div");
                elemDeTask.classList.add("elemDeTask");

                const ora = document.createElement("div");
                ora.classList.add("ora");
                ora.textContent = taskuriSortate[j][2];

                const task = document.createElement("div");
                task.classList.add("task");
                task.textContent = taskuriSortate[j][0];

                const dele = document.createElement("button");
                dele.classList.add("delete");
                dele.textContent = "×";

                dele.addEventListener("click", () => {

                    let tasksActuale =
                        JSON.parse(localStorage.getItem("tasks")) || [];

                    let deletedTasks =
                        JSON.parse(localStorage.getItem("deletedTasks")) || [];

                    const index = tasksActuale.findIndex(t =>
                        t[0] === taskuriSortate[j][0] &&
                        t[1] === taskuriSortate[j][1] &&
                        t[2] === taskuriSortate[j][2]
                    );

                    if(index !== -1)
                    {
                        deletedTasks.push(tasksActuale[index]);

                        tasksActuale.splice(index, 1);

                        localStorage.setItem(
                            "tasks",
                            JSON.stringify(tasksActuale)
                        );

                        localStorage.setItem(
                            "deletedTasks",
                            JSON.stringify(deletedTasks)
                        );

                        elemDeTask.remove();

                        // Verificăm dacă mai există taskuri pentru ziua respectivă
                        let tasksRamase =
                            JSON.parse(localStorage.getItem("tasks")) || [];

                        let taskuriRamase = tasksRamase.filter(
                            task => task[1] === dataZi
                        );

                        if(taskuriRamase.length === 0)
                        {
                            taskElem.remove();
                            taskElem = null;
                        }
                    }
                });

                elemDeTask.appendChild(ora);
                elemDeTask.appendChild(task);
                elemDeTask.appendChild(dele);

                taskElem.appendChild(elemDeTask);
            }

            document.body.appendChild(taskElem);

            taskElem.style.display = "flex";

            let poz = divo.getBoundingClientRect();

            let menuWidth = taskElem.offsetWidth;
            let menuHeight = taskElem.offsetHeight;

            let left;
            let top;

            if(poz.right + menuWidth <= window.innerWidth - 10)
            {
                left = poz.right + 10;
            }
            else
            {
                left = poz.left - menuWidth - 10;
            }

            if(left < 10)
                left = 10;

            if(left + menuWidth > window.innerWidth - 10)
                left = window.innerWidth - menuWidth - 10;

            top = poz.top;

            if(top + menuHeight > window.innerHeight - 10)
                top = window.innerHeight - menuHeight - 10;

            if(top < 10)
                top = 10;

            taskElem.style.left = left + "px";
            taskElem.style.top = top + "px";

            taskElem.addEventListener("mouseenter", () => {
                mousePeMeniu = true;

                if(timeoutMeniu)
                    clearTimeout(timeoutMeniu);
            });

            taskElem.addEventListener("mouseleave", () => {
                mousePeMeniu = false;
                inchideMeniu();
            });

            divo.addEventListener("mouseleave", () => {
                mousePeZi = false;
                inchideMeniu();
            }, { once: true });
        });

        primaZi = (primaZi + 1) % 7;
    }
}

genereazaLuna();

spate.addEventListener("click", () => {
    if(pozcur >= 1)
        pozcur--;
    else
        pozcur = 11;

    lun.innerHTML = "";
    marti.innerHTML = "";
    miercuri.innerHTML = "";
    joi.innerHTML = "";
    vineri.innerHTML = "";
    sambata.innerHTML = "";
    duminica.innerHTML = "";

    genereazaLuna();
});

fata.addEventListener("click", () => {
    if(pozcur <= 10)
        pozcur++;
    else
        pozcur = 0;

    lun.innerHTML = "";
    marti.innerHTML = "";
    miercuri.innerHTML = "";
    joi.innerHTML = "";
    vineri.innerHTML = "";
    sambata.innerHTML = "";
    duminica.innerHTML = "";

    genereazaLuna();
});