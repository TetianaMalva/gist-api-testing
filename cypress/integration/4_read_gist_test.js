/// <reference types="Cypress" />

import { getGist, postGist, doDeleteGist, checkRateLimit, assertGist } from '../support/gist_functions';
import { authHeader, noAuth } from '../support/constants';

describe('GET https://api.github.com/gists/:gist_id', function () {

    let gistId

    let gistBody = {
        "files": {
            "test1.txt": {
                "content": "Example Content 1"
            },
            "test2.txt": {
                "content": "Example Content 2"
            }
        }
    }

    beforeEach(() => {
        checkRateLimit(authHeader)
        checkRateLimit(noAuth)

        cy.request(
            postGist(gistBody, authHeader)
        ).then((resp) => {
            expect(resp.status).to.eq(201)
            gistId = resp.body.id
        })

    })
    
    it('Test - Read a gist - For authorized and unauthorized call', () => {
        
        let gistHeaders = [authHeader, noAuth]
    
        gistHeaders.forEach((header) => {

            cy.request(
                getGist(gistId, header)
            ).then((resp) => {
                expect(resp.status).to.eq(200)
                assertGist(resp.body, gistBody)
            })
            
        })
    })

    afterEach(() => {
        doDeleteGist(gistId, authHeader)
    })
})