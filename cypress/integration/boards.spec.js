import loginModel from "../pages/loginModel.json"
import dataBoard from "../fixtures/data.json"
import logout from "../pages/logout.json"
import Boards from '../support/classes/boards';

const boards = new Boards();
describe("create organization", () => {

    beforeEach("User needs to be login", () => {
        cy.visit("/login")
        cy.get(loginModel.email).type(dataBoard.user.email)
        cy.get(loginModel.password).type(dataBoard.user.pass)
        cy.get(loginModel.logInBtn).click();

        cy.get('[class=vs-u-text--uppercase]')
            .should('be.visible')
            .and('contain', 'My Organizations')

        cy.get('span.el-dropdown-link').should(($loggedInUser) => {
            expect($loggedInUser).to.contain('Maja C')
        })      
    });

    afterEach("logout user", () => {
        cy.contains("Maja C").click()
        cy.get(logout.profile).click()
        cy.get(logout.logoutBtn).click()

         //assert that  we logged out
        cy.get('button[type="submit"]').should('be.visible').and('contain', "Log In")
        cy.get('h1').should('contain', 'Log in with your existing account')

    })

    //positive
    it("Add new board", () => {
        boards.createBoard("Test new board")
        boards.assertBoardName("Test new board")  
    })

    it("Edit board code", () => {
        boards.editBoardCode("BBBB")
        boards.assertBoardCodeEdited("BBBB")    
    })

    it("Edit board name", () => {
        boards.editBoardName("name edited")
        boards.assertBoardNameEdited("name edited")
    })

    it("Delete board", () => {
        boards.deleteBoard("name edited")
        boards.assertDeleteBoard("name edited")
    })

    //negative
    it("Edit board code with 5 characters", () => {
        boards.editBoardCodeWith5Char("board")
        boards.assertBoardCodeMoreThanLimitChar();
      
    })

    it("Edit board without name", () => {  
        boards.editBoardNameWithoutName();
        boards.assertBoardWithoutName();      
    })

    it("Edit board without code", () => {
        boards.editBoardWithoutCode();
        boards.assertBoardWithoutCode();
    })
})