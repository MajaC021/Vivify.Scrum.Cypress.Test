import BoardElements from '../../elements/board-elements';


class Boards {
    createBoard(boardName) {
        cy.get(BoardElements.addNewBoardBtnDropdown).click()
        cy.get(BoardElements.addBoardBtn).eq(1).click()
        cy.get(BoardElements.inputBoardName).eq(1).type(`${boardName}{enter}`)
        cy.get(BoardElements.checkOrgListBtn).click();
        cy.get(BoardElements.checkOrgFromList).eq(0).click();
        cy.get(BoardElements.nextBtn).click();
        cy.get(BoardElements.checkScrumRb).click();
        cy.get(BoardElements.nextBtn).click();
        cy.get(BoardElements.nextBtn).click();
        cy.get(BoardElements.nextBtn).click();
        cy.get(BoardElements.nextBtn).click();
    }

    assertBoardName(boardName) {
        cy.get('li[class="vs-c-list__item has-caret"]').should(($boardName) => {
            expect($boardName).to.contain(`${boardName}`)
        })
    }

    editBoardCode(editBoardCode) {
        cy.get(BoardElements.editBoardCode).click();
        cy.get(BoardElements.configBoardCode).clear();
        cy.get(BoardElements.configBoardCode).type(`${editBoardCode}{enter}`);
    }

    assertBoardCodeEdited(editBoardCode) {
        cy.get('.el-message__group > p')
            .should('be.visible')
            .and('contain', 'Successfully updated the Board Basic Info.')
        cy.get(".vs-c-avatar > .vs-c-img--avatar > span").then(($div) => {
            expect($div).to.have.text(`${editBoardCode}`)
        })
    }

    editBoardName(editBoardName) {
        cy.get(BoardElements.edinBrdName).eq(0).clear()
        cy.get(BoardElements.edinBrdName).eq(0).type(`${editBoardName}{enter}`);
        cy.get(BoardElements.saveUpdate).eq(0).click()
    }

    assertBoardNameEdited(editBoardName) {
        cy.get('.el-message__group > p')
            .should('be.visible')
            .and('contain', 'Successfully updated the Board Basic Info.')
    }

    deleteBoard() {
        cy.get(BoardElements.deleteBoard).click()
        cy.get(BoardElements.confirmDeleteBrd).click()
        cy.get(BoardElements.infoBoardClose).click()
    }

    assertDeleteBoard(boardId) {
        cy.contains(`${boardId}`).should('not.exist')
    }

    editBoardCodeWith5Char(editBoardCode) {
        cy.get(BoardElements.editBoardCode).click();
        cy.get(BoardElements.configBoardCode).clear();
        cy.get(BoardElements.configBoardCode).type(`${editBoardCode}{enter}`);
    }

    assertBoardCodeMoreThanLimitChar() {
        cy.get('.vs-c-form-item__error-wrapper > .el-form-item__error').should(($editBoard) => {
            expect($editBoard).to.contain("The board code field may not be greater than 4 characters")
        })
    }

    editBoardNameWithoutName() {
        cy.get(BoardElements.edinBrdName).eq(0).clear()
    }

    assertBoardWithoutName() {
        cy.get(BoardElements.saveUpdate).should('be.disabled')
        cy.get(".el-form-item__error.el-form-item-error--top").should('contain', "The board title field is required")
    }

    editBoardWithoutCode() {
        cy.get(BoardElements.editBoardCode).click();
        cy.get(BoardElements.configBoardCode).clear();
    }

    assertBoardWithoutCode() {
        cy.get(BoardElements.saveUpdate).should('be.disabled')
        cy.get('.el-form-item__error')
            .should('contain', 'The board code field is required')
    }
}
export default Boards;