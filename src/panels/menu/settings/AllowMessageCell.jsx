// @flow

import React from "react";
import { getQueryParams } from "hookrouter";
import useUserToken from "../../../hooks/useUserToken";
import useUserById from "../../../hooks/useUserById";
import useAllowSendMessages from "../../../hooks/useAllowSendMessages";
import useCheckRole from "../../../hooks/useCheckRole";
import { Cell } from "@vkontakte/vkui";

type P = {};

const roles = ["admin", "reception"];

export default function AllowMessageCell(p: P) {
  const isAccess = useCheckRole(roles);
  const params = getQueryParams();
  const token = useUserToken(true),
    [user, refresh] = useUserById(parseInt(params.vk_user_id), token),
    [requestAllow] = useAllowSendMessages(token);

  const onRequestAllow = async () => {
    await requestAllow();
    await refresh();
  };

  return (
    <>
      {isAccess && (
        <Cell
          onClick={onRequestAllow}
          indicator={
            user && user.allowMessages && <i className="fas fa-check" />
          }
        >
          Включить уведомления
        </Cell>
      )}
    </>
  );
}
