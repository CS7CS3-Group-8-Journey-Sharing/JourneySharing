import { getHelloFromAPI, sendCreateJourney } from "../utils/APIcalls";

// getHelloFromAPI tests
test("Assert getHelloFromAPI exists", () => {
  expect(getHelloFromAPI).toBeDefined();
});

// CreateJourney tests
test("Assert CreateJourney exists", () => {
  expect(sendCreateJourney).toBeDefined();
});
// Passes but shouldn't
// https://www.pluralsight.com/guides/test-asynchronous-code-jest
test("Assert CreateJourney creates a journey and retrieves it", () => {

  var journey = {
    name: "Test Journey",
    maxParticipants: 10,
    modeOfTransport: "WALK",

    ownerId: "6065e0e6fdb39f04922f3d53",
    participantIds: [],

    recurring: false,
    recurringDays: [false, false, false, false, false, false, false],
    startTime: "3000-02-30T20:42:49.978Z",
    //startTime: null,
    endTime: null,

    startLocation: {
      lat: "53.00",
      lng: "-6.0",
      name: null
    },
    endLocation: {
      lat: "53.00",
      lng: "-6.0",
      name: null
    },
  };

  var userToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZWNAZ21haWwuY29tIiwiZXhwIjoxNjE5NjQ1ODE2LCJpYXQiOjE2MTk2Mjc4MTZ9.GsbCWQJhndxmtCS_c0ZHS5GvVwcI5QFy4vcdxGxikJApCFVFqfW8UXDh1GspfPAeRCGmFF486szoelVabi8L6w";

  //let response = sendCreateJourney(userToken, journey, setPopupText);
  sendCreateJourney(userToken, journey)
    .then(function (response) {
      console.log(response.data);
      // need to response will be NewJourneyVO
      expect(journeyCreated).toBe(response);
    })
    .catch(function (error) {
      console.log(error);
      console.log(error.message);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
      } else {
        // Something happened in setting up the request that triggered an Error
      }
      //console.log(error.config);
      //console.log(error.toJSON());
    });

  //var journeyCreated = sendCreateJourney(userToken, journey);

});

test("Assert find journey shows journeys in x radius", () => {
  var radius = 500;

  // TODO: retrieve journeys within x radius from the backend
  var journeys = getJourneysWithinRadius(500);

  // check
  expect(journeys).toBeDefined();
});
