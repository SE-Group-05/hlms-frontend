import config from "../config/config";
import { authHeader } from './_helpers/authheader';

/**
 * 
 * @param {*} data 
 * @returns {
 *   assistants: any;
 *   success: boolean;
 * } 
 * @returns {
 *  status: string;
 *  success: boolean;
 * }
 */
const getAssistants = () => {
    var myHeaders = new Headers();
    var { Authorization, token } = authHeader();
    myHeaders.append(Authorization, token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${config.apiUrl}/employees`, requestOptions)
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
                    assistants: response.employees,
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
                status: "Error while getting assistants",
                success: false
            }

        });
}

const searchAssistants = (searchKey) => {
    var myHeaders = new Headers();
    var { Authorization, token } = authHeader();
    myHeaders.append(Authorization, token);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({"similarTo":searchKey}),
        redirect: 'follow'
    };

    return fetch(`${config.apiUrl}/employees/search`, requestOptions)
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
                    assistants: response.employees,
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
                status: "Error while getting assistants",
                success: false
            }

        });
}

/**
 * 
 * @param {*} data data to send
 */
const addAssistant = async (data) => {

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

    fetch(`${config.apiUrl}/employees`, requestOptions)
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
                    assistant: response.assistant,
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
                status: "Error while adding new assistant",
                success: false
            }

        });
}

const getDetailsForAssistant = (id) => {

    var myHeaders = new Headers();
    var { Authorization, token } = authHeader();
    myHeaders.append(Authorization, token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`${config.apiUrl}/employees/${id}`, requestOptions)

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
                    assistant: response.assistant,
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
                status: "Error while getting assistant details",
                success: false
            }

        });
}

const updateDetailsForAssistant = (id, data) => {

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

    fetch(`${config.apiUrl}/employees/${id}`, requestOptions)
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
                    assistant: response.assistant,
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
                status: "Error while updating assistant",
                success: false
            }

        });
}
const deleteAAssistant = (id) => {

    var myHeaders = new Headers();
    var { Authorization, token } = authHeader();
    myHeaders.append(Authorization, token);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`${config.apiUrl}/employees/${id}`, requestOptions)
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
                    assistant: response.assistant,
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
                status: "Error while deleting assistant",
                success: false
            }

        });
}
export const assistantService = {
    getAssistants,
    searchAssistants,
    addAssistant,
    getDetailsForAssistant,
    updateDetailsForAssistant,
    deleteAAssistant
};