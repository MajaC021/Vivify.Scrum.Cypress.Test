import dataOrg from "../fixtures/data.json"
import Login from '../support/classes/login';
import Logout from '../support/classes/logout';
import Organizations from '../support/classes/org';

const login = new Login();
const logout = new Logout();
const organizations = new Organizations();

describe("organization module tests", () => {

    beforeEach("User needs to be login", () => {
        login.login(dataOrg.user.email, dataOrg.user.pass)
        login.assertLogin();
    });

    afterEach("logout user", () => {
        cy.intercept({
            method: "POST",
            url: "api/v2/logout",
          }).as('logout')
          logout.logout("Maja Cvet");
          logout.assertLogout();
          cy.wait('@logout').then((interceptObj) => {
            console.log(interceptObj)
            expect(interceptObj.response.statusCode).eq(201)
            expect(interceptObj.response.body.message).eq("Successfully logged out")
          })
    })

    //positive
    it("Add new org", () => {
        organizations.addNewOrg(dataOrg.org.orgName)
        organizations.assertNewOrg(dataOrg.org.orgName);
    })

    it("Edit org with new org name", () => {
        organizations.editOrg(dataOrg.org.editOrgName)
        organizations.assertEditOrg(dataOrg.org.editOrgName);
    })

    it("Arhive org", () => {
        organizations.archiveOrg()
        organizations.assertArchiveOrg(dataOrg.org.orgName)
    })

    it("Delete arhived org", () => {
        organizations.deleteArchiveOrg(dataOrg.user.pass)
        organizations.assertDeleteArchiveOrg()
    })

    it("Delete org", () => {
        organizations.deleteOrg(dataOrg.user.pass)
        organizations.assertDeletedOrg();
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