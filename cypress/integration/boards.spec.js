import Logout from '../support/classes/logout';
import Login from '../support/classes/login';
import Boards from '../support/classes/boards';
import dataBrd from "../fixtures/data.json"

const boards = new Boards();
const logout = new Logout();
const login = new Login();
let boardId;
let user;

describe("board module test", () => {

    beforeEach("User needs to be login", () => {
        cy.intercept({
            method: "POST",
            url: "api/v2/login",
        }).as('login')
        login.login(dataBrd.user.email, dataBrd.user.pass)
        login.assertLogin();
        cy.wait('@login').then((interceptObj) => {
            user = interceptObj.response.body.user.full_name;
            expect(interceptObj.response.statusCode).eq(200)
            expect(interceptObj.response.body.user.email).eq(dataBrd.user.email)
        })
    });

    afterEach("logout user", () => {
        cy.intercept({
            method: "POST",
            url: "api/v2/logout",
        }).as('logout')
        logout.logout(user);
        logout.assertLogout();
        cy.wait('@logout').then((interceptObj) => {
            expect(interceptObj.response.statusCode).eq(201)
            expect(interceptObj.response.body.message).eq("Successfully logged out")
        })
    })

    //positive
    it("Add new board", () => {
        cy.intercept({
            method: "POST",
            url: "api/v2/boards",
        }).as('createBoardRequest')
        boards.createBoard("Test new board")
        cy.wait('@createBoardRequest').then((interceptObj) => {
            expect(interceptObj.response.statusCode).eq(201)
            expect(interceptObj.response.body.name).eq('Test new board')
            boardId = interceptObj.response.body.id;
        })
    })

    it("Edit board code", () => {
        cy.intercept({
            method: "PUT",
            url: `api/v2/boards/${boardId}`,
        }).as('editBoardcode')
        cy.visit(`/boards/${boardId}/settings`)
        boards.editBoardCode('YYYY')
        cy.wait('@editBoardcode').then((interceptObj) => {
            expect(interceptObj.response.statusCode).eq(200)
            expect(interceptObj.response.body.code).eq('YYYY')
        })
    })

    it("Edit board name", () => {
        cy.intercept({
            method: "PUT",
            url: `api/v2/boards/${boardId}`,
        }).as('editBoardname')
        cy.visit(`/boards/${boardId}/settings`)
        boards.editBoardName("name edited")
        boards.assertBoardNameEdited("name edited")
        cy.wait('@editBoardname').then((interceptObj) => {
            expect(interceptObj.response.statusCode).eq(200)
            expect(interceptObj.response.body.name).eq('name edited')
        })
    })

    it("Delete board", () => {
        cy.intercept({
            method: "DELETE",
            url: `api/v2/boards/${boardId}`,
        }).as('deleteBoard')
        cy.visit(`/boards/${boardId}/settings`)
        boards.deleteBoard()
        cy.wait('@deleteBoard').then((interceptObj) => {
            console.log(interceptObj)
            expect(interceptObj.response.statusCode).eq(200)
            expect(interceptObj.response.body.id).eq(boardId)
        })
        boards.assertDeleteBoard(`${boardId}`)
    })

    //negative
    it("Edit board code with 5 characters", () => {
        cy.visit(`/boards/${boardId}/settings`)
        boards.editBoardCodeWith5Char("board")
        boards.assertBoardCodeMoreThanLimitChar();
    })

    it("Edit board without name", () => {
        cy.visit(`/boards/${boardId}/settings`)
        boards.editBoardNameWithoutName();
        boards.assertBoardWithoutName();
    })

    it("Edit board without code", () => {
        cy.visit(`/boards/${boardId}/settings`)
        boards.editBoardWithoutCode();
        boards.assertBoardWithoutCode();
    })
})