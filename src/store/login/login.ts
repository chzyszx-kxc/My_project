import type { Module } from 'vuex';
import { ILoginState } from "@/store/login/types";
import { IRootState } from "@/store/types";
import { IAccount, ILoginResult } from "@/service/login/types";
import { accountLoginRequest, requestUserInfoById, requestUserMenusByRoleId } from "@/service/login/login";
import { IDataType } from "@/service/types";
import LocalCache from "@/utils/cache";

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state(): ILoginState {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state: ILoginState, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount){
      // 1.实现登陆逻辑
      const loginResult: IDataType<ILoginResult> = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      LocalCache.setCache('token', token)

      // 2.请求用户菜单
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      LocalCache.setCache('userInfo', userInfo)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userInfo)
      LocalCache.setCache('userMenus', userMenus)
    }
  }
}

export default loginModule