class Com {

    //Identification

        //Add Customer
    Email = 'Input#Email'
    Password = 'Input#Password'
    Firstname ='Input#FirstName'
    Lastname='Input#LastName'
    Gender ='(//input[@name="Gender"])[1]'
    DOB='Input#DateOfBirth'
    CompanyName='Input#Company'
    Tax='Input#IsTaxExempt'
    Newsletter ='div#SelectedNewsletterSubscriptionStoreIds-list' 
    CustomerRoles=''
    ManagerofVendor =''
    Active='Input#Active'
    AdminComment ='textarea#AdminComment'
    btnSave ='//*[@name="save"]'

    Message ='//*[@class="alert alert-success alert-dismissable"]'


    SidebarCust = "(//p[contains(text(),'Customers')])[1]"
    CustPage = "(//p[contains(text(),'Customers')])[2]"



    btnSearch = "//*[@id='search-customers']"
    //txtSearch ="Input#SearchEmail"

    //SearchResult ="//td[contains(text(), 'edward_dominic')]"


    //Add Manufacturer
    ManufacturerName ='Input#Name'
    ManuDesc ='#Description_ifr'
    btnUpload='//*[@name="qqfile"]'
    FileName='//*[@class="qq-upload-file-selector qq-upload-file"]'
    DisplaySection ='div#manufacturer-display'
    Published='Input#Published'
    AllowCust ='Input#AllowCustomersToSelectPageSize'
    Pagesize ='Input#PageSizeOptions'
    PriceRange ='Input#PriceRangeFiltering'
    PriceManual ='Input#ManuallyPriceRange'
    PFromClick ='(//*[@class="k-formatted-value k-input"])[2]'
    PFrom ='Input#PriceFrom'
    PToClick ='(//*[@class="k-formatted-value k-input"])[3]'
    PTo='Input#PriceTo'
    DisplayClick ='(//*[@class="k-formatted-value k-input"])[4]'
    Display ='Input#DisplayOrder'


    //Edit
    SearchManu ='Input#SearchManufacturerName'
    btnSearchManu = '//*[@id="search-manufacturers"]'
    Table ='table#manufacturers-grid>tbody>tr>td'
  

    


    ClickCustomer(ele){
        cy.xpath(ele)     
            .click()

    }
    ClickCustomerPage(){
        cy.xpath(this.CustPage)     
            .click()

    }


    EnterCustomerDetails(email,pass,fname,lname,dob,comname,comment){

        cy.get(this.Email).should('exist').clear().type(email)
        cy.get(this.Password).should('exist').clear().type(pass)
        cy.get(this.Firstname).clear().type(fname)
        cy.get(this.Lastname).clear().type(lname)
        cy.xpath(this.Gender).should('exist').check()
        cy.get(this.DOB).clear().type(dob)
        cy.get(this.CompanyName).should('exist').clear().type(comname)
        cy.get(this.AdminComment).should('exist').clear().type(comment)

    }

    VerifyAlertMessage(ele,notele){
        cy.xpath(this.Message)
            .should('exist')     
            .and('contain',ele)
            .and('not.contain',notele)

    }

    ClickSearchText(txt,ele){

        cy.get(txt).clear().type(ele)
        cy.xpath(this.btnSearch).click()
    }

    VerifySearchResult(searchcontain){
        cy.xpath(`//td[contains(text(), ${searchcontain})]`).should('exist')
    }


    ClickMenuItems(ele){
        cy.xpath(ele).should('exist').click()
    }

    SwitchAdvanceToggle(ele){
        cy.get(ele)
            .find('input[type="checkbox"]')
            .then($checkbox =>{
                if($checkbox.prop('checked')){
                
                cy.log('Switch in on Advanced')
                   
                } else {                      
                    cy.get(ele).click()
                    cy.log('Switch from Basic to Advanced')             
                }
            });
    }

    EnterManufacturerDetails(name,desc,image){

        cy.get(this.ManufacturerName).should('exist').clear().type(name)

        cy.frameLoaded(this.ManuDesc)
        cy.iframe(this.ManuDesc).clear().type(desc).click()

        cy.xpath(this.btnUpload).attachFile(image)
        cy.xpath(this.FileName).should('exist').contains('LenovoImage.jpg')


        cy.get(this.DisplaySection).click()

        cy.get(this.Published).uncheck().should('not.be.checked').check().should('be.checked')
        cy.get(this.AllowCust).uncheck().should('not.be.checked').check().should('be.checked')
        //cy.get(this.PriceRange).uncheck().should('not.be.checked').check().should('be.checked')
        //cy.get(this.PriceManual).uncheck().should('not.be.checked').check().should('be.checked')

        cy.xpath(this.PFromClick).click()
        cy.get(this.PFrom, {force: true}).clear().type('100')
        
        cy.xpath(this.DisplayClick).click()
        cy.get(this.Display, {force: true}).clear().type('2')
    }

    ClickEditManufacturer(brand){

        // cy.get(this.SearchManu).clear().type(brand)
        // cy.xpath(this.btnSearchManu).click()

        cy.get(this.Table).contains(brand).should('exist').parent('tr').find('td>a').click()
      
    }

    UpdateManuDetails(name,desc){
        cy.get(this.ManufacturerName).should('exist').type(name)

        cy.frameLoaded(this.ManuDesc)
        cy.iframe(this.ManuDesc).type(desc).click()


        cy.xpath(this.PToClick).click()
        cy.get(this.PTo, {force: true}).clear().type('5000')

        cy.xpath(this.DisplayClick).click()
        cy.get(this.Display, {force: true}).clear().type('3')
        
    }

    SelectManufacturertoDelete(brand){


        // cy.get(this.SearchManu).clear().type(brand)
        // cy.xpath(this.btnSearchManu).click()

        if(cy.contains('table',brand).should('be.visible')){
        cy.get(this.Table).contains(brand).should('exist').parent('tr').find('td>input').check()
        }else{
            cy.log(brand+' is not on the Manufacturers table')
        }
    }


    getDatePicker(){
        cy.xpath('//span[@aria-controls="CreatedOnFrom_dateview"]//span[@class="k-icon k-i-calendar"]').click()
        const mm =4

        cy.xpath(`//div[@class="k-animation-container"]//a[@data-value="2023/3/30"]`,{force: true}).should('exist').click({force: true})


        cy.xpath('//span[@aria-controls="CreatedOnTo_dateview"]//span[@class="k-icon k-i-calendar"]').click()
        const mm2 =6

        cy.wait(2000)
        cy.xpath('(//div[@class="k-animation-container"]//a[@data-value="2023/4/15"])',{force: true}).should('exist').click({force: true})
    }



}
export default Com;