import { dummyFunction } from "../dummy";
import { createJourney } from "../utils/APIcalls";

test("adds 1 + 2 to equal 3", () => {
  expect(dummyFunction(1, 2)).toBe(3);
});

test("Create journey and retrieve it, ", () => {
  var journey = {
    latitude: 35,
    longitude: 35,
  };

  var journeyCreated = createJourney(journey);

  expect(journeyCreated).toBe(journey);
});
