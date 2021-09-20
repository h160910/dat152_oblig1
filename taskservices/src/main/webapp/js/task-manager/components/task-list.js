class TaskList extends HTMLElement {
    allStatuses = [];

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

    showTasks = (tasks) => {
        this.enableaddtask();
        console.log("Showing tasks.");
        this.shadowRoot.innerHTML += buildTasklistHtml(tasks, this.allStatuses);
    }

    addtaskCallback = (fn) => {
        const addBtn = this.shadowRoot.querySelector('.new-task-btn');
        addBtn.addEventListener('click', fn);
    }

    changestatusCallback = (fn) => {
        // selects the <div class="tasks"> element, which is the nearest non-dynamic element to the modify menus
        const rootTaskElement = this.shadowRoot.querySelector('.tasks');

        // adds the event listener to the parent element
        // this is called Event Delegation, which makes it possible to add event listeners to dynamically added elements
        rootTaskElement.addEventListener('change', function(e) {

            // e.target is the clicked element (i.e., the specific modify menu)
            const elem = e.target;

            // if the clicked element matches has class="change-status"
            if (elem && elem.matches('.change-status')) {

                // gathers the data of the task and new status from select menu
                const task = {
                    id: elem.id,
                    newStatus: elem.options[elem.selectedIndex].text,
                    title: elem.title
                };

                // reset the select tag
                elem.value = "none";

                // sends the task to the callback function
                fn(task);
            }
        });
    }

    deletetaskCallback = (fn) => {
        // selects the <div class="tasks"> element, which is the nearest non-dynamic element to the delete buttons
        const rootTaskElement = this.shadowRoot.querySelector('.tasks');

        // event delegation: adds the event listener to the 'parent element'
        rootTaskElement.addEventListener('click', function(e) {

            // e.target is the clicked element (i.e., the specific delete button)
            const btn = e.target;

            // if the clicked element matches has class="delete-task-btn"
            if (btn && btn.matches('.delete-task-btn')) {
                const task = {
                    id: btn.id,
                    title: btn.title
                }
                fn(task);
            }
        });
    }

    noTask = () => {
        // TODO add a message element that has to be updated every time a task is added/removed
    }

    // Add the new task to the view
    showTask = (task) => {
        const list = this.shadowRoot.querySelector('.tasks');
        // TODO the task should be added to the top of the list
        // currently it is added to the bottom
        list.innerHTML += buildTaskHtml(task, this.allStatuses);
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
    <div class="information">
    <button type="button" class='new-task-btn' disabled>New task</button>
    </div>
    <br>
    `;
};

const buildTasklistHtml = (tasks, statuses) => {
    return `
    <div class="tasklist">
    <table class="tasks">
        <tr>
            <th>Task</th>
            <th>Status</th>
            <th></th>
            <th></th>
        </tr>
        ${tasks.map(task => buildTaskHtml(task, statuses)).join('')}
    </table>
    </div>
    `;
};

const buildTaskHtml = (task, statuses) => {
    return `
    <tr class="task" id="${task.id}">
        <td>${task.title}</td>
        <td class="task-status">${task.status}</td>
        <td>
            <select class="change-status" id="${task.id}" title="${task.title}">
                <option value="none" selected disabled hidden>Modify</option>
                ${statuses.map(status => `<option value="${status}">${status}</option>`)}                
            </select>
        </td>
        <td><button type="button" class="delete-task-btn" id="${task.id}" title="${task.title}">Remove</button></td>
    </tr>
    `;
};

window.customElements.define("task-list", TaskList);