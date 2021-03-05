import { createJourney } from "../utils/APIcalls";

test("Assert CreateJourney exists", () => {
  expect(createJourney).toBeDefined();
});

test("Assert CreateJourney creates a journey and retrieves it", () => {
  var journey = {
    latitude: 35,
    longitude: 35,
  };

  var journeyCreated = createJourney(journey);

  expect(journeyCreated).toBe(journey);
});