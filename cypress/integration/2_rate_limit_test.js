/// <reference types="Cypress" />

import { getRateLimit, checkRateLimit, getGistsPublic } from '../support/gist_functions';
import { authHeader, noAuth } from '../support/constants';

describe('GET https://api.github.com/rate_limit', function () {

    beforeEach(() => {
        checkRateLimit(authHeader)
        checkRateLimit(noAuth)
    })

    it('Test - Get rate limit - For authorized and unauthorized call', () => {

        let rateLimitBefore
        let authHeaderArray = [authHeader, noAuth]

        authHeaderArray.forEach((authHeader) => {

            cy.request(
                getRateLimit(authHeader)
            ).then((resp) => {
                expect(resp.status).to.eq(200)
                rateLimitBefore = resp.body.resources.core.remaining

                cy.request(
                    getGistsPublic(authHeader)
                ).then((resp) => {
                    expect(resp.status).to.eq(200)

                    cy.request(
                        getRateLimit(authHeader)
                    ).then((resp) => {
                        expect(resp.status).to.eq(200)
                        let rateLimitAfter = resp.body.resources.core.remaining
                        expect(rateLimitBefore - 1).to.eq(rateLimitAfter)
                    })
                })
            })
        })
    })
})