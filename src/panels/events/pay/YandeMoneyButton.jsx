// @flow

import React, { useMemo }     from "react";
import { getQueryParams }     from "hookrouter";
import { appURL }             from "../../../utils/default/url";
import { CellButton }         from "@vkontakte/vkui";
import useYMoneyReceiver      from "../../../hooks/useYMoneyReceiver";
import uuid                   from "uuid";
import usePrice               from "../../../hooks/usePrice";
import { postTickets }        from "../../../api";
import YandexMoneyTargetInput from "./YandexMoneyTargetInput";

type P = {
  event: DanceEvent,
  user: VKUser
};

export default function YandexMoneyButton(p: P) {
  const { vk_platform, pass } = getQueryParams(),
    [config] = useYMoneyReceiver();
  const id = useMemo(uuid, []),
    hash = useMemo(() => "r=ym-success&uuid=" + id, [id]),
    price = usePrice(p.event, pass);

  const defaultTicket = useMemo(() => {
    const { pass, vk_group_id, sec } = getQueryParams();
    return {
      ticketType: pass,
      vkGroupId: parseInt(vk_group_id),
      vkUserId: p.user.id,
      eventId: p.event._id,
      uuid: id,
      isClose: false,
      ymAccepted: false,
      secondUserId: pass === "double-pass" && sec ? parseInt(sec) : undefined
    };
  }, [p, id]);

  const ymPay = useMemo(() => {
    return async () => {
      const { pass, sec } = getQueryParams();
      await postTickets(defaultTicket);
      if (pass === "double-pass") {
        await postTickets({
          ...defaultTicket,
          vkUserId: parseInt(sec),
          secondUserId: p.user.id
        });
      }
    };
  }, [p, defaultTicket]);

  const formTarget = useMemo(
    () =>
      vk_platform === "desktop_web" || vk_platform === "mobile_web"
        ? "_blank"
        : "_top",
    [vk_platform]
  );

  return (
    <>
      <form
        method="POST"
        action="https://money.yandex.ru/quickpay/confirm.xml"
        target={formTarget}
      >
        <input type="hidden" name="receiver" value={config.yMoneyReceiver} />
        <input type="hidden" name="formcomment" value="Corazon" />
        <input type="hidden" name="short-dest" value="Corazon" />
        <input type="hidden" name="label" value={id} />
        <input type="hidden" name="quickpay-form" value="shop" />
        <input type="hidden" name="successURL" value={appURL(hash)} />
        <YandexMoneyTargetInput event={p.event} user={p.user} />
        <input type="hidden" name="sum" value={price} data-type="number" />
        <input type="hidden" name="comment" value="" />
        <input type="hidden" name="paymentType" value="AC" />
        <CellButton onClick={ymPay} type="submit">
          Картой или Яндекс.Деньги
        </CellButton>
      </form>
    </>
  );
}
