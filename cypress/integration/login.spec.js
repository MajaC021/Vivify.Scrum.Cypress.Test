import loginModel from "../pages/loginModel.json"
import dataUser from "../fixtures/data.json"

describe("Login user", () => {

    //negative
    it("Login with invalid email", () => {
        cy.visit("/login")
        cy.get(loginModel.email).type(dataUser.user.invalidEmail)
        cy.get(loginModel.password).type(dataUser.user.pass)
        cy.get(loginModel.logInBtn).click();
    })

    it("Login with invalid pass", () => {
        cy.visit("/login")
        cy.get(loginModel.email).type(dataUser.user.email)
        cy.get(loginModel.password).type(dataUser.user.invalidPass)
        cy.get(loginModel.logInBtn).click();
    })

    it("Login with pass less than 5 characters", () => {
        cy.visit("/login")
        cy.get(loginModel.email).type(dataUser.user.email)
        cy.get(loginModel.password).type(dataUser.user.invalidPass4char)
        cy.get(loginModel.logInBtn).click();
    })

    it("Login without pass", () => {
        cy.visit("/login")
        cy.get(loginModel.email).type(dataUser.user.email)
        cy.get(loginModel.logInBtn).click();
    })

    it("Login without email", () => {
        cy.visit("/login")
        cy.get(loginModel.password).type(dataUser.user.pass)
        cy.get(loginModel.logInBtn).click();
    })

    it("Login without data", () => {
        cy.visit("/login")
        cy.get(loginModel.logInBtn).click();
    })

    it("Login user, forgot pass non exist email", () => {
        cy.visit("/login")
        cy.get(loginModel.forgotPass).click();
        cy.get(loginModel.email).type(dataUser.user.nonExistEmail)
        cy.get(loginModel.logInBtn).click();
    })

    it("Login user, forgot pass invalid email", () => {
        cy.visit("/login")
        cy.get(loginModel.forgotPass).click();
        cy.get(loginModel.email).type(dataUser.user.invalidEmail)
        cy.get(loginModel.logInBtn).click();
    })

    //positive
    it("Login with valid credentials", () => {
        cy.visit("/login")
        cy.get(loginModel.email).type(dataUser.user.email)
        cy.get(loginModel.password).type(dataUser.user.pass)
        cy.get(loginModel.logInBtn).click();
    })

    it("Login user, forgot pass", () => {
        cy.visit("/login")
        cy.get(loginModel.forgotPass).click();
        cy.get(loginModel.email).type(dataUser.user.email)
        cy.get(loginModel.logInBtn).click();
    })
})