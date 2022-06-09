import dataOrg from "../fixtures/data.json"
import Login from '../support/classes/login';
import Logout from '../support/classes/logout';
import Organizations from '../support/classes/org';

const login = new Login();
const logout = new Logout();
const organizations = new Organizations();
let orgId;
let user;

describe("organization module tests", () => {

    beforeEach("User needs to be login", () => {
        cy.intercept({
            method: "POST",
            url: "api/v2/login",
        }).as('login')
        login.login(dataOrg.user.email, dataOrg.user.pass)
        login.assertLogin();
        cy.wait('@login').then((interceptObj) => {
            user = interceptObj.response.body.user.full_name;
            expect(interceptObj.response.statusCode).eq(200)
            expect(interceptObj.response.body.user.email).eq(dataOrg.user.email)
        })
    });

    afterEach("logout user", () => {
        cy.intercept({
            method: "POST",
            url: "api/v2/logout",
        }).as('logout')
        logout.logout("Maja Cvet");
        logout.assertLogout();
        cy.wait('@logout').then((interceptObj) => {
            expect(interceptObj.response.statusCode).eq(201)
            expect(interceptObj.response.body.message).eq("Successfully logged out")
        })
    })

    //positive
    it("Add new org", () => {
        cy.intercept({
            method: "POST",
            url: "api/v2/organizations",
        }).as('createOrgRequest')
        organizations.addNewOrg(dataOrg.org.orgName)
        organizations.assertNewOrg(dataOrg.org.orgName);
        cy.wait('@createOrgRequest').then((interceptObj) => {
            expect(interceptObj.response.statusCode).eq(201)
            expect(interceptObj.response.body.name).eq(dataOrg.org.orgName)
            orgId = interceptObj.response.body.id;
        })
    })

    it("Edit org with new org name", () => {
        cy.visit(`/organizations/${orgId}/settings`)
        cy.intercept({
            method: "PUT",
            url: `api/v2/organizations/${orgId}`,
        }).as('createOrgRequest')
        organizations.editOrg(dataOrg.org.editOrgName)
        organizations.assertEditOrg(dataOrg.org.editOrgName)
        cy.wait('@createOrgRequest').then((interceptObj) => {
            console.log("OBJ", interceptObj)
            expect(interceptObj.response.statusCode).eq(200)
            expect(interceptObj.response.body.name).eq(dataOrg.org.editOrgName)
        })
    })

    it("Arhive org and delete", () => {
        cy.visit(`/organizations/${orgId}/settings`)
        cy.intercept({
            method: "PUT",
            url: `/api/v2/organizations/${orgId}/status`,
        }).as('createOrgRequest')
        organizations.archiveOrg()
        organizations.assertArchiveOrg()
        organizations.deleteArchiveOrg(dataOrg.user.pass)
        organizations.assertDeleteArchiveOrg()
        cy.wait('@createOrgRequest').then((interceptObj) => {
            expect(interceptObj.response.statusCode).eq(200)
            expect(interceptObj.response.body.status).eq("archived")
        })
    })
    
    it("Delete org", () => {
        cy.visit(`/organizations/${orgId}/settings`)
        cy.intercept({
            method: "POST",
            url: `/api/v2/organizations/${orgId}`,
        }).as('createOrgRequest')
        organizations.deleteOrg(dataOrg.user.pass)
        organizations.assertDeletedOrg();
        cy.wait('@createOrgRequest').then((interceptObj) => {
            console.log("OBJ", interceptObj)
         expect(interceptObj.response.body.id).eq(orgId)
         expect(interceptObj.response.statusCode).eq(201)
        })
    })
    
    //negative
    it("Edit org without name", () => {
        organizations.editOrgWithoutName()
        organizations.assertEditedOrgWithoutName()
    })

    it("Add new org without name", () => {
        organizations.addOrgWithoutName()
        organizations.assertAddedOrgWithoutName()
    })

    it("Edit org in config without name", () => {
        organizations.configOrgNameWithoutName()
        organizations.assertConfigOrgNameWithoutName()
    })

    it("Delete org with wrong pass", () => {
        organizations.deleteOrgWithWrongPass(dataOrg.user.invalidPass)
        organizations.assertDeleteOrgWithoutPass()
    })

   
})