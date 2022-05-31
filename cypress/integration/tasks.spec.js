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

    // afterEach("logout user", () => {
    //     logout.logout("Maja C");
    //     logout.assertLogout();
    // })

    //positive
    it("Create new task", () => {
        tasks.createTask(dataTask.task.tskName)
        tasks.assertCreatedTask(dataTask.task.tskName)
    })

    it("Delete the task", () => {
        tasks.deleteTask() 
        tasks.assertDeletedTask()
    })

    //negative
    it("Edit task without name", () => {
      tasks.editTaskNameWithoutName()
      tasks.assertEditTaskNameWithoutName()
    })
})