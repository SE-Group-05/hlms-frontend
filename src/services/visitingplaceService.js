import config from "../config/config";
import { authHeader } from './_helpers/authheader';

/**
 * 
 * @param {*} data 
 * @returns {
 *   visitingPlaces: any;
 *   success: boolean;
 * } 
 * @returns {
 *  status: string;
 *  success: boolean;
 * }
 */
const getVisitingPlaces = () => {
    var myHeaders = new Headers();
    var { Authorization, token } = authHeader();
    myHeaders.append(Authorization, token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${config.apiUrl}/places`, requestOptions)
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                return {
                    visitingPlaces: response.visitingPlaces,
                    success: true
                }
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                console.log(error);
                throw error;
            }
        })
        .catch(error => {
            return {
                status: "Error while getting places",
                success: false
            }

        });
}

const getVisitingPlacesByName = (data) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var { Authorization, token } = authHeader();
    myHeaders.append(Authorization, token);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow'
    };

    return fetch(`${config.apiUrl}/places/search`, requestOptions)
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                return {
                    visitingPlaces: response.visitingPlaces,
                    success: true
                }
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                console.log(error);
                throw error;
            }
        })
        .catch(error => {
            return {
                status: "Error while getting places",
                success: false
            }

        });
}

/**
 * 
 * @param {*} data data to send
 */
const addVisitingPlace = async (data) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var { Authorization, token } = authHeader();
    myHeaders.append(Authorization, token);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow'
    };

    fetch(`${config.apiUrl}/places`, requestOptions)
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                return {
                    visitingPlace: response.visitingPlace,
                    success: true
                }
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => {
            return {
                status: "Error while adding new place",
                success: false
            }

        });
}

const getDetailsForVisitingPlace = (id) => {

    var myHeaders = new Headers();
    var { Authorization, token } = authHeader();
    myHeaders.append(Authorization, token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`${config.apiUrl}/places/${id}`, requestOptions)

        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                return {
                    visitingPlace: response.visitingPlace,
                    success: true
                }
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => {
            return {
                status: "Error while getting place details",
                success: false
            }

        });
}

const updateDetailsForVisitingPlace = (id, data) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var { Authorization, token } = authHeader();
    myHeaders.append(Authorization, token);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow'
    };

    fetch(`${config.apiUrl}/places/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                return {
                    visitingPlace: response.visitingPlace,
                    success: true
                }
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => {
            return {
                status: "Error while updating place",
                success: false
            }

        });
}
const deleteAVisitingPlace = (id) => {

    var myHeaders = new Headers();
    var { Authorization, token } = authHeader();
    myHeaders.append(Authorization, token);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`${config.apiUrl}/places/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                return {
                    visitingPlace: response.visitingPlace,
                    success: true
                }
            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => {
            return {
                status: "Error while deleting place",
                success: false
            }

        });
}
export const visitingPlaceService = {
    getVisitingPlaces,
    getVisitingPlacesByName,
    addVisitingPlace,
    getDetailsForVisitingPlace,
    updateDetailsForVisitingPlace,
    deleteAVisitingPlace
};