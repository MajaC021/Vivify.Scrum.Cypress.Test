import user from '../../api/user'
import data from '../../fixtures/data.json'
describe("test token", () => {
    let userToken = []
    it('get token', () => {
        for (const [key, value] of Object.entries(data.accounts)) {
            user.login({ email: value.email, password: value.password, testName: Cypress.currentTest.title })
            .then((token) => {
                userToken.push({token: token.token})
            })
        }

    })
    it("log", () => {
        cy.writeFile('cypress/fixtures/k6/tokensArray.json', userToken)
    })
})