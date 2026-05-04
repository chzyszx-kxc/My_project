import myRequest from "@/service";

import { IAccount, ILoginResult } from "@/service/login/types";
import { IDataType } from "@/service/types";

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

export function accountLoginRequest(account: IAccount): Promise<IDataType<ILoginResult>>  {
  return myRequest.post({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number): Promise<IDataType> {
  return myRequest.get({
    url: LoginAPI.LoginUserInfo + id,
  })
}

export function requestUserMenusByRoleId(id: number): Promise<IDataType> {
  return myRequest.get({
    url: LoginAPI.UserMenus + id + '/menu',
  })
}