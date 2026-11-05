document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo-btn');
    const todoList = document.getElementById('todo-list');
    const errorMsg = document.getElementById('error-msg');
    const counter = document.getElementById('counter');

    let currentFilter = 'all';

    function addTodo() {
        const text = todoInput.value.trim();
        if (text === '') {
            if (errorMsg) errorMsg.style.display = 'block';
            return;
        }
        if (errorMsg) errorMsg.style.display = 'none';

        const li = document.createElement('li');
        li.innerHTML = `
            <span class="todo-text">${text}</span>
            <button class="delete-btn">Delete</button>
        `;
        todoList.appendChild(li);
        todoInput.value = '';
        
        updateCounter();
        applyFilter();
    }

    if (addTodoBtn) {
        addTodoBtn.addEventListener('click', addTodo);
    }
    if (todoInput) {
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTodo();
            }
        });
    }

    if (todoList) {
        todoList.addEventListener('click', (e) => {
            const li = e.target.closest('li');
            if (!li) return;

            if (e.target.classList.contains('delete-btn')) {
                li.remove();
                updateCounter();
            } else {
                li.classList.toggle('completed');
                updateCounter();
            }
        });
    }

    function updateCounter() {
        if (!counter) return;
        const items = todoList.querySelectorAll('li');
        let activeCount = 0;
        items.forEach(item => {
            if (!item.classList.contains('completed')) {
                activeCount++;
            }
        });
        counter.textContent = `${activeCount} item(s) left`;
    }

    function applyFilter() {
        const items = todoList.querySelectorAll('li');
        items.forEach(item => {
            const isCompleted = item.classList.contains('completed');
            if (currentFilter === 'all') {
                item.style.display = '';
            } else if (currentFilter === 'active') {
                item.style.display = isCompleted ? 'none' : '';
            } else if (currentFilter === 'done') {
                item.style.display = isCompleted ? '' : 'none';
            }
        });
    }

    const filterAll = document.getElementById('filter-all');
    const filterActive = document.getElementById('filter-active');
    const filterDone = document.getElementById('filter-done');

    if (filterAll) {
        filterAll.addEventListener('click', () => {
            currentFilter = 'all';
            setActiveFilterBtn(filterAll);
            applyFilter();
        });
    }
    if (filterActive) {
        filterActive.addEventListener('click', () => {
            currentFilter = 'active';
            setActiveFilterBtn(filterActive);
            applyFilter();
        });
    }
    if (filterDone) {
        filterDone.addEventListener('click', () => {
            currentFilter = 'done';
            setActiveFilterBtn(filterDone);
            applyFilter();
        });
    }

    function setActiveFilterBtn(activeBtn) {
        [filterAll, filterActive, filterDone].forEach(btn => {
            if (btn) btn.classList.remove('active');
        });
        if (activeBtn) activeBtn.classList.add('active');
    }

    updateCounter();
});