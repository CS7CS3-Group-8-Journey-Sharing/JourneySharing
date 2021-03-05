import axios from "axios";

export function getHelloFromAPI() {
  axios
    .get("http://localhost:8080/api/journeysharing/journey/hi")
    .then((response) => {
      return response.data;
    });
}

export const createJourney = (journey) => {
  /*
  TODO: call backend and create a journey and return it once created
  */

  return journey;
};
