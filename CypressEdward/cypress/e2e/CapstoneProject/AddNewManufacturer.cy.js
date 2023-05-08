

/// <reference types="cypress" />

import Com from './cpcommands'

describe('Capstone Project NOP Commerce', ()=>{
    
    before(function(){
        cy.viewport('macbook-16')
        
        cy.fixture('datarequest').then(  (availableData) => {
            this.CapNOPCom =  availableData;
        })
    })

    it('Verify NOP Commerce for Capstone Project - Add New Manufacturer', function(){

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

        //Click Add New Manufacturer
        cy.CapstoneClickCommand('//*[@href="/Admin/Manufacturer/Create"]')

        //Switch from Basic to Advance
        CPCommandMethod.SwitchAdvanceToggle('.onoffswitch')


         //Enter New Manufacturer Details
         CPCommandMethod.EnterManufacturerDetails(
            this.CapNOPCom.ManufacturerName,
            this.CapNOPCom.ManufacturerDesc,
            this.CapNOPCom.ManuImage)

        //Save New Manufacturer
        cy.CapstoneClickCommand('//*[@name="save"]')


         //Verify Alert Message
       CPCommandMethod.VerifyAlertMessage('The new manufacturer has been added successfully.','deleted')


       //Take a Screenshot
       cy.wait(3000)
       cy.screenshot()


    })
})
