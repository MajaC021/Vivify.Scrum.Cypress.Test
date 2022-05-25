import loginModel from "../pages/loginModel.json"
import boards from "../pages/boards.json"
import dataBoard from "../fixtures/data.json"

describe("create organization", () => {

    beforeEach("User needs to be login", () => {
        cy.visit("/login")
        cy.get(loginModel.email).type(dataBoard.user.email)
        cy.get(loginModel.password).type(dataBoard.user.pass)
        cy.get(loginModel.logInBtn).click();

        cy.get('[class=vs-u-text--uppercase]')
            .should('be.visible')
            .and('contain', 'My Organizations')

        cy.get('span.el-dropdown-link').should(($loggedInUser) => {
            expect($loggedInUser).to.contain('Maja Cveticanin')
        })
        cy.get('.vs-c-modal__body > .el-button > .el-icon-close').click()
    });

    afterEach("logout user", () => {
        cy.get("span[class='vs-c-user-name']").click()
        cy.get('[data-cy="account-profile"]').click()
        cy.get('button[class="vs-c-btn vs-c-btn--link vs-c-btn--danger"]').click()

         //assert that  we logged out
        cy.get('button[type="submit"]').should('be.visible')
        cy.get('h1').should('contain', 'Log in with your existing account')

    })

    //positive
    it("Add new board", () => {
        cy.get(boards.addNewBoardBtnDropdown).eq(1).click({ force: true });
        cy.get(boards.addBoardBtn).eq(1).click();
        cy.get(boards.inputBoardName).eq(1).type(dataBoard.board.brdName)
        cy.get(boards.checkOrgListBtn).click();
        cy.get(boards.checkOrgFromList).eq(1).click();
        cy.get(boards.nextBtn).click();
        cy.get(boards.checkScrumRb).click();
        cy.get(boards.nextBtn).click();
        cy.get(boards.nextBtn).click();
        cy.get(boards.nextBtn).click();
        cy.get(boards.nextBtn).click();

        cy.get('li[class="vs-c-list__item has-caret"]').should(($loggedInUser) => {
            expect($loggedInUser).to.contain(dataBoard.board.brdName)
        })
    })

    it("Edit board code", () => {
        cy.get(boards.activeBoard).eq(3).click();
        cy.get(boards.editBoard).eq(8).click();
        cy.get(boards.configBoardCode).clear();
        cy.get(boards.configBoardCode).type("bb{enter}");

        cy.get('.el-message__group > p')
            .should('be.visible')
            .and('contain', 'Successfully updated the Board Basic Info.')
    })

    it("Edit board name", () => {
        cy.get(boards.activeBoard).eq(3).click();
        cy.get(boards.editBoard).eq(8).click();
        cy.get(boards.edinBrdName).eq(0).clear()
        cy.get(boards.edinBrdName).eq(0).type(dataBoard.board.editBrdName);
        cy.get(boards.saveUpdate).eq(0).click()

        cy.get('.el-message__group > p')
            .should('be.visible')
            .and('contain', 'Successfully updated the Board Basic Info.')
    })

    it.only("Delete board", () => {
        cy.get(boards.activeBoard).eq(3).click();
        cy.get(boards.editBoard).eq(8).click({ force: true });
        cy.get(boards.deleteBoard).click()
        cy.get(boards.confirmDeleteBrd).click()

        cy.get('[class="vs-c-organization-boards"]').should(($board) => {
            expect($board).to.contain("testB")
        })
    })

    //negative
    it("Edit board code with 5 characters", () => {
        cy.get(boards.activeBoard).eq(3).click();
        cy.get(boards.editBoard).eq(8).click();
        cy.get(boards.configBoardCode).type("board code change{enter}");

        cy.get('.el-form-item__error el-form-item-error--top').should(($editBoard) => {
            expect($editBoard).to.contain("The board code field may not be greater than 4 characters")
        })
    })

    it("Edit board without name", () => {
        cy.get(boards.activeBoard).eq(3).click();
        cy.get(boards.editBoard).eq(8).click();
        cy.get(boards.edinBrdName).eq(0).clear()

        cy.get("button[type='submit']").should('be.disabled')
        cy.get("span[class='el-form-item__error el-form-item-error--top']").should('contain', "The board title field is required")
    })

    it("Edit board without code", () => {
        cy.get(boards.activeBoard).eq(3).click();
        cy.get(boards.editBoard).eq(8).click();
        cy.get(boards.configBoardCode).clear();

        cy.get("button[type='submit']").should('be.disabled')
        cy.get("span[class='el-form-item__error el-form-item-error--top']")
            .should('contain', 'The board code field is required')
    })
})