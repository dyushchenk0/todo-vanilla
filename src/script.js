class ToDo {
  selectors = {
    root: '[data-js-todo]',
    newTaskForm: '[data-js-todo-new-task-form]',
    newTaskInput: '[data-js-todo-new-task-input]',
    searchTaskForm: '[data-js-todo-search-task-form]',
    searchTaskInput: '[data-js-todo-search-task-input]',
    totalTasks: '[data-js-todo-total-tasks]',
    deleteAllButton: '[data-js-todo-delete-all-button]',
    list: '[data-js-todo-list]',
    item: '[data-js-todo-item]',
    itemCheckbox: '[data-js-todo-item-checkbox]',
    itemLabel: '[data-js-todo-item-label]',
    itemDeleteButton: '[data-js-todo-item-delete-button]',
    emptyMessage: '[data-js-todo-empty-message]',
  }

  stateClasses = {
    isVisible: 'is-visible',
    isDisappearing: 'is-disappearing',
  }

  localStorageKey = 'todo-items'

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
    this.newTaskFormElement = this.rootElement.querySelector(this.selectors.newTaskForm)
    this.newTaskInputElement = this.rootElement.querySelector(this.selectors.newTaskInput)
    this.searchTaskFormElement = this.rootElement.querySelector(this.selectors.searchTaskForm)
    this.searchTaskInputElement = this.rootElement.querySelector(this.selectors.searchTaskInput)
    this.totalTasksElement = this.rootElement.querySelector(this.selectors.totalTasks)
    this.deleteAllButtonElement = this.rootElement.querySelector(this.selectors.list)
    this.listElement = this.rootElement.querySelector(this.selectors.newTaskForm)
    this.emptyMessageElement = this.rootElement.querySelector(this.selectors.emptyMessage)
    this.state = {
      items: this.getItemsFromLocalStorage(),
      filteredItems: null,
      searchQuery: '',
    }
    this.render()
  }

  getItemsFromLocalStorage() {
    const rawData = localStorage.getItem(this.localStorageKey)

    if (!rawData) return []

    try {
      const parsedData = JSON.parse(rawData)
      return Array.isArray(parsedData) ? parsedData : []
    } catch {
      console.error('Todo items parse error')
      return []
    }
  }

  saveItemsToLocalStorage() {
    localStorage.setItem(
      this.localStorageKey, JSON.stringify(this.state.items)
    )
  }

  render() {
    this.totalTasksElement.textContent = this.state.items.length

    this.deleteAllButtonElement.classList.toggle(
      this.stateClasses.isVisible,
      this.state.items.length > 0
    )

    const items = this.state.filteredItems ?? this.state.items

    this.listElement.innerHTML = items.map(( id, title, isChecked) => `
    <li
      class="todo__item todo-item"
      data-js-todo-item
    >
      <input
        class="todo-item__checkbox"
        id="${id}"
        type="checkbox"
        ${isChecked ? 'checked' : ''}
        data-js-todo-item-checkbox
      />
      <label
        for="${id}"
        class="todo-item__label"
        data-js-todo-item-label
      >
      ${title}
      </label>
      <button
        class="todo-item__delete-button"
        type="button"
        aria-label="delete"
        title="delete"
        data-js-todo-item-label-delete-button
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 5L5 15M5 5L15 15"
            stroke="#757575"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </li>
    `).join('')

    const isEmptyFilteredItems = this.state.filteredItems?.length === 0
    const isEmptyItems = this.state.items.length === 0

    this.emptyMessageElement.textContent = isEmptyFilteredItems ? 'Tasks not found' : isEmptyItems ? 'There are no tasks yet' : ''
  }
}

new Todo()