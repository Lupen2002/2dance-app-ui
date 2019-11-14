// @flow

import React, { useEffect, useState }                    from "react";
import { Avatar, Button, Cell }                          from "@vkontakte/vkui";
import { Group, List, Panel, PanelHeader, PanelSpinner } from "@vkontakte/vkui";
import Moment                                            from "react-moment";
import { getGroups, putGroups }                          from "../../../../api";
import LeftPanelHeaderButtons                            from "../../../../components/controlls/LeftPanelHeaderButtons";
import { back }                                          from "../../../../utils/default/url";

type P = {
  id: string
};

export default function ModerationPanel(p: P) {
  const [groups, setGroups] = useState(null);

  const update = async () => {
    const res = await getGroups();
    const now = Math.round(Date.now() / 1000);
    setGroups(
      res.filter(
        g =>
          g.app.status === "new" &&
          g.start_date &&
          typeof g.start_date === "number" &&
          g.start_date > now
      )
    );
  };

  useEffect(() => {
    update().catch(console.error)
  }, []);

  const onClick = (g: VkGroup, status: "show" | "ignored") => async () => {
    const app = { status };
    await putGroups({ ...g, app });
    update().catch(console.error);
  };

  return (
    <Panel id={p.id}>
      <PanelHeader left={<LeftPanelHeaderButtons back={back} type='back'/>}>Модерация</PanelHeader>
      {!groups && <PanelSpinner />}
      <Group>
        <List>
          {groups &&
            groups.map((g: VkGroup) => (
              <Cell
                key={g.id + ""}
                size="l"
                description={
                  g.start_date && (
                    <Moment format="DD.MM.YYYY" date={g.start_date * 1000} />
                  )
                }
                bottomContent={
                  <div style={{ display: "flex" }}>
                    <Button size="m" onClick={onClick(g, "show")}>
                      Добавить
                    </Button>
                    <Button
                      size="m"
                      onClick={onClick(g, "ignored")}
                      level="secondary"
                      style={{ marginLeft: 8 }}
                    >
                      Скрыть
                    </Button>
                    <Button
                      size="m"
                      component="a"
                      level="secondary"
                      target="_blank"
                      href={"http://vk.com/club" + g.id}
                      style={{ marginLeft: 8 }}
                    >
                      Открыть
                    </Button>
                  </div>
                }
                before={<Avatar size={46} src={g.photo_100} />}
              >
                {g.name} - {g.id}
              </Cell>
            ))}
        </List>
      </Group>
    </Panel>
  );
}
