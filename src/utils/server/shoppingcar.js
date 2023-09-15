import axios from "axios";
axios.defaults.baseURL = "http://43.138.105.175:5503";
// 查询用户购物车信息
export const QueryUserCar = (params) => {
    return axios({
        method: "get",
        url: "/shoppingcar",
        params
    })
}
// 更新用户购物车信息
export const UpdateUserCar = (id, data) => {
    return axios({
        method: "patch",
        url: "/shoppingcar/" + id,
        data
    })
}
export const AddUserCar = (data) => {
    return axios({
        method: "post",
        url: "/shoppingcar",
        data
    })
}
export const DeleteUserCar = (id) => {
    return axios({
        method: "delete",
        url: "/shoppingcar/" + id
    })
}