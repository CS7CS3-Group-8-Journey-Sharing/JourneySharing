import axios from "axios";

export function getHelloFromAPI() {
  axios
    .get("http://localhost:8080/api/journeysharing/journey/hi")
    .then((response) => {
      console.log(response);
      return response.data;
    });
}

export const createJourney = (journey) => {
  /*
  TODO: call backend and create a journey and return it once created
  */

  return journey;
};

export function getJourneysOfUser(user) {
  const journeys = [
    {
      title: "Find a Journey",
      owner: "Owner",
      people: "People",
      time: "Time",
      date: "Date",
      from: "From",
      to: "To",
      price: "Price",
      transport: "Transport",
      goTo: "Example",
      coords: {
        origin: {
          latitude: 53.347257,
          longitude: -6.2589555,
        },
        destination: {
          latitude: 53.3446581,
          longitude: -6.2563436,
        },
      },
    },
    {
      title: "Weekly Zoo Trip",
      owner: "Billy",
      people: "Joe, Bob",
      time: "14:00",
      date: "Every Sunday",
      from: "Bear St.",
      to: "Dublin Zoo",
      price: "2",
      transport: "Car",
      goTo: "Example",
      coords: {
        origin: {
          latitude: 53.347779,
          longitude: -6.2571537,
        },
        destination: {
          latitude: 53.3449032,
          longitude: -6.2573468,
        },
      },
    },
  ];

  return journeys;
}

export function getJourneysWithinRadius(radius) {
  /*
  TODO: find journey shows journeys in x radius
  */
  const journeys = [
    {
      title: "Find a Journey",
      owner: "Owner",
      people: "People",
      time: "Time",
      date: "Date",
      from: "From",
      to: "To",
      price: "Price",
      transport: "Transport",
      goTo: "Example",
      coords: {
        origin: {
          latitude: 53.347257,
          longitude: -6.2589555,
        },
        destination: {
          latitude: 53.3446581,
          longitude: -6.2563436,
        },
      },
    },
    {
      title: "Weekly Zoo Trip",
      owner: "Billy",
      people: "Joe, Bob",
      time: "14:00",
      date: "Every Sunday",
      from: "Bear St.",
      to: "Dublin Zoo",
      price: "2",
      transport: "Car",
      goTo: "Example",
      coords: {
        origin: {
          latitude: 53.347779,
          longitude: -6.2571537,
        },
        destination: {
          latitude: 53.3449032,
          longitude: -6.2573468,
        },
      },
    },
  ];

  return journeys;
}
