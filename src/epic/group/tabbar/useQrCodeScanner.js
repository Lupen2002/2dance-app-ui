// @flow

import vkConnect from "@vkontakte/vkui-connect-promise";
import { go } from "../../../utils/default/url";

export default function useQrCodeScanner() {
  return () => {
    vkConnect.send("VKWebAppOpenQR").then(res => {
      setTimeout(
        () => go("/menu/check-ticket", { ticket_id: res.data.qr_data }),
        100
      );
    });
  };
}
