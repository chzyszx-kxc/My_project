import type { Module } from 'vuex';
import { ILoginState } from "@/store/login/types";
import { IRootState } from "@/store/types";
import { IAccount, ILoginResult } from "@/service/login/types";
import { accountLoginRequest } from "@/service/login/login";
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
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount){
      // 1.实现登陆逻辑
      const loginResult: IDataType<ILoginResult> = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      LocalCache.setCache('token', token)

    }
  }
}

export default loginModule