



/// <reference types="cypress" />

import Com from './cpcommands'

describe('Capstone Project NOP Commerce', ()=>{
    
    before(function(){
        cy.viewport('macbook-16')
        
        cy.fixture('datarequest').then(  (availableData) => {
            this.CapNOPCom =  availableData;
        })
    })

    it('Verify NOP Commerce for Capstone Project - Edit New Manufacturer', function(){

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

        //Click Edit Button on new added Manufacturer

    //CPCommandMethod.ClickEditManufacturer(this.CapNOPCom.ManufacturerName)

    cy.contains('table',this.CapNOPCom.ManufacturerName).should('be.visible').then(()=>{

        CPCommandMethod.ClickEditManufacturer(this.CapNOPCom.ManufacturerName)

        //Update Manufacturer Details
       CPCommandMethod.UpdateManuDetails(this.CapNOPCom.UpdatedManufacturerName, this.CapNOPCom.UpdatedManuDesc)

       //Save Updated Manufacturer Details
       cy.CapstoneClickCommand('//*[@name="save"]')


        //Verify Alert Message
        CPCommandMethod.VerifyAlertMessage('The manufacturer has been updated successfully.','added')


        //Take a Screenshot
        cy.wait(3000)
        cy.screenshot()

    })
    
        
       

        
       


    })
})
