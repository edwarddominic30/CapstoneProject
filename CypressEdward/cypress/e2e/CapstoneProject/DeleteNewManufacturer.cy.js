



/// <reference types="cypress" />

import Com from './cpcommands'

describe('Capstone Project NOP Commerce', ()=>{
    
    before(function(){
        cy.viewport('macbook-16')
        
        cy.fixture('datarequest').then(  (availableData) => {
            this.CapNOPCom =  availableData;
        })
    })

    it('Verify NOP Commerce for Capstone Project - Delete New Manufacturer', function(){

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

        //Click on Catalog Menu
        CPCommandMethod.ClickMenuItems("(//p[contains(text(),'Catalog')])[1]")

        //Click Manufacturer Page
        CPCommandMethod.ClickMenuItems("(//p[contains(text(),'Manufacturers')])")

        //Select Manufacturer to be Deleted
       CPCommandMethod.SelectManufacturertoDelete(this.CapNOPCom.ManufacturerName)


       //Click Delete Button
       cy.CapstoneClickCommand('//*[@id="delete-selected"]')


       //Confirm Delete Selected
       cy.CapstoneClickCommand('//*[@id="delete-selected-action-confirmation-submit-button"]')
       

       //Take a Screenshot
       cy.wait(3000)
       cy.screenshot()


    })
})
