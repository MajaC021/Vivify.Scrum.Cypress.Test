import data from '../fixtures/data.json'
import consoleColor from '../support/consoleColor'

module.exports = {
    login({
        email = data.userApi.email, password = data.userApi.password, statusCode = 200, testName = ""
    }){
       return cy.request({
            failOnStatusCode: false,
            method: "POST",
            url: `${data.apiBaseUrl}/api/v2/login`,
            body: {
                email: email,
                password: password
            },

        }).then((response) => {
            typeof response.status !== 'undefined' && response.status === statusCode 
            ? consoleColor.log(`${testName} -- PASS`, 'success') 
            : consoleColor.log(`${testName} -- FALL \n ${JSON.stringify(response)}`, "error") 

            expect(response.status).to.eql(statusCode)
            return response.body
        })
    }
}