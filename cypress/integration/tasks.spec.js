import dataTask from "../fixtures/data.json"
import Tasks from '../support/classes/tasks';
import Boards from '../support/classes/boards';

const tasks = new Tasks();
const boards = new Boards();
let orgId;
let code;
let boardId;

describe("tasks module tests", () => {

    beforeEach("User needs to be login", () => {
        cy.login()
    });

    afterEach("logout user", () => {
        cy.logout()
    })

    //positive
    it("Create new task", () => {
        cy.addNewBoardApi()
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