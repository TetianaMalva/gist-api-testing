/// <reference types="Cypress" />

import { postGist, doDeleteGist, checkRateLimit, patchGist, assertGist } from '../support/gist_functions';
import { authHeader } from '../support/constants';

describe('PATCH https://api.github.com/gists/:gist_id', function () {

    let gistId

    let originalGistBody = {
        "files": {
            "test1.txt": {
                "content": "Example Content"
            }
        }
    }

    beforeEach(() => {
        checkRateLimit(authHeader)

        cy.request(
            postGist(originalGistBody, authHeader)
        ).then((resp) => {
            expect(resp.status).to.eq(201)
            gistId = resp.body.id
        })
    })

    it('Test - Update a gist - For authorized call', () => {
        
        let updatedGistBody = {
            "files": {
                "test1.txt": {
                    "content": "Updated Example Content"
                }
            }
        }

        cy.request(
            patchGist(gistId, authHeader, updatedGistBody)
        ).then((resp) => {
            expect(resp.status).to.eq(200)
            assertGist(resp.body, updatedGistBody)
        })
    })

    afterEach(() => {
        doDeleteGist(gistId, authHeader)
    })
})