export function getCurrentJourneys(list) {
    /* 
    TODO: check journeys from the list that are happening
    */

    return list
}

export function getOwnersJourneys(list, username) {
    return list.filter(item => item.owner == username)
}