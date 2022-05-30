import OrgElements from '../../elements/org-elements';

class Organizations {

    addNewOrg(orgName) {
        cy.get(OrgElements.addNewOrgBtnDropdown).eq(1).click({ force: true });
        cy.get(OrgElements.addOrganizationBtn).eq(0).click();
        cy.get(OrgElements.inputNameOrg).type(orgName)
        cy.get(OrgElements.nextBtn).click();
        cy.get(OrgElements.createBtn).click();
        cy.get(OrgElements.infoBoardOk).click();
    }
    assertNewOrg(orgName) {
        cy.get('.vs-l-project__title-info.vs-u-cursor--pointer')
            .should('be.visible')

        cy.get('.vs-l-project__title-info.vs-u-cursor--pointer').should(($orgItemHeader) => {
            expect($orgItemHeader).to.contain('Organization')
            expect($orgItemHeader).to.contain(orgName)
        })
        cy.get('.vb-content').should(($orgItem) => {
            expect($orgItem).to.contain(orgName)
        })
    }
    editOrg(editOrgName) {
        cy.get(OrgElements.editOrg).eq(0).click();
        cy.get(OrgElements.changeOrgName).clear()
        cy.get(OrgElements.changeOrgName).type(editOrgName)
        cy.get(OrgElements.checkEditedOrg).click();
    }
    assertEditOrg(editOrgName) {
        cy.get('.vs-c-my-organizations-item-wrapper').should(($activeOrg) => {
            expect($activeOrg).to.contain(editOrgName)
        })
    }
    archiveOrg() {
        cy.get(OrgElements.arhiveOrgBtn).eq(1).click({ force: true });
        cy.get(OrgElements.saveConfirmBtn).click();
    }
    assertArchiveOrg(orgName) {
        cy.get('.vs-c-my-organizations-item-wrapper--archived').should('have.css', 'opacity', '0.4')
        cy.get('.vs-c-my-organizations-item-wrapper--archived').should(($arhivedOrg) => {
            expect($arhivedOrg).to.contain(orgName)
        })
    }
    deleteArchiveOrg(pass) {
        cy.get(OrgElements.deleteArhivedOrg).eq(1).click({ force: true })
        cy.get(OrgElements.confirmPassDeleteOrg).type(pass)
        cy.get(OrgElements.saveConfirmBtn).click()
    }
    assertDeleteArchiveOrg() {
        cy.get('.vs-c-my-organizations-item-wrapper.vs-c-my-organizations-item-wrapper--archived').should('not.contain', 'Test')
    }
    deleteOrg(pass) {
        cy.get(OrgElements.clickOrg).eq(2).click();
        cy.get(OrgElements.infoBoardOk).click()
        cy.get(OrgElements.clickConfig).eq(7).click()
        cy.get(OrgElements.deleteOrg).eq(5).click()
        cy.get(OrgElements.confirmPassDeleteOrg).type(pass)
        cy.get(OrgElements.saveConfirmBtn).click()
    }
    assertDeletedOrg() {
        cy.get('.vs-c-my-organizations-item-wrapper').should('not.contain', 'Test')
    }
    editOrgWithoutName() {
        cy.get(OrgElements.editOrg).eq(1).click();
        cy.get(OrgElements.changeOrgName).clear()
        cy.get(OrgElements.checkEditedOrg).click();
    }
    assertEditedOrgWithoutName() {
        cy.get("h2[class='vs-c-my-organization__title']").should('not.be.empty')
    }
    addOrgWithoutName() {
        cy.get(OrgElements.addNewOrgBtnDropdown).eq(1).click({ force: true });
        cy.get(OrgElements.addOrganizationBtn).eq(0).click();
    }
    assertAddedOrgWithoutName() {
        cy.get("[class='el-button vs-c-button-focus el-button--success el-button--large is-disabled']").should('be.disabled')
        cy.get("input[type='text']").should('be.empty')
    }
    configOrgNameWithoutName() {
        cy.get(OrgElements.clickOrg).eq(2).click();
        cy.get(OrgElements.infoBoardOk).click();
        cy.get(OrgElements.clickConfig).eq(7).click();
        cy.get(OrgElements.inputNameOrg).clear();
    }
    assertConfigOrgNameWithoutName() {
        cy.get(OrgElements.configBtnSubmit).should('be.disabled')
        cy.get('.el-form-item__error.el-form-item-error--top').should('contain', 'The name field is required')
    }
    deleteOrgWithWrongPass(pass) {
        cy.get(OrgElements.clickOrg).eq(2).click();
        cy.get(OrgElements.noticeOkClose).click()
        cy.get(OrgElements.clickConfig).eq(7).click()
        cy.get(OrgElements.deleteOrg).eq(5).click()
        cy.get(OrgElements.confirmPassDeleteOrg).type(pass)
        cy.get(OrgElements.saveConfirmBtn).click()
    }
    assertDeleteOrgWithoutPass() {
        cy.get("[class='el-message']").should('contain', 'The password is incorrect.')
    }
}
export default Organizations;