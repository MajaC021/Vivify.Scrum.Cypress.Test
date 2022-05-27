import loginModel from "../pages/loginModel.json"
import organizations from "../pages/organizations.json"
import dataOrg from "../fixtures/data.json"
import logout from "../pages/logout.json"

describe("create organization", () => {

    beforeEach("User needs to be login", () => {
        cy.visit("/login")
        cy.get(loginModel.email).type(dataOrg.user.email)
        cy.get(loginModel.password).type(dataOrg.user.pass)
        cy.get(loginModel.logInBtn).click();

        cy.get('[class=vs-u-text--uppercase]')
            .should('be.visible')
            .and('contain', 'My Organizations')

        cy.get('span.el-dropdown-link').should(($loggedInUser) => {
            expect($loggedInUser).to.contain('Maja C')
        })
    });

    afterEach("logout user", () => {
        cy.contains("Maja C").click()
        cy.get(logout.profile).click()
        cy.get(logout.logoutBtn).click()

        //assert that  we logged out
        cy.get('button[type="submit"]').should('be.visible').and('contain', "Log In")
        cy.get('h1').should('contain', 'Log in with your existing account')
    })

    //positive
    it("Add new org", () => {
        cy.get(organizations.addNewOrgBtnDropdown).eq(1).click({ force: true });
        cy.get(organizations.addOrganizationBtn).eq(0).click();
        cy.get(organizations.inputNameOrg).type(dataOrg.org.orgName)
        cy.get(organizations.nextBtn).click();
        cy.get(organizations.createBtn).click();
        cy.get(organizations.infoBoardOk).click();
        cy.get('[class="vs-l-project__title-info vs-u-cursor--pointer"]')
            .should('be.visible')

        cy.get('[class="vs-l-project__title-info vs-u-cursor--pointer"]').should(($orgItemHeader) => {
            expect($orgItemHeader).to.contain('Organization')
            expect($orgItemHeader).to.contain('test')
        })
        cy.get('[class="vb-content"]').should(($orgItem) => {
            expect($orgItem).to.contain('test')
        })
    })

    it("Edit org with new org name", () => {
        cy.get(organizations.editOrg).eq(0).click();
        cy.get(organizations.changeOrgName).clear()
        cy.get(organizations.changeOrgName).type(dataOrg.org.editOrgName)
        cy.get(organizations.checkEditedOrg).click();

        cy.get('.vs-c-my-organizations-item-wrapper').should(($activeOrg) => {
            expect($activeOrg).to.contain(dataOrg.org.editOrgName)
        })
    })

    it("Arhive org", () => {
        cy.get(organizations.arhiveOrgBtn).click();
        cy.get(organizations.saveConfirmBtn).click();

        cy.get("div[class='vs-c-my-organizations-item-wrapper vs-c-my-organizations-item-wrapper--archived']").should('have.css', 'opacity', '0.4')

        cy.get("div[class='vs-c-my-organizations-item-wrapper vs-c-my-organizations-item-wrapper--archived']").should(($arhivedOrg) => {
            expect($arhivedOrg).to.contain("test")
        })
    })

    it("Delete arhived org", () => {
        cy.get(organizations.deleteArhivedOrg).click()
        cy.get(organizations.confirmPassDeleteOrg).type(dataOrg.user.pass)
        cy.get(organizations.saveConfirmBtn).click()

        cy.get("div[class='vs-c-my-organizations-item-wrapper vs-c-my-organizations-item-wrapper--archived']").should('not.contain', 'Test')
    })

    it("Delete org", () => {
        cy.get(organizations.clickOrg).eq(0).click();
        cy.get(organizations.infoBoardOk).click();
        cy.get(organizations.clickConfig).eq(7).click()
        cy.get(organizations.deleteOrg).eq(5).click()
        cy.get(organizations.confirmPassDeleteOrg).type(dataOrg.user.pass)
        cy.get(organizations.saveConfirmBtn).click()

        cy.get("div[class='vs-c-my-organizations-item-wrapper vs-c-my-organizations-item-wrapper--archived']").should('not.contain', 'Test')
    })

    //negative
    it("Edit org without name", () => {
        cy.get(organizations.editOrg).eq(1).click();
        cy.get(organizations.changeOrgName).clear()
        cy.get(organizations.checkEditedOrg).click();

        cy.get("h2[class='vs-c-my-organization__title']").should('not.be.empty')
    })

    it("Add new org without name", () => {
        cy.get(organizations.addNewOrgBtnDropdown).eq(1).click({ force: true });
        cy.get(organizations.addOrganizationBtn).eq(0).click();

        cy.get("[class='el-button vs-c-button-focus el-button--success el-button--large is-disabled']").should('be.disabled')
        cy.get("input[type='text']").should('be.empty')
    })

    it("Edit org in config without name", () => {
        cy.get(organizations.clickOrg).eq(0).click();
        cy.get(organizations.infoBoardOk).click();
        cy.get(organizations.clickConfig).eq(7).click();
        cy.get(organizations.inputNameOrg).clear();

        cy.get("button[type='submit']").should('be.disabled')
        cy.get("[class='el-form-item__error el-form-item-error--top']").should('contain', 'The name field is required')
    })

    it("Delete org with wrong pass", () => {
        cy.get(organizations.clickOrg).eq(0).click();
        cy.get(organizations.noticeOkClose).click()
        cy.get(organizations.clickConfig).eq(7).click()
        cy.get(organizations.deleteOrg).eq(5).click()
        cy.get(organizations.confirmPassDeleteOrg).type(dataOrg.user.invalidPass)
        cy.get(organizations.saveConfirmBtn).click()

        cy.get("[class='el-message']").should('contain', 'The password is incorrect.')
    })
})