function base64Decode(str) { 
    return new Buffer(str, 'base64').toString()
}

export const authHeader = {
    Authorization: "Bearer " + base64Decode(Cypress.config('credentials').authToken)
}

export const noAuth = {}

export const userName = Cypress.config('credentials').userName