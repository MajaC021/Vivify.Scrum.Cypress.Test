import Boards from '../support/classes/boards';

const boards = new Boards();
let boardId;

describe("board module test", () => {

    beforeEach("User needs to be login", () => {
        cy.login()
    });

    afterEach("logout user", () => {
        cy.logout()
    })
    //negative
    it("Edit board code with 5 characters", () => {
        cy.addNewBoardApi()
        cy.codeWith5characters()
    })

    it("Edit board without name", () => {
        cy.boardWithoutName()
    })

    it("Edit board without code", () => {
        cy.boardWithoutCode()
    })

    //positive
    it("Add new board", () => {
        cy.addNewBoardApi()
    })

    it("Edit board code", () => {
        cy.editBoardApi()
    })

    it("Edit board name", () => {
        cy.editBoardNameApi()
    })

    it("Delete board", () => {
        cy.deleteBoardApi()
    })

})