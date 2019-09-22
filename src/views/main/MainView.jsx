// @flow

import React                        from "react";
import { View }                     from "@vkontakte/vkui";
import MainMainPanel                from "../../panels/main/main/MainMainPanel";
import MainTicketPanel              from "../../panels/main/ticket/MainTicketPanel";
import { extractMainViewId }        from "./utils";
import { navigate, useQueryParams } from "hookrouter";
import { MainSecondUser }           from "../../panels/main/second-user/MainSecondUser";

type P = {
  id: EpicViewId,
  panelId?: string
};

export const MainView = (p: P) => {
  const [queryParams] = useQueryParams();
  const activePanel = extractMainViewId(p.panelId);
  const {ticket_id = undefined} = queryParams;


  return (
    <View activePanel={activePanel} id={p.id}>
      <MainMainPanel id="main" />
      <MainTicketPanel id="ticket" ticketId={ticket_id} />
      <MainSecondUser id="second-user" />
    </View>
  );
};
