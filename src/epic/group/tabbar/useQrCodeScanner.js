// @flow

import vkConnect from "@vkontakte/vkui-connect-promise";
import { getQueryParams, navigate, setQueryParams } from "hookrouter";

export default function useQrCodeScanner() {
  return () => {
    const query = getQueryParams();

    vkConnect.send("VKWebAppOpenQR").then(res => {
        setQueryParams({
          ...query,
          ticket_id: res.data.qr_data
        });
        setTimeout(
          () => navigate("/menu/check-ticket", false, getQueryParams()),
          100
        );
      });
  };
}
