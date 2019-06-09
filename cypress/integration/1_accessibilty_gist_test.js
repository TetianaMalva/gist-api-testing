/// <reference types="Cypress" />

import { postGist, doDeleteGist, checkRateLimit, getGistsByUserName } from '../support/gist_functions';
import { authHeader, noAuth, userName } from '../support/constants';

describe('GET https://api.github.com/users/:username/gists', function () {

    let gistId

    beforeEach(() => {
        checkRateLimit(authHeader)
        checkRateLimit(noAuth)
    })

    it('Test - Accessibility gist of user - For authorized and unauthorized call', () => {

        let gistBody = {
            "files": {
                "test1.txt": {
                    "content": "Example Content 1"
                }
            }
        }

        cy.request(
            postGist(gistBody, authHeader)
        ).then((resp) => {
            expect(resp.status).to.eq(201)
            gistId = resp.body.id

            cy.request(
                getGistsByUserName(authHeader, userName)
            ).then((resp) => {
                expect(resp.status).to.eq(200)
                expect(gistId).to.be.equal(resp.body[0].id)
                expect(resp.body[0].public).to.be.equal(false)
            })

            cy.request(
                getGistsByUserName(noAuth, userName)
            ).then((resp) => {
                expect(resp.status).to.eq(200)
                expect(gistId).to.be.not.equal(resp.body[0].id)
                expect(resp.body[0].public).to.be.equal(true)
            })

        })
    })

    afterEach(() => {
        doDeleteGist(gistId, authHeader)
    })
})