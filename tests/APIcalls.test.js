import { getHelloFromAPI, createJourney } from "../utils/APIcalls";

// getHelloFromAPI tests
test("Assert getHelloFromAPI exists", () => {
  expect(getHelloFromAPI).toBeDefined();
});

// CreateJourney tests
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

test("Assert find journey shows journeys in x radius", () => {
  var radius = 500;

  // TODO: retrieve journeys within x radius from the backend
  var journeys = getJourneysWithinRadius(500);

  // check
  expect(journeys).toBeDefined();
});
