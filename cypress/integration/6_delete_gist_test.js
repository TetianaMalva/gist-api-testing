/// <reference types="Cypress" />

import { getGist, postGist, deleteGist, checkRateLimit } from '../support/gist_functions';
import { authHeader } from '../support/constants';

describe('DEL https://api.github.com/gists/:gist_id', function () {

    let gistId

    let gistBody = {
        "files": {
            "test1.txt": {
                "content": "Example Content"
            }
        }
    }

    beforeEach(() => {
        checkRateLimit(authHeader)

        cy.request(
            postGist(gistBody, authHeader)
        ).then((resp) => {
            expect(resp.status).to.eq(201)
            gistId = resp.body.id
        })
    })

    it('Test - Delete a gist - For authorized call', () => {
      
        cy.request(
            deleteGist(gistId, authHeader)
        ).then((resp) => { expect(resp.status).to.eq(204) })

        cy.request(
            getGist(gistId, authHeader)
        ).then((resp) => { expect(resp.status).to.eq(404) })
        
    })
})