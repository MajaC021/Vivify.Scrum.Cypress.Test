import dataTask from "../fixtures/data.json"
import Login from '../support/classes/login';
import Logout from '../support/classes/logout';
import Tasks from '../support/classes/tasks';

const login = new Login();
const logout = new Logout();
const tasks = new Tasks();

describe("tasks module tests", () => {

    beforeEach("User needs to be login", () => {
        login.login(dataTask.user.email, dataTask.user.pass)
        login.assertLogin();
    });

    afterEach("logout user", () => {
        logout.logout("Maja C");
        logout.assertLogout();
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
    it.only("upload file in task", () => {
        tasks.uploadFile("../images/Screenshot_1.png")
        tasks.assertUploadedFiles("Screenshot_1.png")
    })

    //negative
    it("Edit task without name", () => {
        tasks.editTaskNameWithoutName()
        tasks.assertEditTaskNameWithoutName()
    })
})