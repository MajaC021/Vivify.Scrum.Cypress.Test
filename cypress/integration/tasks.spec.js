import dataTask from "../fixtures/data.json"
import Login from '../support/classes/login';
import Logout from '../support/classes/logout';
import Tasks from '../support/classes/tasks';
import Boards from '../support/classes/boards';

const login = new Login();
const logout = new Logout();
const tasks = new Tasks();
const boards = new Boards();
let orgId;
let code;
let boardId;

describe("tasks module tests", () => {

    beforeEach("User needs to be login", () => {
        cy.intercept({
            method: "POST",
            url: "api/v2/login",
        }).as('login')
        login.login(dataTask.user.email, dataTask.user.pass)
        login.assertLogin();
        cy.wait('@login').then((interceptObj) => {
            expect(interceptObj.response.statusCode).eq(200)
            expect(interceptObj.response.body.user.email).eq(dataTask.user.email)
        })
    });

    afterEach("logout user", () => {
        cy.intercept({
            method: "POST",
            url: "api/v2/logout",
        }).as('logout')
        logout.logout("Maja Cvet");
        logout.assertLogout();
        cy.wait('@logout').then((interceptObj) => {
            expect(interceptObj.response.statusCode).eq(201)
            expect(interceptObj.response.body.message).eq("Successfully logged out")
        })
    })

    //positive
    it("Create new task", () => {
        boards.createBoard("test12345")
        cy.intercept({
            method: "POST",
            url: "api/v2/tasks",
        }).as('createTaskRequest')
        tasks.createTask(dataTask.task.tskName)
        tasks.assertCreatedTask(dataTask.task.tskName)
        cy.wait('@createTaskRequest').then((interceptObj) => {
            orgId = interceptObj.response.body.id
            code = interceptObj.response.body.code;
            boardId = interceptObj.response.body.board.id
            expect(interceptObj.response.statusCode).eq(201)
            expect(interceptObj.response.body.name).eq(dataTask.task.tskName)
        })
    })

    it("Open task in new tab", () => {
        cy.visit(`/boards/${boardId}/${code}`)
        cy.intercept({
            method: "PUT",
            url: "api/v2/tasks/move-tasks-to-another-board",
        }).as('moveTaskRequest')
        tasks.moveTaskToOtherBoard()
        tasks.assertMoveTaskToOtherBoard()
        cy.wait('@moveTaskRequest').then((interceptObj) => {
            expect(interceptObj.response.url).to.match(/\/move-tasks-to-another-board/)
        })
    })

    it("upload file in task", () => {
        tasks.uploadFile("../images/Screenshot_1.png")
        tasks.assertUploadedFiles("Screenshot_1.png")
    })

    it("Delete the task", () => {
        cy.visit(`/boards/${boardId}/${code}`)
        cy.intercept({
            method: "DELETE",
            url: `api/v2/tasks/${orgId}?boardId=${boardId}`,
        }).as('deleteTaskRequest')
        tasks.deleteTask()
        tasks.assertDeletedTask()
        cy.wait('@deleteTaskRequest').then((interceptObj) => {
            expect(interceptObj.response.statusCode).eq(200)
            expect(interceptObj.response.body.name).eq(dataTask.task.tskName)
        })
    })

    // //negative
    it("Edit task without name", () => {
        tasks.editTaskNameWithoutName()
        tasks.assertEditTaskNameWithoutName()
    })
})