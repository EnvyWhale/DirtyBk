import axios from "axios";
axios.defaults.baseURL = "http://43.138.105.175:5503";
// 查询用户购物车信息
export const QueryUserAddress = (params) => {
    return axios({
        method: "get",
        url: "/address",
        params
    })
}
// 更新用户购物车信息
export const UpdateUserAddress = (id, data) => {
    return axios({
        method: "patch",
        url: "/address/" + id,
        data
    })
}
export const AddUserAddress = (data) => {
    return axios({
        method: "post",
        url: "/address",
        data
    })
}
export const DeleteUserAddress = (id) => {
    return axios({
        method: "delete",
        url: "/address/" + id
    })
}