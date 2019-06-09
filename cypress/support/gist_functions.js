// check the rate limit in order to prevent account blocking
export function checkRateLimit(headers) {
    cy.request(
        getRateLimit(headers)
    ).then((resp) => {
        expect(resp.status).to.eq(200)
        let rateLimitNow
        rateLimitNow = resp.body.resources.core.remaining
        assert.isAbove(rateLimitNow, 35, 'If limit is reached, skip all the tests. It is recommended to wait one hour for futher testing')

    })
}

// GET https://api.github.com/gists/public
export function getGistsPublic(headers) {
    return {
        failOnStatusCode: false,
        method: 'GET',
        url: '/gists/public',
        headers: headers
    }
}

// GET https://api.github.com/users/:username/gists 
export function getGistsByUserName(headers, userName) {
    return {
        failOnStatusCode: false,
        method: 'GET',
        url: '/users/' + userName + '/gists',
        headers: headers
    }
}

// GET https://api.github.com/rate_limit
export function getRateLimit(headers) {
    return {
        failOnStatusCode: false,
        method: 'GET',
        url: 'rate_limit',
        headers: headers
    }
}

// GET https://api.github.com/gists/:gist_id
export function getGist(id, headers) {
    return {
        failOnStatusCode: false,
        method: 'GET',
        url: '/gists/' + id,
        headers: headers
    }
}

// authorized - POST https://api.github.com/gists/
export function postGist(payload, headers) {
    return {
        failOnStatusCode: false,
        method: 'POST',
        url: '/gists',
        headers: headers,
        body: payload
    }
}

// authorized -- DEL https://api.github.com/gists/:gist_id
export function deleteGist(id, headers) {
    return {
        failOnStatusCode: false,
        method: 'DELETE',
        url: '/gists/' + id,
        headers: headers
    }
}

// authorized - PATCH https://api.github.com/gists/:gist_id
export function patchGist(id, headers, payload) {
    return {
        failOnStatusCode: false,
        method: 'PATCH',
        url: '/gists/' + id,
        headers: headers,
        body: payload
    }
}

// delete gist by id using providing authHeader
export function doDeleteGist(gistId, authHeader) {
    cy.request(
        deleteGist(gistId, authHeader)
    ).then((resp) => {
        expect(resp.status).to.eq(204)
    })
}

// This method asserts that Gist in the responseBody has same data as in the originalGist
// responseBody - response body returned from GET API
// originalGist - original gist object created via POST API
export function assertGist(responseBody, originalGist) {
    let actualFiles = Object.keys(responseBody.files)
    let expectedFiles = Object.keys(originalGist.files)
    assert.deepEqual(actualFiles, expectedFiles, "[List of files]");

    let actualContents = Object.values(responseBody.files).map(x => x.content)
    let expectedContents = Object.values(originalGist.files).map(x => x.content)
    assert.deepEqual(actualContents, expectedContents, "[List of contents]");
}
