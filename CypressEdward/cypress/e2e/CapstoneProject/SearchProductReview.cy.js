






/// <reference types="cypress" />

import Com from './cpcommands'

describe('Capstone Project NOP Commerce', ()=>{
    
    before(function(){
        cy.viewport('macbook-16')
        
        cy.fixture('datarequest').then(  (availableData) => {
            this.CapNOPCom =  availableData;
        })
    })

    it('Verify NOP Commerce for Capstone Project - Search Product Review', function(){

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
        CPCommandMethod.ClickMenuItems("(//p[contains(text(),'Product reviews')])")
    
        //Select Date Picker
        CPCommandMethod.getDatePicker()

        //Click Search Button
        cy.CapstoneClickCommand('//*[@id="search-productreviews"]')
         

        //Take a Screenshot
        cy.wait(3000)
        cy.screenshot()

    })
})
