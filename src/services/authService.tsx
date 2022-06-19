import axios from "axios";
const API_URL = process.env.REACT_APP_LOCAL_API_URL;

class AuthService {
    
  login(username: string, password: string) {
    return axios
      .post(`${API_URL}/auth/token/login/`, {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.auth_token) {
          localStorage.setItem(
            "auth_token",
            response.data.auth_token
          );
        }
        return response.data;
      });
  }

  logout() {
    if (localStorage.getItem("auth_token")) {
      return axios
        .post(
          `${API_URL}/auth/token/logout/`,
          {},
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("auth_token")}`,
            },
          }
        )
        .then((response) => {
          localStorage.removeItem("auth_token");
          return response.data;
        });
    } else {
      return Promise.reject("User not logged in");
    }
  }

  register(username: string, password: string, email: string) {
    return axios
      .post(`${API_URL}/auth/users/`, {
        username: username,
        password: password,
        re_password: password,
        email: email,
      })
      .then((response) => {
        if (response.status === 201) {
          return response.data;
        }
        return Promise.reject(response.data);
      });
  }

  getCurrentUser() {
    if (localStorage.getItem("auth_token")) {
      return axios
        .get(`${API_URL}/auth/users/me/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
          },
        })
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          return response.data;
        });
    } else {
      return Promise.reject("User not logged in");
    }
  }

  decodeUserDetails() {
    const usrStr = localStorage.getItem("user");
    if (usrStr) {
      return JSON.parse(usrStr);
    }
    return null;
  }
}

export default new AuthService();
