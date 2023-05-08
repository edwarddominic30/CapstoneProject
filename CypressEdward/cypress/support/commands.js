// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//const cypress = require('cypress')

require('cypress-xpath')
require('cypress-iframe')
require('@4tw/cypress-drag-drop')

Cypress.Commands.add('CustomMethodClickOnLink', (ele) =>{

    cy.get('a').contains(ele).click()
})

Cypress.Commands.add('Login',(user,pass) =>{


})

require('@4tw/cypress-drag-drop')
require('cypress-iframe');

import 'cypress-file-upload';


Cypress.Commands.add('ClickElement', (text)=>{
    cy.get('*').contains(text).click()
})

Cypress.Commands.add('TypeElement', (id,input)=> {

    cy.get(`input[id="${id}"]`).clear().type(input)
})




Cypress.Commands.add('DropandDropMethod',(ori,des) =>{

    cy.get('class').contains(ori)
    cy.get('class').contains(des)
})


Cypress.Commands.add('Validation', (id,value)=>{

    cy.get(`input[id="${id}"]`).should('eq',`${value}`)
})


Cypress.Commands.add('VisitApplication', ()=>{

    cy.fixture('datarequest').then(  (AppURL) => {

        this.URL =  AppURL;
    })

    cy.visit(this.URL.CapstoneAppURL)
})

Cypress.Commands.add('AdminLoginAndVerify', (email,password)=>{
    //Enter and Validate Admin Email and Password 
    cy.xpath('//*[@type="email"]')
        .clear()
        .type(email)
        .should('have.value', 'admin@yourstore.com')


    cy.get('.password')
        .clear()
        .type(password)
        .should('have.value', 'admin')

    //Validate Checkbox
    cy.xpath("//*[@id='RememberMe']")
        .should('not.be.checked')
        .check()
        .should('be.checked')  


    //Click Login Button
    cy.xpath('//*[@type="submit"]').click()
})


Cypress.Commands.add('CapstoneClickCommand', (ele) =>{
            cy.xpath(ele).should('exist').click()
})

Cypress.Commands.add('VerifyDashboardPage',()=>{
     //Validate Page Title
     cy.title()
     .should('eq','Dashboard / nopCommerce administration')
     .and('not.contain','Customer')


     //Validate Element Value
     cy.get('div.content-header>h1').then((elem) =>{

         let actualTest = elem.text()
         expect(actualTest).to.contain('Dashboard')
         expect(actualTest).to.not.equal('Dash')
         
                            
     })

})

Cypress.Commands.add('VerifyAddCustomerPage', ()=>{

    cy.xpath('//*[@class="float-left"]')
    .should('contain','Add a new customer')
    .and('not.contain','Delete')
})

Cypress.Commands.add('CloseBrowser',()=>{

    cy.window().then((win) =>{
        win.close()
    })

})


