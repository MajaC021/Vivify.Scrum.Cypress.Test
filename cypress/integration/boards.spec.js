import Logout from '../support/classes/logout';
import Login from '../support/classes/login';
import Boards from '../support/classes/boards';
import dataBrd from "../fixtures/data.json"

const boards = new Boards();
const logout = new Logout();
const login = new Login();

describe("board module test", () => {

    beforeEach("User needs to be login", () => {
        login.login(dataBrd.user.email, dataBrd.user.pass)
        login.assertLogin();
    });

    afterEach("logout user", () => {
        logout.logout("Maja C");
        logout.assertLogout();
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