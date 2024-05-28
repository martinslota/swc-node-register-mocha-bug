# `@swc-node/register` + Mocha bug example

A minimal-ish example demonstrating a bug around
[@swc-node/register](https://github.com/swc-project/swc-node/tree/master/packages/register)
when used with Mocha.

## Usage

When Mocha is used to run test files written in Typescript along with
`--import=@swc-node/register/esm-register`, the following kind of error gets
thrown:

```
file:///path/to/swc-node-register-mocha-bug/node_modules/mocha/bin/mocha.js:9
 */ const { loadOptions } = require('../lib/cli/options');
                            ^

ReferenceError: require is not defined in ES module scope, you can use import instead
    at file:///path/to/swc-node-register-mocha-bug/node_modules/mocha/bin/mocha.js:9:29
    at ModuleJob.run (node:internal/modules/esm/module_job:218:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:329:24)
    at async loadESM (node:internal/process/esm_loader:28:7)
    at async handleMainPromise (node:internal/modules/run_main:113:12)

Node.js v20.11.0
```

To observe the bug in action, perform the following steps:

1. Make a clone of this repository.
1. Run `npm ci`.
1. Run `npm test`.

The output should look roughly like this:

```
$ npm test

> swc-node-register-mocha-bug@2.0.0 test
> node --import @swc-node/register/esm-register node_modules/mocha/bin/mocha test.spec.ts

file:///path/to/swc-node-register-mocha-bug/node_modules/mocha/bin/mocha.js:9
 */ const { loadOptions } = require('../lib/cli/options');
                            ^

ReferenceError: require is not defined in ES module scope, you can use import instead
    at file:///path/to/swc-node-register-mocha-bug/node_modules/mocha/bin/mocha.js:9:29
    at ModuleJob.run (node:internal/modules/esm/module_job:218:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:329:24)
    at async loadESM (node:internal/process/esm_loader:28:7)
    at async handleMainPromise (node:internal/modules/run_main:113:12)

Node.js v20.11.0
```

The issue disappears if the code gets transpiled using `swc` instead:

```
$ npm run test-transpiled

> swc-node-register-mocha-bug@2.0.0 pretest-transpiled
> npm run build


> swc-node-register-mocha-bug@2.0.0 build
> swc -d ./dist --delete-dir-on-start --ignore ./node_modules,./dist .

Successfully compiled: 1 file with swc (42.81ms)

> swc-node-register-mocha-bug@2.0.0 test-transpiled
> mocha dist/test.spec.js



  Dummy test
    ✔ should pass


  1 passing (1ms)
```
