import { authHeader } from "./_helpers/authheader";
import jwt_decode from "jwt-decode";
import config from "../config/config";

const login = (creds) => {

    return fetch(`${config.apiUrl}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: creds.email, password: creds.password })
    })
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
                localStorage.setItem('token', response.token);
                return {
                    status: "Login Successful!",
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
                status: "Login Unsuccessful!",
                success: false
            }

        });
}

function logout() {
    var { Authorization, token } = authHeader();
    localStorage.removeItem('token');
    return fetch(`${config.apiUrl}/users/logout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    })
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
                    status: "Logout Successful!",
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
                status: "Logout Unsuccessful!",
                success: false
            }

        });
}

function userData() {
    const token = localStorage.getItem("token");
    if (token) {
        const data = jwt_decode(token);
        return { id: data._id, role: data.role };
    } else {
        return {};
    }
}

export const authenticationService = {
    login,
    logout,
    userData
};