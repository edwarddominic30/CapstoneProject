



/// <reference types="cypress" />

import Com from './cpcommands'

describe('Capstone Project NOP Commerce', ()=>{
    
    before(function(){
        cy.viewport('macbook-16')
        
        cy.fixture('datarequest').then(  (availableData) => {
            this.CapNOPCom =  availableData;
        })
    })

    it('Verify NOP Commerce for Capstone Project - Add New Customer', function(){

        const Email = "edward_dominic"+ Math.floor(Math.random()*(30 -10))+10 +"@sample.com"


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

        //Click Add New Customer
        cy.CapstoneClickCommand('//*[@href="/Admin/Customer/Create"]')
        
        //Validate Customer Page Content
        cy.VerifyAddCustomerPage()

        //Enter New Customer Details
        CPCommandMethod.EnterCustomerDetails(
            Email,
            this.CapNOPCom.Pass,
            this.CapNOPCom.Firstname,
            this.CapNOPCom.Lastname,
            this.CapNOPCom.DOB,
            this.CapNOPCom.Company,
            this.CapNOPCom.Comment)


         //Click Save Customer
       cy.CapstoneClickCommand('//*[@name="save"]')

       //Verify Alert Message
       CPCommandMethod.VerifyAlertMessage('The new customer has been added successfully.','Deleted')


       //Take a Screenshot
       cy.wait(3000)
       cy.screenshot()


        //Click Logout Button
        cy.CapstoneClickCommand('//*[@href="/logout"]')


    })
})