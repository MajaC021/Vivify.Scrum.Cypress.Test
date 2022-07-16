import data from '../../fixtures/data.json'
import user from '../../api/user'
import organization from '../../api/organization'

describe('APIO - Organization CRUD', () => {
    let token
    let organizationData
    let allOrganizations

    before('before tests', () => {
        user.login({ testName: Cypress.currentTest.title }).then((response) => {
            token = response.token
        })
    })

    it('APIO - 01', () => { organization.post({ name: "new", token: token, statusCode: 201, testName: Cypress.currentTest.title }) })

    it('APIO - 02 empty name', () => { organization.post({ name: "", token: token, statusCode: 401, testName: Cypress.currentTest.title }) })

    it('APIO - 03 sql inject', () => { organization.post({ name: "{}!", token: token, statusCode: 401, testName: Cypress.currentTest.title }) })
    


    it('APIO - 00 get org', () => {
        organization.get({
            token: token,
            statusCode: 200,
            testName: Cypress.currentTest.title
        }).then((response) => {
            allOrganizations = response
        })
    })
    it('APIO - 01 put', () => {
        allOrganizations.forEach((org) => {
        organization.put({
            orgId: org.id,
            name: "new",
            token: token,
            statusCode: 200,
            testName: Cypress.currentTest.title
        })
    })
    })
    it('APIO - 01 delete all org', () => {
        let counter = 0;
        console.log(allOrganizations)
        allOrganizations.forEach((org) => {
            organization.delete({
                orgId: org.id,
                token: token,
                testName: `${Cypress.currentTest.title} --- ${counter}`,
            })
            counter++
        });
    })
})