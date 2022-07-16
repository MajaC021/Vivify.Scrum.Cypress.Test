import data from '../../fixtures/data.json'
import user from '../../api/user'

describe('APIL - login user flow', () => {
    let token;
beforeEach(() => {})

    it('APIL - 01 - user login - positive flow', () => {
      user.login({testName: Cypress.currentTest.title}).then((response) => {
          token = response.token
      })
    })

    it('APIL - 02 - user login - negative flow', () => {
        user.login({email: data.wrongData.string, statusCode: 401, testName: Cypress.currentTest.title})
       
    })
    it('APIL - 03 - user login - negative flow', () => {
        user.login({password: data.wrongData.string, statusCode: 401, testName: Cypress.currentTest.title})
    })
})
