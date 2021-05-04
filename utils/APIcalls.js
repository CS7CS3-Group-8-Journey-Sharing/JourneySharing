import React from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { Platform } from "react-native";

export const baseUrl =
  "https://journeysharing.herokuapp.com/api/journeysharing/";

export function getUserDetails(email, token) {
  let params = {
    email: email,
  };

  let headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "user/details", {
        headers: headers,
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
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
  return axios.post(baseUrl + "journey/createjourney", journey, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userToken,
    },
  });
};

export function addRatings(ratings, token) {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  return new Promise((resolve, reject) => {
    axios
      .post(baseUrl + "user/addrating", ratings, {
        headers: headers,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

export function getJourneysWithinRadius(userLocation, radius, token) {
  let params = {
    lat: userLocation.latitude,
    lng: userLocation.longitude,
    radius: radius,
  };

  let headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "journey/getjourneysradius", {
        headers: headers,
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getOwnersJourneys(userEmail, token) {
  let params = {
    userEmail: userEmail,
  };

  let headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "journey/getjourneys", {
        headers: headers,
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

export function getParticipatingJourneys(userEmail, token) {
  let params = {
    userEmail: userEmail,
  };

  let headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "journey/gethistory", {
        headers: headers,
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

export function getWomenJourneys(userEmail, token) {
  let params = {
    userEmail: userEmail,
  };

  let headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  axios
    .get(baseUrl + "journey/getjourneyswoman", {
      headers: headers,
      params: params,
    })
    .then((res) => {
      resolve(res.data);
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    });
}

export function startJourney(userEmail, journeyID, token) {
  let params = {
    userEmail: userEmail,
    journeyId: journeyID,
  };

  let headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  return new Promise((resolve, reject) => {
    axios
      .post(baseUrl + "journey/startjourney", null, {
        headers: headers,
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

export function endJourney(userEmail, journeyID, token) {
  let params = {
    userEmail: userEmail,
    journeyId: journeyID,
  };

  let headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  return new Promise((resolve, reject) => {
    axios
      .post(baseUrl + "journey/endjourney", null, {
        headers: headers,
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

export function getJourney(journeyID, token) {
  let params = {
    journeyId: journeyID,
  };

  let headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "journey/getjourney", {
        headers: headers,
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

export function deleteJourney(journeyID, token) {
  let params = {
    journeyId: journeyID,
  };

  let headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  return new Promise((resolve, reject) => {
    axios
      .post(baseUrl + "journey/deletejourney", null, {
        headers: headers,
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

export function createRequest(userEmail, journeyID, userToken) {
  let params = {
    userEmail: userEmail,
    journeyId: journeyID,
  };

  console.log(userToken);

  let headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + userToken,
  };

  return new Promise((resolve, reject) => {
    axios
      .post(baseUrl + "request/createRequest", null, {
        headers: headers,
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

export function getRequests(userEmail, token) {
  let params = {
    userEmail: userEmail,
  };

  let headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "request/getRequests", {
        headers: headers,
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.log(+error);
        reject(error);
      });
  });
}

export function getYourRequests(userEmail, token) {
  let params = {
    userEmail: userEmail,
  };

  let headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "request/getyourrequests", {
        headers: headers,
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.log(+error);
        reject(error);
      });
  });
}

export function joinJourney(requestId, token) {
  let params = {
    requestId: requestId,
  };

  let headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  return new Promise((resolve, reject) => {
    axios
      .put(baseUrl + "journey/joinjourney", null, {
        headers: headers,
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.log(+error);
        reject(error);
      });
  });
}

export function updateToSeen(requestIds, token) {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  return new Promise((resolve, reject) => {
    axios
      .post(baseUrl + "request/updatetoseen", requestIds, {
        headers: headers,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.log(+error);
        reject(error);
      });
  });
}
