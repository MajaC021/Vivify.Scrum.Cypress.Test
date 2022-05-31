import TaskElements from '../../elements/task-elements';

class Tasks {

    createTask(taskName) {
        cy.get(TaskElements.openBoard).eq(0).click()
        cy.get(TaskElements.addNewTask).eq(1).click({ force: true })
        cy.get(TaskElements.addNameTask).type(`${taskName}{enter}`)
    }
    assertCreatedTask(taskName) {
        cy.get('.vs-c-col.not-sortable').should(($task) => {
            expect($task).to.contain(taskName)
        })
        cy.get('h2').should(($title) => {
            expect($title).to.contain("Backlog")
        })
    }
    deleteTask() {
        cy.get(TaskElements.openBoard).eq(0).click()
        cy.get(TaskElements.listTask).eq(1).click()
        cy.get(TaskElements.dropdownTskOptions).eq(3).click()
        cy.get(TaskElements.deleteTask).click()
        cy.get(TaskElements.saveConfirmBtn).click()
    }
    assertDeletedTask() {
        cy.get('.vs-c-col.not-sortable').should('not.contain', 'Test')
    }
    editTaskNameWithoutName() {
        cy.get(TaskElements.openBoard).eq(0).click()
        cy.get(TaskElements.editTaskName).eq(1).click({ force: true })
        cy.get(TaskElements.addNameTask).clear()
    }
    assertEditTaskNameWithoutName() {
        cy.get('.el-textarea__inner').should('be.empty')
        cy.get('button[name="update_item_title"]').should('not.have.css', 'display', 'none')
    }
    moveTaskToOtherBoard() {
        cy.get(TaskElements.openBoard).eq(0).click()
        cy.get(TaskElements.listTask).eq(1).click()
        cy.get(TaskElements.dropdownTskOptions).eq(3).click()
        cy.get(TaskElements.itemsFromDropdown).contains("Move To Another Board").click()
        cy.get(TaskElements.selectBoardDropdown).click()
        cy.get(TaskElements.selectBoardItem).eq(0).click()
        cy.get(TaskElements.selectSprintDropdown).click()
        cy.get(TaskElements.selectSprintItem).eq(1).click()
        cy.get(TaskElements.selectSprintDropdown).eq(1).click()
        cy.get(TaskElements.selectBacklogColumn).contains("To do").click()
        cy.get(TaskElements.dropdownTskOptions).contains("Yes").click()
        cy.get(TaskElements.headerButtons).eq(2).click()
    }
    assertMoveTaskToOtherBoard() {
        cy.get('p.vs-c-task-card__title').should(($task) => {
            expect($task).to.contain("fcg")
        })
        cy.get('[name="sprint-info-dropdown"]').should(($task) => {
            expect($task).to.contain("Sprint 1")
        })
    }
    uploadFile(file) {
        cy.get(TaskElements.openBoard).eq(0).click()
        cy.get(TaskElements.listTask).eq(1).click()
        cy.get('input[type="file"]').attachFile(file)
    }
    assertUploadedFiles(file) {
        cy.get(".vs-c-file-item__name").should(($file) => {
            expect($file).to.contain(file)
        })
    }
}
export default Tasks;