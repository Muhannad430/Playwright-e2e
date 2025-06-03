import { Page, Locator } from '@playwright/test'

export class ToDoListPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    toDoListPageHearder() {
        return this.page.locator('is-size-3')
    }

    myTasksHeader() {
        return this.page.locator('.panel-heading')
    }

    newToDoInput() {
        return this.page.locator('#input-add')
    }

    addButton() {
        return this.page.locator('#add-btn')
    }

    searchInput() {
        return this.page.locator('#search')
    }

    noTaskFound() {
        return this.page.getByText('No tasks found!')
    }

    tasksList() {
        return this.page.locator('#panel')
    }

    completeTaskCheck() {
        return this.page.locator('[data-icon="circle-check"]')
    }

    removeCompletedTasksButton() {
        return this.page.locator('#clear')
    }

    deleteButton() {
        return this.page.locator('[data-icon="trash-can"]')
    }

    taskError() {
        return this.page.locator('[class="notification is-danger"]')
    }
}