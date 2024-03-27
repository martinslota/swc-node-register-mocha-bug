# `@swc-node/register` + Mocha bug example

A minimal-ish example demonstrating a bug around
[@swc-node/register](https://github.com/swc-project/swc-node/tree/master/packages/register)
when used with Mocha.

## Usage

When Mocha is used to run test files written in Typescript along with
`--import=@swc-node/register/esm-register`, the following kind of error gets
thrown:

```
Exception during run: TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts" for /path/to/swc-node-register-mocha-bug/test.spec.ts
    at Object.getFileProtocolModuleFormat [as file:] (node:internal/modules/esm/get_format:160:9)
    at defaultGetFormat (node:internal/modules/esm/get_format:203:36)
    at defaultLoad (node:internal/modules/esm/load:143:22)
    at async nextLoad (node:internal/modules/esm/hooks:865:22)
    at async nextLoad (node:internal/modules/esm/hooks:865:22)
    at async Hooks.load (node:internal/modules/esm/hooks:448:20)
    at async MessagePort.handleMessage (node:internal/modules/esm/worker:196:18) {
  code: 'ERR_UNKNOWN_FILE_EXTENSION'
```

To observe the bug in action, perform the following steps:

1. Make a clone of this repository.
1. Remove `patches/@swc-node+register+1.9.0.patch`.
1. Run `npm ci`.
1. Run `npm test`.

The output should look roughly like this:

```
$ npm test

> swc-node-register-mocha-bug@1.0.0 test
> node --import @swc-node/register/esm-register node_modules/mocha/bin/mocha test.spec.ts


 Exception during run: TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts" for /path/to/swc-node-register-mocha-bug/test.spec.ts
    at Object.getFileProtocolModuleFormat [as file:] (node:internal/modules/esm/get_format:160:9)
    at defaultGetFormat (node:internal/modules/esm/get_format:203:36)
    at defaultLoad (node:internal/modules/esm/load:143:22)
    at async nextLoad (node:internal/modules/esm/hooks:865:22)
    at async nextLoad (node:internal/modules/esm/hooks:865:22)
    at async Hooks.load (node:internal/modules/esm/hooks:448:20)
    at async MessagePort.handleMessage (node:internal/modules/esm/worker:196:18) {
  code: 'ERR_UNKNOWN_FILE_EXTENSION'
}
```

The removed patch contains a hacky way to resolve the issue. To see it in
action, perform the following steps:

1. `git checkout patches/@swc-node+register+1.9.0.patch`.
1. Run `npm ci`.
1. Run `npm test`.

The output should then look as follows:

```
$ npm test

> swc-node-register-mocha-bug@1.0.0 test
> node --import @swc-node/register/esm-register node_modules/mocha/bin/mocha test.spec.ts



  Dummy test
    ✔ should pass


  1 passing (1ms)
```
