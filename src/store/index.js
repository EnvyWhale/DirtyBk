import { GetGardList } from '@/utils/server'
import Vue from 'vue'
import Vuex from 'vuex'
import ShoppingCarStore from './shoppingStore'
import AddressStore from './addressStore'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 底部导航栏状态
    NavBarState: true,
    // 分类列表
    gardList: [],
    // 用户登陆状态
    isLogin: false,
    // 用户信息·
    userinfo: {
    },
    // 订单列表
    payList: [],
    // 分类锚点
    tag: 0,
  },
  getters: {
  },
  methods: {
  },
  mutations: {
    // 清空用户登陆信息
    ClearAll(state) {
      state.isLogin = false
      state.userinfo = {}
    },
    // 改变底部导航栏显示状态
    ChangeNavBarState(state, f) {
      state.NavBarState = f
    },
    // 渲染分类标签信息
    InitGardList_vm(state, list) {
      state.gardList = list
    },

    // 获取本地用户信息，判断是否登陆
    GetUserInfo_vm(state) {
      let userinfo = sessionStorage.getItem('userinfo')
      state.userinfo = JSON.parse(userinfo)
      state.isLogin = true
      // console.log(userinfo);
    },
    // 改变分类标记索引
    ChangeTag(state, i) {
      state.tag = i - 1
    },
    // 改變訂單縮影
    ChangepayList(state, list) {
      state.payList = list
    }

  },
  actions: {
    async GetGardList_va({ commit }) {
      let res = await GetGardList();
      // console.log(res);
      commit("InitGardList_vm", res.data)
    },


  },
  plugins: [
    //默认是本地存储
    //createPersistedState()
    //设置会话存储
    createPersistedState(
      {
        storage: sessionStorage
      }
    )]
  , //添加插件
  modules: {
    ShoppingCarStore,
    AddressStore
  }
})
