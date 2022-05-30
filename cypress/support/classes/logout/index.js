import LogoutElements from '../../elements/logout-elements';


class Logout  {

    logout(user){
        cy.contains(`${user}`).click()
        cy.get(LogoutElements.profile).click()
        cy.get(LogoutElements.logoutBtn).click()
    }
    assertLogout(){
         //assert that we logged out
         cy.get(LogoutElements.saveUpdate).should('be.visible').and('contain', "Log In")
         cy.get('h1').should('contain', 'Log in with your existing account')
    }
}
export default Logout;