import myRequest from "@/service";

import { IAccount, ILoginResult } from "@/service/login/types";
import { IDataType } from "@/service/types";

enum LoginAPI {
  AccountLogin = '/login'
}

export function accountLoginRequest(account: IAccount): Promise<IDataType<ILoginResult>>  {
  return myRequest.post({
    url: LoginAPI.AccountLogin,
    data: account
  })
}