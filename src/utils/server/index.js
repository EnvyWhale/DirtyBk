import axios from "axios";
axios.defaults.baseURL = "http://43.138.105.175:5503";
// 获取书库menu列表信息
export const GetGardList = () => {
    return axios({
        method: "get",
        url: "/gridlist"
    })
}
// 图书信息，根据params查找
export const GetBookList = (params) => {
    return axios({
        method: "get",
        url: "/booklist",
        params
    })
}
// 图书详细信息
export const GetDetail = (id) => {
    return axios({
        method: "get",
        url: "/bookdetaillist/" + id,
    })
}
// 图书版本选择信息
export const GetDetailSku = (params) => {
    return axios({
        method: "get",
        url: "/bookskulist",
        params
    })
}
// 获取用户信息，根据用户名找
export const GetUserMsg = (params) => {
    return axios({
        method: "get",
        url: "/userlist",
        params
    })
}
// 创建用户名
export const GreateUser = (data) => {
    return axios({
        method: "post",
        url: "/userlist",
        data
    })
}
