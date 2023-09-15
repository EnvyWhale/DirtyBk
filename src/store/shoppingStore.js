import { QueryUserCar, UpdateUserCar } from '@/utils/server/shoppingcar'

export default {
    namespaced: true,
    state: {
        UserCarList: [],
    },
    mutations: {
        // 渲染用户购物车信息
        InitUserCar_vm(state, list) {
            // console.log("get usercar over ,begin init vuex usercar");
            state.UserCarList = list.map(item => {
                item.checked = false
                return item
            })
        },
        ClearAll_Shop(state) {
            state.UserCarList = []
        },
        DeleteUserCar_vm(state, id) {
            state.UserCarList = state.UserCarList.filter(item => item.id != id)
        },
        UpdateCarNum_vm(state, { id, buynum }) {
            state.UserCarList.filter(item => {
                if (item.id == id) {
                    item.buynum = buynum
                }
            })
        }
    },
    actions: {
        async GetUserCarList_va({ rootState, commit }) {
            // console.log("getuercar");
            let res = await QueryUserCar({ userid: rootState.userinfo.userid })
            commit("InitUserCar_vm", res.data)
        },
        async UpdateUserCarList_va({ rootState, commit }) {
            let res = await UpdateUserCar({ userid: rootState.userinfo.userid })
            console.log(res);
            commit("UpdateCarNum_vm", res.data)
        }
    },
    getters: {
        // 
    }
}