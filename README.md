# Description

This project contains automated tests [GitHub Gists API](https://developer.github.com/v3/gists/) using tool [cypress.io](https://www.cypress.io).


## Scope

This demo has tests selection covering only next tests:
1. Testing gists accessibility in unauthorized / authorized context: 
test -  [1](https://github.com/TetianaMalva/gist-api-testing/blob/master/cypress/integration/1_accessibilty_gist_test.js)
2. Testing rate limiting in unauthorized / authorized context:
test -  [2](https://github.com/TetianaMalva/gist-api-testing/blob/master/cypress/integration/2_rate_limit_test.js)
3. Testing of most common REST API methods using simple CRUD operations:
tests - [3](https://github.com/TetianaMalva/gist-api-testing/blob/master/cypress/integration/3_create_gist_test.js), [4](https://github.com/TetianaMalva/gist-api-testing/blob/master/cypress/integration/4_read_gist_test.js), [5](https://github.com/TetianaMalva/gist-api-testing/blob/master/cypress/integration/5_update_gist_test.js), [6](https://github.com/TetianaMalva/gist-api-testing/blob/master/cypress/integration/6_delete_gist_test.js)

## Tools
- Language: JavaScript
- Test framework: [cypress.io](https://www.cypress.io/)
- IDE (recommended): [Visual Studio Code](https://code.visualstudio.com/download)

### Test framework selection reasoning

Cypress Pros:
1. Easy to start (very good documentation)
2. Familiar with this tool
3. Open source, big community
4. Quick test execution
5. Covers required functionality
6. Has many advanced features to cover more complicated tests in the future

## Installation and execution

### Install prerequisites

 1. Install git
 [https://git-scm.com/book/en/v2/Getting-Started-Installing-Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  2. Install docker
 [https://docs.docker.com/install/](https://docs.docker.com/install/)

### Run tests

1. Clone this git repository:
 ```bash
 mkdir ~/gitrepo
 cd ~/gitrepo
 git clone https://github.com/TetianaMalva/gist-api-testing.git
 ```

2. Run in docker:

```bash
cd ~/gitrepo/gist-api-testing/
docker run -it -v $PWD:/e2e -w /e2e -e CYPRESS_VIDEO cypress/included:3.2.0
```

### Test Runs report

Image: ![alt text](https://raw.githubusercontent.com/TetianaMalva/gist-api-testing/master/cypress/wiki/test_result.png)

Gif: ![alt text](https://raw.githubusercontent.com/TetianaMalva/gist-api-testing/master/cypress/wiki/test_result_cli.gif)

#### Execution with Test Runner (optional) [https://docs.cypress.io/guides/core-concepts/test-runner.html](https://docs.cypress.io/guides/core-concepts/test-runner.html)

Next example recorded with Test Runner for better visual presentation of tests execution:

![alt text](https://raw.githubusercontent.com/TetianaMalva/gist-api-testing/master/cypress/wiki/test_run_result.gif)
 