import { QueryUserAddress, UpdateUserAddress, DeleteUserAddress } from '@/utils/server/address'

export default {
    namespaced: true,
    state: {
        // 用户地址列表
        UserAddressList: [],
        InitUserCar_State: false,
        // 用户购买提交地址
        SelectAddress: {}
    },
    mutations: {
        // 渲染用户购物车信息
        InitUserAddress_vm(state, list) {
            state.UserAddressList = list.map((item) => {
                item.address =
                    item.province + item.city + item.county + item.addressDetail;
                return item;
            });
            if (state.UserAddressList.length) {
                // 没有默认地址选第一个
                if (state.UserAddressList.filter(item => item.isDefault).length == 0) {
                    state.SelectAddress= state.UserAddressList[0]
                }
                // 有默认地址用默认地址
                else {
                    state.SelectAddress= state.UserAddressList.filter(item => item.isDefault)[0]
                }
            }
            else {
                state.SelectAddress={}
            }
        },
        ClearAll_Address(state) {
            state.UserAddressList = []
            state.SelectAddress = []
        },
        DeleteUserAddress_vm(state, id) {
            state.UserAddressList = state.UserAddressList.filter(item => item.id != id)
        },
        SelectAddress(state, SelectAddress) {
            // console.log(SelectAddress);
            state.SelectAddress = SelectAddress
        },
        // 更新vuex中地址信息
        UpdateUserAddress_vm(state, address) {
            // 如果要修改后的地址为默认地址状态，则需要将其余数据isdefault改为false
            if (address.isDefault) {
                state.UserAddressList.forEach(item => {
                    item.isDefault = false
                });
            }
            // 找到要修改的地址，进行地址修改
            state.UserAddressList = state.UserAddressList.map(item => {
                if (item.id == address.id) {
                    address.address = address.province + address.city + address.county + address.addressDetail;
                    item=address
                }
                return item
            })
        },
        AddUserAddress_vm(state, address) {
            address.address = address.province + address.city + address.county + address.addressDetail;
            state.UserAddressList.push(address)
        }
    },
    actions: {
        async GetUserAddressList_va({ rootState, commit }) {
            let res = await QueryUserAddress({ userid: rootState.userinfo.userid })
            commit("InitUserAddress_vm", res.data)
        },
        async UpdateUserAddressList_va({ rootState, commit }) {
            let res = await UpdateUserAddress({ userid: rootState.userinfo.userid })
            commit("InitUserAddress_vm", res.data)
        },
        async DeleteUserAddress_va({ commit }, id) {
            await DeleteUserAddress(id)
            commit("DeleteUserAddress_vm", id)
        },
    },
    // store中的计算属性
    getters: {
        SelectAddress: (state) => {
            if (state.UserAddressList.length) {
                // 没有默认地址选第一个
                if (state.UserAddressList.filter(item => item.isDefault).length == 0) {
                    return state.UserAddressList[0]
                }
                // 有默认地址用默认地址
                else {
                    return state.UserAddressList.filter(item => item.isDefault)[0]
                }
            }
            else {
                return {}
            }
        }
    }
}