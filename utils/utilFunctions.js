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

export const parseISOString = (s) => {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

export const isoFormatDMY = (d) => {  
  function pad(n) {return (n<10? '0' :  '') + n}
  return pad(d.getUTCDate()) + '/' + pad(d.getUTCMonth() + 1) + '/' + d.getUTCFullYear();
}

export const isoFormatHMS = (d) => {  
  function pad(n) {return (n<10? '0' :  '') + n}
  return pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes());
}