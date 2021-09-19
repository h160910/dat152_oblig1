import "./components/task-list.js"
import "./components/task-box.js"

const baseUrl = "/taskservices/api/services";

const tasklist = document.querySelector('task-list');
const taskbox = document.querySelector('task-box');

// Get all tasks and statuses from server
const tasks = await getAllTasks();

// Statuses are hardcoded in task-list and task-box
const allStatuses = await getAllStatuses();

// When connection with server is ok, enable the new task button
tasklist.enableaddtask();

// Tell tasklist to display tasks
tasklist.showTasks(tasks, allStatuses);

// Add callbacks
tasklist.addtaskCallback(() => {
    console.log("new task button click");
    taskbox.show();
});

tasklist.changestatusCallback( async(task) => {
    if(!window.confirm(`Do you want to change the status of ${task.title} to ${task.newStatus}?`)) return;

    console.log(`status of task ${task.id} changed to ${task.newStatus}.`);
    const response = await updateTaskStatus(task.id, task.newStatus);
    tasklist.updateTask(JSON.parse(response));
});

tasklist.deletetaskCallback( async (task) => {
    if(!window.confirm(`Do you want to delete "${task.title}"?`)) return;
    console.log(`delete task ${task.id}`);
    const response = await deleteMember(task.id);
    const deletedTask = JSON.parse(response);
    tasklist.removeTask(deletedTask.id);
})

taskbox.newtaskCallback( async (task) => {
    console.log(`Added new task: ${task.title}.`);
    taskbox.close();
    const response = await addTask(task.title, task.status);
    const newTask = JSON.parse(response).task;
    tasklist.showTask(newTask, allStatuses);
})


// API
async function getAllTasks() {
    try {
        const url = `${baseUrl}/tasklist`;
        const response = await fetch(url, {method: "get"});
        const json = await response.json();

        return json.tasks;
    } catch {
        return [];
    }
}

async function getAllStatuses() {
    try {
        const url = `${baseUrl}/allstatuses`;
        const response = await fetch(url, {method: "get"});
        const json = await response.json();

        return json.allstatuses;
    } catch {
        return [];
    }
}

async function updateTaskStatus(id, status) {
    try {
        const url = `${baseUrl}/task/${id}`;

        const data = {
            "status": `${status}`
        };

        const requestSettings = {
            "method": "PUT",
            "headers": { "Content-Type":"application/json; charset=utf-8"},
            "body": JSON.stringify(data),
            "cache": "no-cache",
            "redirect": "error"
        };

        const response = await fetch(url, requestSettings);
        const object = await response.json();

        console.log(`API: Server response: ${JSON.stringify(object)}`);

        return JSON.stringify(object);
    } catch {
        console.log("Got error retrieving data, updateTaskStatus");
    }
}

async function addTask(title, status) {
    try {
        const url = `${baseUrl}/task`;

        const data = {
            "title": `${title}`,
            "status": `${status}`
        };

        const requestSettings = {
            "method": "POST",
            "headers": { "Content-Type":"application/json; charset=utf-8"},
            "body": JSON.stringify(data),
            "cache": "no-cache",
            "redirect": "error"
        };

        const response = await fetch(url, requestSettings);
        const object = await response.json();

        console.log("Object added to database: ", JSON.stringify(object));
        return JSON.stringify(object);

    } catch {
        console.log("error when adding task to database");
    }
}

async function deleteMember(id) {
    try {
        const url = `${baseUrl}/task/${id}`;

        const response = await fetch(url, {method: "delete"});
        const object = await response.json();

        console.log("Deleted object from database: ", JSON.stringify(object));
        return JSON.stringify(object);

    } catch {
        console.log("error when deleting member");
    }
}