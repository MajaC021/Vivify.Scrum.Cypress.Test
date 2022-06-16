import 'cypress-file-upload';
import data from "../fixtures/data.json"
import Login from '../support/classes/login';
import Logout from '../support/classes/logout';
import Organizations from '../support/classes/org';
import Boards from '../support/classes/boards';

const boards = new Boards();
const organizations = new Organizations();
const login = new Login();
const logout = new Logout();
let user;
let orgId;
let boardId;

//login, logout
Cypress.Commands.add('login', (email = data.user.email, password = data.user.pass) => {
    cy.intercept({
        method: "POST",
        url: "api/v2/login",
    }).as('login')
    login.login(email, password)
    login.assertLogin();
    cy.wait('@login').then((interceptObj) => {
       user = interceptObj.response.body.user.full_name;
        expect(interceptObj.response.statusCode).eq(200)
        expect(interceptObj.response.body.user.email).eq(email)
    })
});
Cypress.Commands.add('logout', () => {
    cy.intercept({
        method: "POST",
        url: "api/v2/logout",
    }).as('logout')
    logout.logout(user);
    logout.assertLogout();
    cy.wait('@logout').then((interceptObj) => {
        expect(interceptObj.response.statusCode).eq(201)
        expect(interceptObj.response.body.message).eq("Successfully logged out")
    })
});

//Organizations
Cypress.Commands.add('addOrganization', (name = data.org.orgName) => {
    cy.intercept({
        method: "POST",
        url: "api/v2/organizations",
    }).as('createOrgRequest')
    organizations.addNewOrg(name)
    organizations.assertNewOrg(name);
    cy.wait('@createOrgRequest').then((interceptObj) => {
        expect(interceptObj.response.statusCode).eq(201)
        expect(interceptObj.response.body.name).eq(name)
        orgId = interceptObj.response.body.id;
    })
});
Cypress.Commands.add('archiveAndDeleteOrg', (password = data.user.pass) => {
    cy.visit(`/organizations/${orgId}/settings`)
    cy.intercept({
        method: "PUT",
        url: `/api/v2/organizations/${orgId}/status`,
    }).as('createOrgRequest')
    organizations.archiveOrg()
    organizations.assertArchiveOrg()
    organizations.deleteArchiveOrg(password)
    cy.wait('@createOrgRequest').then((interceptObj) => {
        expect(interceptObj.response.statusCode).eq(200)
        expect(interceptObj.response.body.status).eq("archived")
    })
});

Cypress.Commands.add('deleteOrg', (password = data.user.pass) => {
    cy.visit(`/organizations/${orgId}/settings`)
    cy.intercept({
        method: "POST",
        url: `/api/v2/organizations/${orgId}`,
    }).as('createOrgRequest')
    organizations.deleteOrg(password)
    cy.wait('@createOrgRequest').then((interceptObj) => {
        console.log(interceptObj)
        expect(interceptObj.response.body.id).eq(orgId)
        expect(interceptObj.response.statusCode).eq(201)
    })
});
Cypress.Commands.add('updateOrgApi', (name = data.org.editOrgName) => {
    cy.visit(`/organizations/${orgId}/settings`)
    cy.intercept({
        method: "PUT",
        url: `api/v2/organizations/${orgId}`,
    }).as('createOrgRequest')
    organizations.editOrg(name)
    organizations.assertEditOrg(name)
    cy.wait('@createOrgRequest').then((interceptObj) => {
        expect(interceptObj.response.statusCode).eq(200)
        expect(interceptObj.response.body.name).eq(name)
    })
});

//Boards
Cypress.Commands.add('addNewBoardApi', () => {
    cy.intercept({
        method: "POST",
        url: "api/v2/boards",
    }).as('createBoardRequest')
    boards.createBoard("Test new board")
    cy.wait('@createBoardRequest').then((interceptObj) => {
        expect(interceptObj.response.statusCode).eq(201)
        expect(interceptObj.response.body.name).eq('Test new board')
        boardId = interceptObj.response.body.id;
    })
});
Cypress.Commands.add('editBoardApi', () => {
    cy.intercept({
        method: "PUT",
        url: `api/v2/boards/${boardId}`,
    }).as('editBoardcode')
    cy.visit(`/boards/${boardId}/settings`)
    boards.editBoardCode('YYYY')
    cy.wait('@editBoardcode').then((interceptObj) => {
        expect(interceptObj.response.statusCode).eq(200)
        expect(interceptObj.response.body.code).eq('YYYY')
    })
});

 Cypress.Commands.add('editBoardNameApi', () => {
    cy.intercept({
        method: "PUT",
        url: `api/v2/boards/${boardId}`,
    }).as('editBoardname')
    cy.visit(`/boards/${boardId}/settings`)
    boards.editBoardName("name edited")
    boards.assertBoardNameEdited("name edited")
    cy.wait('@editBoardname').then((interceptObj) => {
        expect(interceptObj.response.statusCode).eq(200)
        expect(interceptObj.response.body.name).eq('name edited')
    })
 });

Cypress.Commands.add('deleteBoardApi', () => {
    cy.intercept({
        method: "DELETE",
        url: `api/v2/boards/${boardId}`,
    }).as('deleteBoard')
    cy.visit(`/boards/${boardId}/settings`)
    boards.deleteBoard()
    cy.wait('@deleteBoard').then((interceptObj) => {
        expect(interceptObj.response.statusCode).eq(200)
        expect(interceptObj.response.body.id).eq(boardId)
    })
    boards.assertDeleteBoard(`${boardId}`)
});

 Cypress.Commands.add('codeWith5characters', () => {
    cy.visit(`/boards/${boardId}/settings`)
    boards.editBoardCodeWith5Char("board")
    boards.assertBoardCodeMoreThanLimitChar();
 });

Cypress.Commands.add('boardWithoutName', () => {
    cy.visit(`/boards/${boardId}/settings`)
    boards.editBoardNameWithoutName();
    boards.assertBoardWithoutName();
});

Cypress.Commands.add('boardWithoutCode', () => {
    cy.visit(`/boards/${boardId}/settings`)
    boards.editBoardWithoutCode();
    boards.assertBoardWithoutCode();
});


//tasks
// Cypress.Commands.add('deleteBoardApi', () => {

// });
// Cypress.Commands.add('deleteBoardApi', () => {

// });

// Cypress.Commands.add('deleteBoardApi', () => {

// });
// Cypress.Commands.add('deleteBoardApi', () => {

//});