import assert from "node:assert";

describe("Dummy test", function () {
  it("should pass", function () {
    let someNumber: number = 42;

    assert(someNumber === 42, "Some number is not 42");
  });
});
