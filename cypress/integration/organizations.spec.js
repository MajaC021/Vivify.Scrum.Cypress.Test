import loginModel from "../pages/loginModel.json"
import organizations from "../pages/organizations.json"
import dataOrg from "../fixtures/data.json"

describe("create organization", () => {

    beforeEach("Login user", () => {
        cy.visit("/login")
        cy.get(loginModel.email).type(dataOrg.user.email)
        cy.get(loginModel.password).type(dataOrg.user.pass)
        cy.get(loginModel.logInBtn).click();

    });

    //positive
    it("Add new org", () => {
        cy.get(organizations.addNewOrgBtnDropdown).eq(1).click({ force: true });
        cy.get(organizations.addOrganizationBtn).eq(0).click();
        cy.get(organizations.inputNameOrg).type(dataOrg.org.orgName)
        cy.get(organizations.nextBtn).click();
        cy.get(organizations.createBtn).click();
    })

    it("Check org in active org", () => {
        cy.get(".vs-c-my-organizations-item-wrapper").should('contain', dataOrg.org.orgName)
    })

    it("Edit org with new org name", () => {
        cy.get(organizations.editOrg).eq(0).click();
        cy.get(organizations.changeOrgName).clear()
        cy.get(organizations.changeOrgName).type(dataOrg.org.editOrgName)
        cy.get(organizations.checkEditedOrg).click();
    })


    it("Arhive org", () => {
        cy.get(organizations.arhiveOrgBtn).eq(0).click({ force: true });
        cy.get(organizations.saveConfirmBtn).click();
    })

    it("Delete arhived org", () => {
        cy.get(organizations.orgFromArhived).eq(0).click();
        cy.get(organizations.deleteArhivedOrg).eq(1).click()
        cy.get(organizations.confirmPassDeleteOrg).type(dataOrg.user.pass)
        cy.get(organizations.saveConfirmBtn).click()
    })

    it("Delete org", () => {
        cy.get(organizations.clickOrg).eq(0).click();
        cy.get(organizations.noticeOkClose).click()
        cy.get(organizations.clickConfig).click()
        cy.get(organizations.deleteOrg).eq(5).click()
        cy.get(organizations.confirmPassDeleteOrg).type(dataOrg.user.pass)
        cy.get(organizations.saveConfirmBtn).click()
    })

    //negative
    it("Edit org without name", () => {
        cy.get(organizations.editOrg).click();
        cy.get(organizations.changeOrgName).clear()
        cy.get(organizations.checkEditedOrg).click();
    })

    it("Add new org without name", () => {
        cy.get(organizations.addNewOrgBtnDropdown).eq(1).click({ force: true });
        cy.get(organizations.addOrganizationBtn).eq(0).click();
    })

    it("Edit org in config without name", () => {
        cy.get(organizations.clickOrg).eq(0).click();
        cy.get(organizations.infoBoardOk).click();
        cy.get(organizations.clickConfig).click();
        cy.get(organizations.inputNameOrg).clear();
        cy.get(organizations.saveConfirmBtn).click();
    })
    it("Delete org with wrong pass", () => {
        cy.get(organizations.clickOrg).eq(0).click();
        cy.get(organizations.noticeOkClose).click()
        cy.get(organizations.clickConfig).click()
        cy.get(organizations.deleteOrg).eq(5).click()
        cy.get(organizations.confirmPassDeleteOrg).type(dataOrg.user.invalidPass)
        cy.get(organizations.saveConfirmBtn).click()
    })
})