class TaskList extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = buildBtnHtml();
    }

    enableaddtask = () => {
        // enables the new task btn
        console.log("New task button enabled.");
        this.shadowRoot.querySelector('.new-task-btn').disabled = false;
    }

    showTasks = (tasks, statuses) => {
        console.log("Showing tasks.");
        this.shadowRoot.innerHTML += buildTasklistHtml(tasks, statuses);
    }

    addtaskCallback = (fn) => {
        const addBtn = this.shadowRoot.querySelector('.new-task-btn');
        addBtn.addEventListener('click', fn);
    }

    changestatusCallback = (fn) => {
        const tasks = this.shadowRoot.querySelectorAll('.change-status');

        // Adds event listener to each drop down menu
        for (let m of tasks) {
            m.addEventListener('change', async () => {
                const task = {
                    id: m.id,
                    newStatus: m.options[m.selectedIndex].text,
                    title: m.title
                };
                // reset the select tag
                this.shadowRoot.querySelector('.change-status').value = "none";
                fn(task);
            });

        }
    }

    deletetaskCallback = (fn) => {
        const deleteBtns = this.shadowRoot.querySelectorAll('.delete-task-btn');

        // Adds event listener to each remove button
        for (let btn of deleteBtns) {
            btn.addEventListener('click', () => {
                const task = {
                    id: btn.id,
                    title: btn.title
                }
                fn(task);
            });
        }
    }

    noTask = () => {
        // necessary??
    }

    // Add the new task to the view
    showTask = (task, statuses) => {
        const list = this.shadowRoot.querySelector('.tasks');
        // TODO the task should be added to the top of the list
        list.innerHTML += buildTaskHtml(task, statuses);

        // TODO add event listeners to modify menu and remove button ??
        const statusMenu = this.shadowRoot.querySelectorAll(`.change-status`);
        for (let m of statusMenu) {
            if(Number(m.id) === task.id) {
                // TODO m.addEventListener()
                return;
            }
        }

        const deleteBtns = this.shadowRoot.querySelectorAll(`.delete-task-btn`);
        for (let b of deleteBtns) {
            if (Number(b.id) === task.id) {
                // TODO b.addEventListener()
                return;
            }
        }
    }

    // Updates the status of a task in the view
    updateTask = (data) => {
        const elem = this.shadowRoot.getElementById(`${data.id}`);
        elem.querySelector('.task-status').innerHTML = `
            ${data.status}
        `;
    }

    // Removes a task from the view
    removeTask = (id) => {
        this.shadowRoot.getElementById(id).remove();
    }

}

const buildBtnHtml = () => {
    return `
    <div>
    <button type="button" class='new-task-btn' disabled>New task</button>
    </div>
    `;
};

const buildTasklistHtml = (tasks, statuses) => {
    return `
    <div>
    <table class="tasks">
        ${tasks.map(task => buildTaskHtml(task, statuses)).join('')}
    </table>
    </div>
    `;
};

const buildTaskHtml = (task, statuses) => {
    // TODO Use a for each to generate the change-status drop down menu
    return `
    <tr class="task" id="${task.id}">
        <td>${task.title}</td>
        <td class="task-status">${task.status}</td>
        <td>
            <select class="change-status" id="${task.id}" title="${task.title}">
                <option value="none" selected disabled hidden>Modify</option>
                <option value="${statuses[0]}">WAITING</option>
                <option value="${statuses[1]}">ACTIVE</option>
                <option value="${statuses[2]}">DONE</option>
            </select>
        </td>
        <td><button type="button" class="delete-task-btn" id="${task.id}" title="${task.title}">Remove</button></td>
    </tr>
    `;
};

window.customElements.define("task-list", TaskList);