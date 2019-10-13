// @flow

import { useMemo }                                  from "react";
import vkConnect                                    from "@vkontakte/vkui-connect-promise";
import { getQueryParams, navigate, setQueryParams } from "hookrouter";
import useStartParams                               from "../../hooks/useStartParams";

export default function useQrCodeScanner() {
  const query = useStartParams();

  return useMemo(
    () => () => {
      vkConnect.send("VKWebAppOpenQR").then(res => {
        setQueryParams({
                         ...query,
                         ticket_id: res.data.qr_data
                       });
        setTimeout(
          () =>
            navigate("/menu/check-ticket", false, getQueryParams()),
          100
        );
      });
    },
    [query]
  );
}
