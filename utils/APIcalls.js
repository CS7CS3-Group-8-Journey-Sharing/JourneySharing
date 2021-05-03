import React from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { Platform } from "react-native";

export const baseUrl = (Platform.OS === 'ios') ? "http://localhost:8080/api/journeysharing/" : "http://10.0.2.2:8080/api/journeysharing/";

export function getUserDetails(email, token) {
  let params = {
    email: email
  }

  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  }

  return new Promise((resolve, reject) => {
    axios.get(baseUrl + "user/details", {
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

export const sendCreateJourney = (userToken, journey) => {

  console.log("Bearer " + userToken);
  console.log(baseUrl + "journey/createjourney");
  //return new Promise()
  //return axios
  return axios
    .post(
      baseUrl + "journey/createjourney",
      journey,
      {
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + userToken, },
      }
    );
};

export function getJourneysOfUser(email, token) {

  //let params = {
  //  email: email
  //}

  //let headers = {
  //  'Content-Type': 'application/json',
  //  'Authorization': 'Bearer ' + token
  //}

  //return axios
  //  .post(
  //    baseUrl + "journey/getjourneys", {
  //      headers,
  //      params,
  //    }
  //  );
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
      goTo: ["ViewTrip", 0],
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
      goTo: ["ViewTrip", 1],
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

export function getJourneysWithinRadius(userLocation, radius, token) {
  let params = {
    lat: userLocation.latitude,
    lng: userLocation.longitude,
    radius: radius
  }

  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  }

  return new Promise((resolve, reject) => {
    axios.get(baseUrl + "journey/getjourneysradius", {
      headers: headers,
      params: params
    }).then((res) => {
      resolve(res.data);
    }).catch((error) => {
      reject(error);
    })
  });
}

export function getOwnersJourneys(userEmail, token) {
  let params = {
    userEmail: userEmail,
  }

  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  }

  return new Promise((resolve, reject) => {
    axios.get(baseUrl + "journey/getjourneys", {
      headers: headers,
      params: params
    }).then((res) => {
      resolve(res.data);
    }).catch((error) => {
      console.log(error)
      reject(error);
    })
  });
}


export function getParticipatingJourneys(userEmail, token) {
  let params = {
    userEmail: userEmail,
  }

  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  }

  return new Promise((resolve, reject) => {
    axios.get(baseUrl + "journey/gethistory", {
      headers: headers,
      params: params
    }).then((res) => {
      resolve(res.data);
    }).catch((error) => {
      console.log(error)
      reject(error);
    })
  });
}

export function getWomenJourneys(userEmail, token) {
  let params = {
    userEmail: userEmail,
  }
  
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  }
  
  axios.get(baseUrl + "journey/getjourneyswoman", {
      headers: headers,
      params: params
    }).then((res) => {
      resolve(res.data);
    }).catch((error) => {
      console.log(error)
      reject(error);
    })
}


export function startJourney(userEmail, journeyID, token) {
  let params = {
    userEmail: userEmail,
    journeyId: journeyID
  }

  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  }

  return new Promise((resolve, reject) => {
    axios.post(baseUrl + "journey/startjourney", null, {
      headers: headers,
      params: params
    }).then((res) => {
      resolve(res.data);
    }).catch((error) => {
      console.log(error)
      reject(error);
    })
  });
}

export function endJourney(userEmail, journeyID, token) {
  let params = {
    userEmail: userEmail,
    journeyId: journeyID
  }

  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  }

  return new Promise((resolve, reject) => {
    axios.post(baseUrl + "journey/endjourney", null, {
      headers: headers,
      params: params
    }).then((res) => {
      resolve(res.data);
    }).catch((error) => {
      console.log(error)
      reject(error);
    })
  });
}