import dataOrg from "../fixtures/data.json"
import Organizations from '../support/classes/org';


const organizations = new Organizations();
let orgId;


describe("organization module tests", () => {

    beforeEach("User needs to be login", () => {
        cy.login()
    });

    afterEach("logout user", () => {
        cy.logout()
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

    //positive
    it("Add new org", () => {
        cy.addOrganization()
    })

    it("Edit org with new org name", () => {
        cy.updateOrgApi()
    })

    it("Arhive org and delete", () => {
        cy.archiveAndDeleteOrg()
    })

    it("Delete org", () => {
        cy.deleteOrg()
    })
})