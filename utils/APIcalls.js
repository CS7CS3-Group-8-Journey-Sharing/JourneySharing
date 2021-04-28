import React from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { Platform } from "react-native";

const ipStem = () => {
  let stem = "";
  if(Platform.OS === 'ios') {
    stem = "http://localhost:8080/api/journeysharing/";
  } else {
    stem = "http://10.0.2.2:8080/api/journeysharing/";
  }
  return stem;
}

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

export const sendCreateJourney = (userToken, journey, setPopupText) => {

  console.log("Bearer "+userToken);
  console.log(ipStem()+"journey/createjourney");
  //return new Promise()
  //return axios
  return axios
    .post(
      // https?
      //TODO: localhost doesn't work on android, use 10.0.2.2 or proxy in emulator settings?
      ipStem()+"journey/createjourney",
      journey,
      {
        headers: { "Content-Type": "application/json", "Authorization": "Bearer "+userToken, },
      }
    );
    //.then(function (response) {
    //  console.log(response);
    //  //setPopupText("All Good!\n" +response.status);
    //  setPopupText("All Good\nJourney has been created!");
    //  //return "All good!";
    //})
    //.catch(function (error) {
    //  console.log(error);
    //  if(error.response){
    //    // The request was made and the server responded with a status code
    //    // that falls out of the range of 2xx
    //    setPopupText("Oh no :(\n" +error.response.status +"\n" +error.response.data);
    //  } else if (error.request) {
    //    // The request was made but no response was received
    //    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //    // http.ClientRequest in node.js
    //    setPopupText("Oh no :(\nRequest was made but no response was received.\n" +error.request);
    //  } else {
    //    // Something happened in setting up the request that triggered an Error
    //    setPopupText("Oh no, error with creating request. :(\n" +error.status);
    //  }
    //  //console.log(error.config);
    //  //console.log(error.toJSON());
    //});
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
