



/// <reference types="cypress" />

import Com from './cpcommands'

describe('Capstone Project NOP Commerce', ()=>{
    
    before(function(){
        cy.viewport('macbook-16')
        
        cy.fixture('datarequest').then(  (availableData) => {
            this.CapNOPCom =  availableData;
        })
    })

    it('Verify NOP Commerce for Capstone Project - Search Customer', function(){

        const CPCommandMethod = new Com();

         //Launch Application Page
         cy.visit(this.CapNOPCom.CapstoneURL)
         //Log Admin Email and Password
         cy.log(this.CapNOPCom.Email)
         cy.log(this.CapNOPCom.Password)
 
         //Enter and Validate Admin Email and Password
         //Validate Checkbox
         //Click Login Button
         cy.AdminLoginAndVerify(this.CapNOPCom.Email,this.CapNOPCom.Password)
        
          //Validate Page Title and Page Content
         cy.VerifyDashboardPage()
 
         //Click on Customer Sidebar Menu
         CPCommandMethod.ClickCustomer("(//p[contains(text(),'Customers')])[1]")
 
         //Click Customer Page
         CPCommandMethod.ClickCustomer("(//p[contains(text(),'Customers')])[2]")


         //Enter Firstname and Click Search Button
         CPCommandMethod.ClickSearchText('Input#SearchFirstName','Edward')

          //Enter Firstname and Click Search Button
          CPCommandMethod.ClickSearchText('Input#SearchLastName','Dominic')

         //Verify Search Result
         CPCommandMethod.VerifySearchResult('Edward')


         //Take a Screenshot
       cy.wait(3000)
       cy.screenshot()


        //Click Logout Button
        cy.CapstoneClickCommand('//*[@href="/logout"]')




    })

})