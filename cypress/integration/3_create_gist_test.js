/// <reference types="Cypress" />

import { getGist, postGist, doDeleteGist, checkRateLimit, assertGist } from '../support/gist_functions';
import { authHeader } from '../support/constants';

describe('POST https://api.github.com/gists', function () {

    let gistBodyWithTwoFiles = {
        "files": {
            "test1.txt": {
                "content": "Example Content 1"
            },
            "test2.txt": {
                "content": "Example Content 2"
            }
        }
    }

    let gistBodyWithOneFile = {
        "files": {
            "test1.txt": {
                "content": "Example Content 1"
            }
        }
    }


    let gistIds = []

    beforeEach(() => {
        checkRateLimit(authHeader)
    })

    it('Test - Create a gist - For authorized call', () => {

        let gistBodies = [gistBodyWithTwoFiles, gistBodyWithOneFile]

        gistBodies.forEach((gistBody) => {

            cy.request(
                postGist(gistBody, authHeader)
            ).then((resp) => {
                expect(resp.status).to.eq(201)
                let gistId = resp.body.id
                gistIds.push(gistId)

                cy.request(
                    getGist(gistId, authHeader)
                ).then((resp) => {
                    expect(resp.status).to.eq(200)
                    assertGist(resp.body, gistBody)
                })
            })
        })
    })

    afterEach(() => {
        gistIds.forEach((gistId) => {
            doDeleteGist(gistId, authHeader)
        })
    })
})
