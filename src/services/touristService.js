import config from "../config/config";
import { authHeader } from './_helpers/authheader';

/**
 * 
 * @param {*} data 
 * @returns {
 *   tourists: any;
 *   success: boolean;
 * } 
 * @returns {
 *  status: string;
 *  success: boolean;
 * }
 */
const getTourists = () => {
    var myHeaders = new Headers();
    var { Authorization, token } = authHeader();
    myHeaders.append(Authorization, token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${config.apiUrl}/tourists`, requestOptions)
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
                    tourists: response.tourists,
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
                status: "Error while getting tourists",
                success: false
            }

        });
}

const searchTourists = (searchKey) => {
    var myHeaders = new Headers();
    var { Authorization, token } = authHeader();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(Authorization, token);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({"similarTo":searchKey}),
        redirect: 'follow'
    };

    return fetch(`${config.apiUrl}/tourists`, requestOptions)
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
                    tourists: response.tourists,
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
                status: "Error while getting tourists",
                success: false
            }

        });
}

/**
 * 
 * @param {*} data data to send
 */
const addTourist = async (data) => {

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

    fetch(`${config.apiUrl}/tourists`, requestOptions)
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
            console.log(response)
            if (response.success) {
                return {
                    password: response.password,
                    tourist: response.tourist,
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
                status: "Error while adding new tourist",
                success: false
            }

        });
}

const getDetailsForTourist = (id) => {

    var myHeaders = new Headers();
    var { Authorization, token } = authHeader();
    myHeaders.append(Authorization, token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`${config.apiUrl}/tourists/${id}`, requestOptions)

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
                    tourist: response.tourist,
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
                status: "Error while getting tourist details",
                success: false
            }

        });
}

const updateDetailsForTourist = (id, data) => {

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

    fetch(`${config.apiUrl}/tourists/${id}`, requestOptions)
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
                    tourist: response.tourist,
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
                status: "Error while updating tourist",
                success: false
            }

        });
}
const deleteATourist = (id) => {

    var myHeaders = new Headers();
    var { Authorization, token } = authHeader();
    myHeaders.append(Authorization, token);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`${config.apiUrl}/tourists/${id}`, requestOptions)
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
                    tourist: response.tourist,
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
                status: "Error while deleting tourist",
                success: false
            }

        });
}
export const touristService = {
    getTourists,
    searchTourists,
    addTourist,
    getDetailsForTourist,
    updateDetailsForTourist,
    deleteATourist
};