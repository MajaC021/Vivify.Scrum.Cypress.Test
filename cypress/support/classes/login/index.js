import LoginElements from '../../elements/login-elements';


class Login {

    login(email, pass) {
        cy.visit("/login")
        cy.get(LoginElements.email).type(email)
        cy.get(LoginElements.password).type(pass)
        cy.get(LoginElements.logInBtn).click();
    }
    assertLogin() {
        cy.get('[class=vs-u-text--uppercase]')
            .should('be.visible')
            .and('contain', 'My Organizations')

        cy.get('span.el-dropdown-link').should(($loggedInUser) => {
            expect($loggedInUser).to.contain('Maja Cvet')
        })
    }
    loginUserForgotPass(email) {
        cy.visit("/login")
        cy.get(LoginElements.forgotPass).click();
        cy.get(LoginElements.email).type(email)
        cy.get(LoginElements.logInBtn).click();
    }
    assertLoginForgotPassword() {
        cy.get('.el-message__group').should(($loggedInUser) => {
            expect($loggedInUser).to.contain('Password reset email sent, please check your inbox !')
        })
    }
    loginInvalidPass(user, pass) {
        cy.visit("/login")
        cy.get(LoginElements.email).type(user)
        cy.get(LoginElements.password).type(pass)
        cy.get(LoginElements.logInBtn).click();
    }
    assertLoginInvalidPass() {
        cy.get('span.el-form-item__error').should(($loggedInUser) => {
            expect($loggedInUser).to.contain('Oops! Your email/password combination is incorrect')
        })
    }
    loginPassLessThan5char(user, pass) {
        cy.visit("/login")
        cy.get(LoginElements.email).type(user)
        cy.get(LoginElements.password).type(pass)
        cy.get(LoginElements.logInBtn).click();
    }
    assertLoginPassLessThan5char() {
        cy.get('span.el-form-item__error.el-form-item-error--top').should(($loggedInUser) => {
            expect($loggedInUser).to.contain('The password field must be at least 5 characters')
        })
    }
    loginWithoutPass(user) {
        cy.visit("/login")
        cy.get(LoginElements.email).type(user)
        cy.get(LoginElements.logInBtn).click();
    }
    assertLoginWithoutPass() {
        cy.get('span.el-form-item__error.el-form-item-error--top').should(($loggedInUser) => {
            expect($loggedInUser).to.contain('The password field is required')
        })
    }
    loginWithoutEmail(pass) {
        cy.visit("/login")
        cy.get(LoginElements.password).type(pass)
        cy.get(LoginElements.logInBtn).click();
    }
    assertLoginWithoutEmail() {
        cy.get('span.el-form-item__error.el-form-item-error--top').should(($loggedInUser) => {
            expect($loggedInUser).to.contain('The email field must be a valid email')
        })
    }
    loginWithoutData() {
        cy.visit("/login")
        cy.get(LoginElements.logInBtn).click();
    }

    assertLoginWithoutData() {
        cy.get('span.el-form-item__error.el-form-item-error--top').should(($loggedInUser) => {
            expect($loggedInUser).to.contain('The email field must be a valid email')
        })
        cy.get('span.el-form-item__error.el-form-item-error--top').should(($loggedInUser) => {
            expect($loggedInUser).to.contain('The password field is required')
        })
    }
    loginUserNonExistEmail(user) {
        cy.visit("/login")
        cy.get(LoginElements.forgotPass).click();
        cy.get(LoginElements.email).type(user)
        cy.get(LoginElements.logInBtn).click();
    }
    assertLoginUserNonExistEmail() {
        cy.get('.el-message__group').should(($loggedInUser) => {
            expect($loggedInUser).to.contain('Error in sending mail! Please check mail address and try again')
        })
    }
    loginUserForgotPassInvalidEmail(email) {
        cy.visit("/login")
        cy.get(LoginElements.forgotPass).click();
        cy.get(LoginElements.email).type(email)
        cy.get(LoginElements.logInBtn).click();
    }
    assertLoginUserForgotPassInvalidEmail() {
        cy.get('span.el-form-item__error.el-form-item-error--top').should(($loggedInUser) => {
            expect($loggedInUser).to.contain('The email field must be a valid email')
        })
    }
    loginWithInvalidEmail(email, pass) {
        cy.visit("/login")
        cy.get(LoginElements.email).type(email)
        cy.get(LoginElements.password).type(pass)
        cy.get(LoginElements.logInBtn).click();
    }
    assertLoginWithInvalidEmail() {
        cy.get('span.el-form-item__error.el-form-item-error--top').should(($loggedInUser) => {
            expect($loggedInUser).to.contain('The email field must be a valid email')
        })
    }
}
export default Login;