import jwt_decode from 'jwt-decode';

export function getCurrentJourneys(list) {
    /* 
    TODO: check journeys from the list that are happening
    */

    return list
}

export function getOwnersJourneys(list, username) {
    return list.filter(item => item.owner == username)
}

export const parseJwt = (token) => {
  try {
    return jwt_decode(token).sub;
  } catch (e) {
    return null;
  }
};