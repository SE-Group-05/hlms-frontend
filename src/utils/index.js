import { intersection } from 'lodash';
import jwt_decode from "jwt-decode";

export function isLoggedIn() {
	return !!localStorage.getItem('token');
}

export function getUserRole() {
	const token = localStorage.getItem("token");
    const data = jwt_decode(token);
	return data.role;
}

export function getUserId() {
	const token = localStorage.getItem("token");
    const data = jwt_decode(token);
	return data._id;
}

export function isArrayWithLength(arr) {
	return (Array.isArray(arr) && arr.length);
}

export function getAllowedRoutes(routes) {
	const token = localStorage.getItem("token");
    const data = jwt_decode(token);
	const role = [data.role];
	return routes.filter(({ permission }) => {
		if(!permission) return true;
		else if(!isArrayWithLength(permission)) return true;
		else return intersection(permission, role).length;
	});
}
