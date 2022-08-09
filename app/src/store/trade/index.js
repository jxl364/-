import {reqAddressInfo,reqOrderInfo} from "@/api"
const actions = {
    async addressInfo({ commit }) {
        let result = await reqAddressInfo()
        if (result.code == 200) {
            commit('ADDRESSINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo()
        if (result.code == 200) {
            commit('GETORDERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
}
const mutations = {
    ADDRESSINFO(state,address) {
        state.address = address
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}
const state = {
    address: [],
    orderInfo:{}
}
const getters = {

}
export default {
    actions,
    mutations,
    state,
    getters
}