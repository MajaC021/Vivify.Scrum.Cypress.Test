import dataUser from "../fixtures/data.json"
import Login from '../support/classes/login';

const login = new Login();

describe("Login user", () => {

    //negative
    it("Login with invalid email", () => {
        login.loginWithInvalidEmail(dataUser.user.invalidEmail, dataUser.user.pass)
        login.assertLoginWithInvalidEmail()
    })

    it("Login with invalid pass", () => {
        login.loginInvalidPass(dataUser.user.email, dataUser.user.invalidPass)
        login.assertLoginInvalidPass()
    })

    it("Login with pass less than 5 characters", () => {
        login.loginPassLessThan5char(dataUser.user.email, dataUser.user.invalidPass4char)
        login.assertLoginPassLessThan5char();
    })

    it("Login without pass", () => {
        login.loginWithoutPass(dataUser.user.email)
        login.assertLoginWithoutPass();
    })

    it("Login without email", () => {
        login.loginWithoutEmail(dataUser.user.pass)
        login.assertLoginWithoutEmail()
    })

    it("Login without data", () => {
        login.loginWithoutData()
        login.assertLoginWithoutData()
    })

    it("Login user, forgot pass non exist email", () => {
        login.loginUserNonExistEmail(dataUser.user.nonExistEmail)
        login.assertLoginUserNonExistEmail()
    })

    it("Login user, forgot pass invalid email", () => {
        login.loginUserForgotPassInvalidEmail(dataUser.user.invalidEmail)
        login.assertLoginUserForgotPassInvalidEmail()
    })

    //positive
    it("Login with valid credentials", () => {

        login.login(dataUser.user.email, dataUser.user.pass)
        login.assertLogin();
    })

    it("Login user, forgot pass", () => {
        login.loginUserForgotPass(dataUser.user.email)
        login.assertLoginForgotPassword()
    })
})