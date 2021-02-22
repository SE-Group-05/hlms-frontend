import config from "../config/config";
import { authHeader } from './_helpers/authheader';

const getDashboard = (data) => {
    var myHeaders = new Headers();
    var { Authorization, token } = authHeader();
    myHeaders.append(Authorization, token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${config.apiUrl}/dashboard/admin`, requestOptions)
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
                    dashboardValues: response.dashboardValues,
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
                status: "Error while getting data",
                success: false
            }

        });
}

export const dashboardService = {
    getDashboard
};