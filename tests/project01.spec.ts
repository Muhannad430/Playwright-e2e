import { test, expect } from '@playwright/test';
import { ToDoListPage } from '../pages/ToDoListPage';

test.describe('Validate toDo list page', () => {
    let todoListPage: ToDoListPage

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.techglobal-training.com/frontend/todo-list')
        todoListPage = new ToDoListPage(page)
    });
    /*
    Navigate to https://techglobal-training.com/frontend/todo-list.
    Confirm that the todo-app modal is visible with the title “My Tasks.”
    Validate that the New todo input field is enabled for text entry.
    Validate ADD button is enabled.
    Validate Search field is enabled.
    Validate that the task list is empty, displaying the message “No tasks found!”
    */
    test('Todo-App Modal Verification', async ({ page }) => {

        await expect(todoListPage.myTasksHeader()).toHaveText('My Tasks')
        await expect(todoListPage.newToDoInput()).toBeEnabled()
        await expect(todoListPage.addButton()).toBeEnabled()
        await expect(todoListPage.searchInput()).toBeEnabled()
        await expect(todoListPage.noTaskFound()).toHaveText('No tasks found!')

    });
    /*
    Navigate to https://techglobal-training.com/frontend/todo-list
    Enter a new task in the todo input field and add it to the list.
    Validate that the new task appears in the task list.
    Validate that the number of tasks in the list is exactly one.
    Mark the task as completed by clicking on it.
    Validate item is marked as completed.
    Click on the button to remove the item you have added.
    Remove the completed task by clicking the designated removal button.
    Validate that the task list is empty, displaying the message “No tasks found!”.
    */
    test('Single Task Addition and Removal', async ({ page }) => {

        await todoListPage.newToDoInput().fill('Task 01')
        await todoListPage.addButton().click()

        await expect(todoListPage.tasksList()).toHaveCount(1)

        await expect(todoListPage.completeTaskCheck()).toHaveText('Task 01')

        await todoListPage.completeTaskCheck().click()
        await todoListPage.deleteButton().click()

    });
    /*
    Navigate to https://techglobal-training.com/frontend/todo-list
    Enter and add 5 to-do items individually.
    Validate that all added items match the items displayed on the list.
    Mark all the tasks as completed by clicking on them.
    Click on the “Remove completed tasks!” button to clear them.
    Validate that the task list is empty, displaying the message “No tasks found!”.
    */
    test('Multiple Task Operations', async ({ page }) => {

        const tasks: string[] = ['unit testing', 'api testing', 'e2e testing', 'smoke testing', 'monkey testing'];

        for (let i: number = 0; i < tasks.length; i++) {
            await todoListPage.newToDoInput().fill(tasks[i]);
            await todoListPage.addButton().click();
            await expect(todoListPage.tasksList()).toContainText(tasks[i]);
        }
        const checkBox = todoListPage.completeTaskCheck()
        for (let i: number = tasks.length - 1; i >= 0; i--) {
            await checkBox.nth(i).click()
        }
        await todoListPage.removeCompletedTasksButton().click()
        await expect(todoListPage.noTaskFound()).toHaveText('No tasks found!')

    });
    /*
    Navigate to https://techglobal-training.com/frontend/todo-list
    Enter and add 5 to-do items individually.
    Validate that all added items match the items displayed on the list.
    Enter the complete name of the previously added to-do item into the search bar.
    Validate that the list is now filtered to show only the item you searched for.
    Validate that the number of tasks visible in the list is exactly one.
    */
    test('Search and Filter Functionality in todo App', async ({ page }) => {

        const tasks: string[] = ['unit testing', 'api testing', 'e2e testing', 'smoke testing', 'monkey testing'];

        for (let i: number = 0; i < tasks.length; i++) {
            await todoListPage.newToDoInput().fill(tasks[i]);
            await todoListPage.addButton().click();
            await expect(todoListPage.tasksList()).toContainText(tasks[i]);
        }

        for (let i: number = 0; i < tasks.length; i++) {
            await todoListPage.searchInput().fill(tasks[i])
            await expect(todoListPage.tasksList()).toHaveText(tasks[i])
            expect(await todoListPage.tasksList().count()).toBe(1)
            await todoListPage.searchInput().clear()
        }
    });
    /*
    Navigate to https://techglobal-training.com/frontend/todo-list
    Attempt to add an empty task to the to-do list.
    Validate that the task list is empty, displaying the message “No task found!”.
    Enter an item name exceeding 30 characters into the list.
    Validate error message appears and says “Error: Todo cannot be more than 30 characters!”.
    Add a valid item name to the list.
    Validate that the active task count is exactly one.
    Try to enter an item with the same name already present on the list.
    Validate that an error message is displayed, indicating “Error: You already have {ITEM} in your todo list.”.
    */
    test('Task Validation and Error Handling', async ({ page }) => {

        const invalidInput: string = 'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM'
        const validInput: string = 'finish the project'

        await todoListPage.addButton().click()
        await expect(todoListPage.noTaskFound())
            .toHaveText('No tasks found!')

        await todoListPage.newToDoInput().fill(invalidInput)
        await todoListPage.addButton().click()
        await expect(todoListPage.taskError()).toHaveText('Error: Todo cannot be more than 30 characters!')

        await todoListPage.newToDoInput().fill(validInput);
        await todoListPage.addButton().click()

        expect(await todoListPage.tasksList().count()).toBe(1)

        await todoListPage.newToDoInput().fill(validInput)
        await todoListPage.addButton().click()
        await expect(todoListPage.taskError()).toHaveText(`Error: You already have ${validInput} in your todo list.`)

    });
});