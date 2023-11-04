import { effect, signal } from "@preact/signals-react";
import { http } from "../utils/http";

const authTokenKey = 'authToken';
const refreshTokenKey = 'refreshToken';
let instance  = null;

const authSignal = signal({
    authToken: localStorage.getItem(authTokenKey) || null,
    refreshToken: localStorage.getItem(refreshTokenKey) || null,
    user: null
});

class UserAuth {
    constructor() {
        if (instance) {
            throw new Error('UserAuth instance is already exist');
        }
        console.log("UserAuth is created")
        effect(() => {
            if (authSignal.value.authToken && authSignal.value.refreshToken) {
                localStorage.setItem(authTokenKey, authSignal.value.authToken)
                localStorage.setItem(refreshTokenKey, authSignal.value.refreshToken)
            } else {
                localStorage.removeItem(authTokenKey)
                localStorage.removeItem(refreshTokenKey)
            }
            console.log("UserAuth", authSignal.value)
        });
        instance = this;
    }

    static getInstance() {
        if (instance) return instance;
        instance = new UserAuth();
        return instance
    }

    async signInApi(email, password) {
        return http.post('/user/auth/sign-in', { email, password }).then((response) => {
            const data = response.data;
            authSignal.value = {
                authToken: data.token.authToken,
                refreshToken: data.token.refreshToken,
                user: data.user
            }
        })
    }

    async signUpApi(data){
        return http.post('/user/auth/sign-up', data).then((response) => {
            const data = response.data;
            authSignal.value = {
                authToken: data.token.authToken,
                refreshToken: data.token.refreshToken,
                user: data.user
            }
        })
    }

    async authUserApi(){
        return http.get('/user/auth/profile',).then((response) => {
            const data = response.data;
            authSignal.value = {
                ...authSignal.value,
                user: data.user
            }
        }) 
    }

    getAuthToken() {
        return authSignal.value.authToken
    }

    getRefreshToken() {
        return authSignal.value.refreshToken
    }

    user() {
        return authSignal.value.user
    }


    logoutApi() {
        authSignal.value = {
            user: null,
            authToken: null,
            refreshToken: null
        }
    }

    isLogin() {
        return !!authSignal.value.authToken
    }

}

const authInstance = new UserAuth();

Object.freeze(authInstance);

export default authInstance;