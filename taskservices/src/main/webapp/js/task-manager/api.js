// For some reason it doesn't work to import these functions to controller.js...
// For now, the functions are in the controller.js file.

const baseUrl = "/taskservices/api/services";

export const getAllTasks = async () => {
    try {
        const url = `${baseUrl}/tasklist`;
        const response = await fetch(url, {method: "get"});
        const json = await response.json();

        return json.tasks;
    } catch {
        return [];
    }
}

export const getAllStatuses = async () => {
    try {
        const url = `${baseUrl}/allstatuses`;
        const response = await fetch(url, {method: "get"});
        const json = await response.json();

        return json.allstatuses;
    } catch {
        return [];
    }
}
