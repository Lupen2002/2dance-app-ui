// @flow
import connect from "@vkontakte/vkui-connect-promise";

type OpenCodeReaderRes = VKWebAppOpenCodeReaderResult | VKWebAppDefaultFailed;
type POpenCodeReaderRes = Promise<OpenCodeReaderRes>;

type GetUserInfoRes = VKWebAppGetUserInfoResult | VKWebAppDefaultFailed;
type PGetUserInfoRes = Promise<GetUserInfoRes>;

type GetAuthToken = VKWebAppAccessTokenReceived | VKWebAppDefaultFailed;
type PGetAuthToken = Promise<GetAuthToken>;

const vkApi = {
  init: async () => connect.send("VKWebAppInit", {}),
  toFavorites: async () => connect.send("VKWebAppAddToFavorites", {}),

  openCodeReader: async (): POpenCodeReaderRes =>
    connect.send("VKWebAppOpenCodeReader", {}),

  getUserInfo: async (): PGetUserInfoRes =>
    connect.send("VKWebAppGetUserInfo", {}),

  getAuthToken: async (id: number, ...scopes: ScopeType[]): PGetAuthToken => {
    const scope = scopes.join(",");
    const res = await connect.send("VKWebAppGetAuthToken", { app_id: id, scope });
    const scopeRes: ScopeType[] = res.data.scope.split(',');
    return {...res, data: {...res.data, scope: scopeRes}}
  }
};
