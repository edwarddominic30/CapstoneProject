

/// <reference types="cypress" />

describe('Verify API Github Repository', ()=>{

    it('Create New Github Repository User API Post', ()=>{

        cy.fixture('datarequest').then((availableData) => {
            
            cy.request({
            method: "POST", 
            url: availableData.APIURL,
                           
            body: 	{
                "name": availableData.RepositoryName
            },               
            headers: {

                        "Authorization" : "Bearer "+ availableData.AuthToken,
                        "Content-Type": "application/json"
                      }
        })      
        .then((apiresult) => {

                    //Request Status
                    expect(apiresult.status).to.eq(201)
                    //Validate Owner name
                    expect(apiresult.body.owner.login).to.eq(availableData.OwnerName)
                    //Validate Repository Name
                    expect(apiresult.body.name).to.eq(availableData.RepositoryName)
                    //Validate Repository Full Name
                    expect(apiresult.body.full_name).to.eq(availableData.OwnerName+"/"+availableData.RepositoryName)
                    
            })
        })
            
    })

    it.skip('Delete Newly Created Repo API', ()=>{
        cy.fixture('datarequest').then((availableData) => {

            cy.request({

                method: "DELETE",
                //url: "https://github.com/edwarddominic30/APINewCapstoneRepo",
                url: `${availableData.APIURL}/${availableData.OwnerName}/${availableData.RepositoryName}`,

                headers: {
                    "Authorization" : "Bearer "+ availableData.AuthToken
                }
            })
            .then((apiresult)=>{
                cy.log(apiresult)
                expect(apiresult.status).to.eq(204)

            })


        })
    })
})