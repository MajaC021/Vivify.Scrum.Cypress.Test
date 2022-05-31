import TaskElements from '../../elements/task-elements';

class Tasks {

   createTask(taskName){
    cy.get(TaskElements.openBoard).eq(0).click()
    cy.get(TaskElements.addNewTask).eq(1).click({ force: true })
    cy.get(TaskElements.addNameTask).type( `${taskName}{enter}`)
   }
   assertCreatedTask(taskName){
    cy.get('.vs-c-col.not-sortable').should(($task) => {
        expect($task).to.contain(taskName)
    })
    cy.get('h2').should(($title) => {
        expect($title).to.contain("Backlog")
    })
   }
   deleteTask(){
    cy.get(TaskElements.openBoard).eq(0).click()
    cy.get(TaskElements.listTask).eq(1).click()
    cy.get(TaskElements.dropdownTskOptions).eq(3).click()   
    cy.get(TaskElements.deleteTask).click()  
    cy.get(TaskElements.saveConfirmBtn).click()  
   }
   assertDeletedTask(){
    cy.get('.vs-c-col.not-sortable').should('not.contain', 'Test')
   }
   editTaskNameWithoutName(){
    cy.get(TaskElements.openBoard).eq(0).click()
    cy.get(TaskElements.editTaskName).eq(1).click({force: true})
    cy.get(TaskElements.addNameTask).clear()
   }
   assertEditTaskNameWithoutName(){
    cy.get('.el-textarea__inner').should('be.empty')
    cy.get('button[name="update_item_title"]').should('not.have.css', 'display', 'none')
   }
}
export default Tasks;