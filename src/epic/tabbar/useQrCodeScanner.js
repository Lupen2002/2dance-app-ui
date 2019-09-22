// @flow

import vkConnect from "@vkontakte/vkui-connect-promise";
import { getQueryParams, navigate } from "hookrouter";

export default function useQrCodeScanner() {
  const query = getQueryParams();

  return () => {
    vkConnect.send("VKWebAppOpenQR").then(res => {
      navigate("/main/ticket", true, { ...query, ticket_id: res.data.qr_data });
    });
  };
}
