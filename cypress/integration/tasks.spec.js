import dataTask from "../fixtures/data.json"
import Login from '../support/classes/login';
import Logout from '../support/classes/logout';
import Tasks from '../support/classes/tasks';

const login = new Login();
const logout = new Logout();
const tasks = new Tasks();

describe("tasks module tests", () => {

    beforeEach("User needs to be login", () => {
        cy.intercept({
            method: "POST",
            url: "api/v2/login",
        }).as('login')
        login.login(dataOrg.user.email, dataOrg.user.pass)
        login.assertLogin();
        cy.wait('@login').then((interceptObj) => {
            user = interceptObj.response.body.user.full_name;
            expect(interceptObj.response.statusCode).eq(200)
            expect(interceptObj.response.body.user.email).eq(dataOrg.user.email)
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
            console.log(interceptObj)
            expect(interceptObj.response.statusCode).eq(201)
            expect(interceptObj.response.body.message).eq("Successfully logged out")
          })
    })

    //positive
    it("Create new task", () => {
        tasks.createTask(dataTask.task.tskName)
        tasks.assertCreatedTask(dataTask.task.tskName)
    })

    it("Delete the task", () => {
        tasks.deleteTask()
        tasks.assertDeletedTask()
    })
    it("Open task in new tab", () => {
        tasks.moveTaskToOtherBoard()
        tasks.assertMoveTaskToOtherBoard()
    })
    it("upload file in task", () => {
        tasks.uploadFile("../images/Screenshot_1.png")
        tasks.assertUploadedFiles("Screenshot_1.png")
    })

    //negative
    it("Edit task without name", () => {
        tasks.editTaskNameWithoutName()
        tasks.assertEditTaskNameWithoutName()
    })
})