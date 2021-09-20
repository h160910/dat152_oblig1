class TaskBox extends HTMLElement {
    allStatuses = [];

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
    }

    show = () => {
        this.shadowRoot.innerHTML = buildModalHtml(this.allStatuses);

        const modal = this.shadowRoot.querySelector('.modal');
        buildModalStyle(modal.style);
        modal.querySelector('.close-modal').addEventListener('click', this.close);

        const overlay = this.shadowRoot.querySelector('.overlay');
        buildOverlayStyle(overlay.style);
        overlay.addEventListener('click', this.close);
    }

    close = () => {
        this.shadowRoot.querySelector('.modal').remove();
        this.shadowRoot.querySelector('.overlay').remove();
    }

    newtaskCallback = (fn) => {
        this.show();

        const addBtn = this.shadowRoot.querySelector('.add-task-btn');
        addBtn.addEventListener('click', () => {
            const title = this.shadowRoot.querySelector('.input-title').value;

            if (title === "") {
                this.shadowRoot.querySelector('.input-error').textContent = "Input error";
                return;
            }
            const status = this.shadowRoot.querySelector('.select-status').value;

            const task = {
                title: title,
                status: status
            }

            this.close();

            fn(task);
        });
    }
}

const buildModalHtml = (statuses) => {
  return `
    <div class="modal">
        <button class="close-modal" style="float:right">&times;</button>
            <p>
                Title: <input type="text" class="input-title">
                <span class="input-error" style="color: red"></span>
            </p>
            <p>
            Status: <select name="select-status" class="select-status">
                     ${statuses.map(status => `<option value="${status}">${status}</option>`).join('')} 
                </select>
            </p>
            <button type="button" class="add-task-btn">Add task</button>
    </div>
    <div class="overlay"></div>
  `;
};

const buildModalStyle = (ms) => {
    ms.display = "block";

    ms.position = "absolute";
    ms.left = "50%";
    ms.top = "50%";
    ms.transform = "translate(-50%, -50%)";
    ms.width = "300px";

    ms.padding = "15px";

    ms.backgroundColor = "white";
    ms.zIndex = "10";
};

const buildOverlayStyle = (ols) => {
    ols.display = "block";

    ols.position = "absolute";
    ols.top = "0";
    ols.left = "0";
    ols.width = "100%";
    ols.height = "100%";

    ols.backgroundColor = "rgba(0,0,0, 0.4)";
    ols.zIndex = "5";
};

window.customElements.define("task-box", TaskBox);