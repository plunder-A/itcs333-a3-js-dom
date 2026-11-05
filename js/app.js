(function () {
  'use strict';

  function init() {
    const form     = document.querySelector('#todo-form');
    const input    = document.querySelector('#todo-input');
    const list     = document.querySelector('#todo-list');
    const errorMsg = document.querySelector('#error-msg');
    const counter  = document.querySelector('#counter');

    let currentFilter = 'all';

    const updateCounter = () => {
      const left = list.querySelectorAll('li:not(.completed)').length;
      counter.textContent = `${left} item(s) left`;
    };

    const applyFilter = () => {
      list.querySelectorAll('li').forEach((li) => {
        const done = li.classList.contains('completed');
        const show =
          currentFilter === 'all' ||
          (currentFilter === 'active' && !done) ||
          (currentFilter === 'done' && done);
        li.classList.toggle('hidden', !show);
      });
    };

    const showError = (visible) => {
      errorMsg.classList.toggle('hidden', !visible);
    };

    const addItem = () => {
      const text = input.value.trim();
      if (text === '') {
        showError(true);
        return;
      }
      showError(false);

      const li = document.createElement('li');

      const span = document.createElement('span');
      span.className = 'item-text';
      span.textContent = text;

      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'delete-btn';
      del.textContent = 'Delete';

      li.append(span, del);
      list.appendChild(li);

      input.value = '';
      applyFilter();
      updateCounter();
    };

    const setFilter = (name) => {
      currentFilter = name;
      applyFilter();
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      addItem();
    });

    list.addEventListener('click', (e) => {
      const li = e.target.closest('li');
      if (!li || !list.contains(li)) return;

      if (e.target.closest('.delete-btn')) {
        li.remove();
      } else {
        li.classList.toggle('completed');
      }
      applyFilter();
      updateCounter();
    });

    document.querySelector('#filter-all')
      .addEventListener('click', () => setFilter('all'));
    document.querySelector('#filter-active')
      .addEventListener('click', () => setFilter('active'));
    document.querySelector('#filter-done')
      .addEventListener('click', () => setFilter('done'));

    showError(false);
    updateCounter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();