import axios from "axios";
import AuthContext from "../context/AuthContext";

//const { userToken } = React.useContext(AuthContext);

const baseUrl = "http://localhost:8080/api/journeysharing/";

export function getUserDetails(email, token) {
  let params = {
    email: email
  }

  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token 
  }

  return new Promise((resolve, reject) => {
    axios.get(baseUrl+"user/details", {
      headers: headers,
      params: params
    }).then((res) => {
      resolve(res.data);
    }).catch((error) => {
      reject(error);
    })
  });
}

export function getHelloFromAPI() {
  axios
    .get("http://localhost:8080/api/journeysharing/journey/hi")
    .then((response) => {
      console.log(response);
      return response.data;
    });
}

export const sendCreateJourney = (journey) => {
  /*
  TODO: call backend and create a journey and return it once created
  */

  let message = "";
  axios
    .post(
      // https?
      //TODO: localhost doesn't work on android, use 10.0.2.2 or proxy in emulator settings?
      "http://10.0.2.2:8080/api/journeysharing/journey/createjourney",
      journey,
      //{
      //  headers: {"what", A},
      //}
    )
    .then(function (response) {
      console.log(response);
      message = "All good!";
      //return "All good!";
    })
    .catch(function (error) {
      console.log(error);
      message = "Oh no";
      //return "Oh no";
    });

  return message;
};

export function getJourneysOfUser(user) {
  const journeys = [
    {
      title: "One of Bob's Journeys",
      owner: "Bob",
      people: "Joe",
      time: "Time",
      date: "Date",
      from: "From",
      to: "To",
      price: "Price",
      transport: "Transport",
      goTo: ["ViewTrip",0],
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
      owner: "Joe",
      people: "Bob",
      time: "14:00",
      date: "Every Sunday",
      from: "Bear St.",
      to: "Dublin Zoo",
      price: "2",
      transport: "Car",
      goTo: ["ViewTrip",1],
      number: "1",
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
      goTo: ["Example",0],
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
      goTo: ["Example",1],
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
export function getJourneysDetails(number) {
  if (number == 0) {
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
        goTo: ["ViewTrip",0],
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
    ];

    return journeys;
  } else {
    const journeys = [
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
        goTo: ["ViewTrip",1],
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
}
