
export function authHeader() {
    const token = localStorage.getItem("token");
    if (token) {
        return { Authorization: "Authorization", token: `Bearer ${token}` };
    } else {
        return {};
    }
}