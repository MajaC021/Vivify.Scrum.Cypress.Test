import dataUser from "../fixtures/data.json"
import Login from '../support/classes/login';

const login = new Login();

describe("Login module test", () => {

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
    it.only("Login with valid credentials", () => {
        cy.intercept({
            method: "POST",
            url: "api/v2/login",
        }).as('login')
        login.login(dataUser.user.email, dataUser.user.pass)
        login.assertLogin();
        cy.wait('@login').then((interceptObj) => {
           console.log(interceptObj)
            expect(interceptObj.response.statusCode).eq(200)
            expect(interceptObj.response.body.user.email).eq(dataUser.user.email)
        })
    })

    it("Login user, forgot pass", () => {
        cy.intercept({
            method: "POST",
            url: "api/v2/password-reminder",
        }).as('login')
        login.loginUserForgotPass(dataUser.user.email)
        login.assertLoginForgotPassword()
        cy.wait('@login').then((interceptObj) => {
            expect(interceptObj.response.statusCode).eq(200)
            expect(interceptObj.response.body).eq('success')
        })
    })
})