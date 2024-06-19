import { base, expectedResult, incr, increment } from "./solution";

test("Increment of (base, incr) should be equal to expected", () => {
  expect(increment(base, incr)).toStrictEqual(expectedResult);
});
