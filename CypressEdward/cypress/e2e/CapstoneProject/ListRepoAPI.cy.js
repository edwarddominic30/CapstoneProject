

/// <reference types="cypress" />

describe('Verify API Github Repository', ()=>{

    it('List Github Repository User API Post', ()=>{

        cy.fixture('datarequest').then((availableData) => {
            cy.request({
                method: "GET", 
                url: availableData.APIURL,
                headers: {

                            "Authorization" : "Bearer "+ availableData.AuthToken

                          }
            })           
            .then((apiresult) => {

                //Request Status
                expect(apiresult.status).to.eq(200)
                //Validate Owner Name
                expect(apiresult.body[0].owner.login).to.eq(availableData.OwnerName)
                expect(apiresult.body[0].owner.login).to.not.eq("edwardgarado")
                //Validate First Repository Name
                expect(apiresult.body[0].name).to.eq(availableData.RepositoryName)
                expect(apiresult.body[0].name).to.not.contain("OldCapstone")
                //Validate List of Repository

                 apiresult.body.forEach((repolist) => {
                    cy.log(repolist.full_name)
                });
                expect(apiresult.body[0].full_name).to.eq(availableData.OwnerName+"/"+availableData.RepositoryName)              
                expect(apiresult.body[1].full_name).to.eq(availableData.OwnerName+"/CapstoneProject")
                expect(apiresult.body[2].full_name).to.eq(availableData.OwnerName+"/CypressAutomation")
                expect(apiresult.body[3].full_name).to.eq(availableData.OwnerName+"/CypressAutomationMidTerm")
                expect(apiresult.body[4].full_name).to.eq(availableData.OwnerName+"/NewCypressAutomation")                             
        })
        })
    })
})