// @flow
import { useEffect, useState } from "react";
import vkConnect from "@vkontakte/vkui-connect-promise";
import useNavigate from "../../../hooks/useNavigate";

export default function useQrCodeScanner() {
  const [ready, setReady] = useState(false),
        [go, params, add, setParams] = useNavigate();

  useEffect(() => {
    const {ticket_id, ...q} = params;
    if (ticket_id && ready) {
      go("/menu/check-ticket");
      setReady(false)
    } else {
      setParams(q);
      setReady(true);
    }
  }, [params, go, ready, setParams]);

  return () => {
    vkConnect.send("VKWebAppOpenQR").then(res => {
      setParams({ ...params, ticket_id: res.data.qr_data });
    });
  };
}
