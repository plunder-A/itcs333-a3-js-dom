(function () {
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo-btn');
    const todoList = document.getElementById('todo-list');
    const errorMsg = document.getElementById('error-msg');
    const counter = document.getElementById('counter');

    const filterAll = document.getElementById('filter-all');
    const filterActive = document.getElementById('filter-active');
    const filterDone = document.getElementById('filter-done');

    let currentFilter = 'all';

    function addTodo() {
        const text = todoInput.value.trim();
        if (!text) {
            errorMsg.classList.remove('hidden');
            errorMsg.style.display = 'block';
            return;
        }

        errorMsg.classList.add('hidden');
        errorMsg.style.display = 'none';

        const li = document.createElement('li');
        li.innerHTML = `<span class="item-text">${text}</span><button class="delete-btn">Delete</button>`;
        todoList.appendChild(li);

        todoInput.value = '';
        updateCounter();
        applyFilter();
    }

    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            e.target.closest('li').remove();
            updateCounter();
        } else {
            const li = e.target.closest('li');
            if (li) {
                li.classList.toggle('completed');
                updateCounter();
                applyFilter();
            }
        }
    });

    function updateCounter() {
        const activeCount = todoList.querySelectorAll('li:not(.completed)').length;
        counter.textContent = `${activeCount} item(s) left`;
    }

    function applyFilter() {
        const items = todoList.querySelectorAll('li');
        items.forEach((li) => {
            const isCompleted = li.classList.contains('completed');
            if (currentFilter === 'all') {
                li.style.display = '';
            } else if (currentFilter === 'active') {
                li.style.display = isCompleted ? 'none' : '';
            } else if (currentFilter === 'done') {
                li.style.display = isCompleted ? '' : 'none';
            }
        });
    }

    function setFilter(filter, activeBtn) {
        currentFilter = filter;
        [filterAll, filterActive, filterDone].forEach((btn) => btn.classList.remove('active'));
        activeBtn.classList.add('active');
        applyFilter();
    }

    filterAll.addEventListener('click', () => setFilter('all', filterAll));
    filterActive.addEventListener('click', () => setFilter('active', filterActive));
    filterDone.addEventListener('click', () => setFilter('done', filterDone));

    updateCounter();
})();