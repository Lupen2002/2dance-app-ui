// @flow

import React, { useState, useEffect } from "react";
import { Avatar, Button, Panel, PanelHeader } from "@vkontakte/vkui";
import { PanelSpinner, View } from "@vkontakte/vkui";
import { Group, List, Cell } from "@vkontakte/vkui";
import { extractMainViewId } from "./utils";
import { getGroups } from "../../../api";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";

type P = {
  id: EpicGlobalViewId,
  activePanel?: string
};

export default function GlobalsEventsView(p: P) {
  const activePanel = extractMainViewId(p.activePanel);
  const [groups, setGroups] = useState(null);
  const [accent, setAccent] = useState(null);

  useEffect(() => {
    const now = Date.now();
    getGroups().then((res: VkGroup[]) =>
      setGroups(
        res
          .filter(
            g =>
              g.app.status === "show" &&
              g.start_date &&
              typeof g.start_date === "number" &&
              g.start_date * 1000 > now
          )
          .sort((a, b) => a.start_date - b.start_date)
      )
    );
  }, []);

  return (
    <View activePanel={activePanel} id={p.id}>
      <Panel id="main">
        <PanelHeader>Все события</PanelHeader>
        {!groups && <PanelSpinner />}
        <Group>
          <List>
            {groups &&
              groups.map((g: VkGroup) => (
                <Cell
                  key={g.id + ""}
                  size="l"
                  description={
                    <div>
                      <div>Город: {g.city && (g.city.title || "-")}</div>
                      <div>
                        <Moment
                          format="DD.MM.YYYY HH:mm"
                          date={g.start_date * 1000}
                        />
                      </div>
                    </div>
                  }
                  before={<Avatar size={46} src={g.photo_100} />}
                  bottomContent={
                    accent === g.id && (
                      <>
                        <div style={{ whiteSpace: "normal", maxWidth: "70%" }}>
                          <ReactMarkdown source={g.description} />
                          <Button
                            size="m"
                            component="a"
                            level="primary"
                            target="_blank"
                            href={"http://vk.com/club" + g.id}
                            style={{ marginLeft: 8 }}
                          >
                            Открыть
                          </Button>
                        </div>
                      </>
                    )
                  }
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {g.name}
                    <div style={{color: '#bbb'}}>
                      {accent === g.id ? (
                        <i
                          className="fas fa-chevron-up"
                          onClick={() => setAccent(null)}
                        />
                      ) : (
                        <i
                          className="fas fa-chevron-down"
                          onClick={() => setAccent(g.id)}
                        />
                      )}
                    </div>
                  </div>
                </Cell>
              ))}
          </List>
        </Group>
      </Panel>
    </View>
  );
}
