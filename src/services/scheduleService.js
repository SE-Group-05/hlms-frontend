import config from "../config/config";
import { authHeader } from './_helpers/authheader';
import { getUserId } from "../utils/";

/**
 * 
 * @param {*} data 
 * @returns {
 *   schedules: any;
 *   success: boolean;
 * } 
 * @returns {
 *  status: string;
 *  success: boolean;
 * }
 */
const getSchedules = (data) => {
    var myHeaders = new Headers();
    var { Authorization, token } = authHeader();
    myHeaders.append(Authorization, token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow'
    };

    return fetch(`${config.apiUrl}/schedules`, requestOptions)
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
                    schedules: response.schedules,
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
                status: "Error while getting schedules",
                success: false
            }

        });
}

const getMySchedules = () => {
    var user = getUserId();
    var myHeaders = new Headers();
    var { Authorization, token } = authHeader();
    myHeaders.append(Authorization, token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${config.apiUrl}/schedules/user/${user}`, requestOptions)
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
                    schedules: response.schedules,
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
                status: "Error while getting schedules",
                success: false
            }

        });
}

/**
 * 
 * @param {*} data data to send
 */
const addSchedule = async (data) => {

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

    fetch(`${config.apiUrl}/schedules`, requestOptions)
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
                    schedule: response.schedule,
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
                status: "Error while adding new schedule",
                success: false
            }

        });
}

const getDetailsForSchedule = (id) => {

    var myHeaders = new Headers();
    var { Authorization, token } = authHeader();
    myHeaders.append(Authorization, token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`${config.apiUrl}/schedules/${id}`, requestOptions)

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
                    schedule: response.schedule,
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
                status: "Error while getting schedule details",
                success: false
            }

        });
}

const updateDetailsForSchedule = (id, data) => {

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

    fetch(`${config.apiUrl}/schedules/${id}`, requestOptions)
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
                    schedule: response.schedule,
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
                status: "Error while updating schedule",
                success: false
            }

        });
}
const deleteASchedule = (id) => {

    var myHeaders = new Headers();
    var { Authorization, token } = authHeader();
    myHeaders.append(Authorization, token);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`${config.apiUrl}/schedules/${id}`, requestOptions)
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
                    schedule: response.schedule,
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
                status: "Error while deleting schedule",
                success: false
            }

        });
}
export const scheduleService = {
    getSchedules,
    getMySchedules,
    addSchedule,
    getDetailsForSchedule,
    updateDetailsForSchedule,
    deleteASchedule
};