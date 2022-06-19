

export default function authHeader() {
    const auth_token = localStorage.getItem("auth_token");
    if (auth_token) {
        return { Authorization: `Token ${auth_token}` };
    }else{
        return {};
    }
}