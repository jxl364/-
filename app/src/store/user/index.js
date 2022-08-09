import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from "@/api"
const actions = {
    async getCode({ commit },phone) {
        let result = await reqGetCode(phone)
        console.log(result);
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
            localStorage.setItem('TOKEN',result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async userInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit('USERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async logOut({ commit }) {
        let result = await reqLogout()
        if (result.code == 200) {
            commit('LOGOUT')
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    USERINFO(state,userInfo) {
        state.userInfo = userInfo
    },
    LOGOUT(state) {
        state.token = ''
        state.userInfo = {}
        localStorage.removeItem('TOKEN')
    }
}
const state = {
    code: '',
    token: localStorage.getItem('TOKEN'),
    userInfo:{}
}
const getters = {

}
export default {
    actions,
    mutations,
    state,
    getters
}