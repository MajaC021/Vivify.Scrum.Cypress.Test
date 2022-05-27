import loginModel from "../pages/loginModel.json"
import tasks from "../pages/tasks.json"
import dataTask from "../fixtures/data.json"
import logout from "../pages/logout.json"

describe("create organization", () => {

    beforeEach("User needs to be login", () => {
        cy.visit("/login")
        cy.get(loginModel.email).type(dataTask.user.email)
        cy.get(loginModel.password).type(dataTask.user.pass)
        cy.get(loginModel.logInBtn).click();

        cy.get('[class=vs-u-text--uppercase]')
            .should('be.visible')
            .and('contain', 'My Organizations')

        cy.get('span.el-dropdown-link').should(($loggedInUser) => {
            expect($loggedInUser).to.contain('Maja C')
        })
    });

    // afterEach("logout user", () => {
    //     cy.contains("Maja C").click()
    //     cy.get(logout.profile).click()
    //     cy.get(logout.logoutBtn).click()

    //     //assert that  we logged out
    //     cy.get('button[type="submit"]').should('be.visible').and('contain', "Log In")
    //     cy.get('h1').should('contain', 'Log in with your existing account')
    // })

    //positive
    it("Create new task", () => {
        cy.get(tasks.openBoard).eq(1).click()
        cy.get(tasks.addNewTask).eq(1).click({ force: true })
        cy.get(tasks.addNameTask).type(dataTask.task.tskName + "{enter}")

        cy.get('.vs-c-col.not-sortable').should(($task) => {
            expect($task).to.contain(dataTask.task.tskName)
        })
        cy.get('h2').should(($title) => {
            expect($title).to.contain("Backlog")
        })
    })

    it("Delete the task", () => {
        cy.get(tasks.openBoard).eq(1).click()
        cy.get(tasks.listTask).eq(1).click()
        cy.get(tasks.dropdownTskOptions).eq(3).click()   
        cy.get(tasks.deleteTask).click()  
        cy.get(tasks.saveConfirmBtn).click()  

        cy.get('.vs-c-col.not-sortable').should('not.contain', 'Test')
    })
    //negative
    it.only("Edit task without name", () => {
        cy.get(tasks.openBoard).eq(1).click()
        cy.get(tasks.editTaskName).eq(1).click({force: true})
        cy.get(tasks.addNameTask).clear()

        cy.get('.el-textarea__inner').should('be.empty')
        cy.get('button[name="update_item_title"]').should('not.have.css', 'display', 'none')
    })
})