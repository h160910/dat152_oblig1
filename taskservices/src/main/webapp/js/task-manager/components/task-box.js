class TaskBox extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({mode: 'open'});

        this.shadowRoot.innerHTML = buildModalHtml();

        const modalStyle = this.shadowRoot.querySelector('.modal').style;
        buildModalStyle(modalStyle);

        const modalContentStyle = this.shadowRoot.querySelector('.modal-content').style;
        buildModalContentStyle(modalContentStyle);
    }

    show = () => {
        this.shadowRoot.querySelector('.modal').style.display = "block";
    }

    close = () => {
        this.shadowRoot.querySelector('.modal').style.display = "none";
    }

    newtaskCallback = (fn) => {
        const addBtn = this.shadowRoot.querySelector('.add-task-btn');
        addBtn.addEventListener('click', () => {
            const title = this.shadowRoot.querySelector('.input-title').value;
            const status = this.shadowRoot.querySelector('.select-status').value;

            const task = {
                title: title,
                status: status
            }

            fn(task);
        });
    }
}

const buildModalHtml = () => {
  return `
    <div class="modal">
        <div class="modal-content">
            <p>Title: <input type="text" class="input-title"></p>
            <p>
            Status: <select name="select-status" class="select-status">
                    <option value="WAITING" selected>WAITING</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="DONE">DONE</option>
                </select>
            </p>
            <button type="button" class="add-task-btn">Add task</button>
        </div>
    </div>
  `;
};

const buildModalStyle = (ms) => {
    ms.display = "none";
    ms.position = "fixed";
    ms.zIndex = "1";
    ms.left = "0";
    ms.top = "0";
    ms.width = "100%";
    ms.height = "100%";
    ms.overflow = "auto";
    ms.backgroundColor = "rgba(0,0,0,0.4)";
};

const buildModalContentStyle = (mcs) => {
    mcs.backgroundColor = "#fefefe";
    mcs.margin = "15% auto";
    mcs.padding = "20px";
    mcs.border = "1px solid #888";
    mcs.width = "50%";
};

window.customElements.define("task-box", TaskBox);