// @flow

import vkConnect from "@vkontakte/vkui-connect-promise";
import { getQueryParams, navigate, setQueryParams } from "hookrouter";

export default function useQrCodeScanner() {
  return () => {
    const query = getQueryParams();

    query &&
      query.vk_viewer_group_role === "admin" &&
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
