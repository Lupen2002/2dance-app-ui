// @flow

import React                               from "react";
import { Avatar, Button, Cell, Separator } from "@vkontakte/vkui";
import ReactMarkdown                       from "react-markdown";
import EventDate                           from "./EventDate";
import { globalOpenGroup }                 from "../../../../utils/yandex/metrics";

type P = {
  group: VkGroup,
  accent: number | null,
  onOpen: () => void,
  onClose: () => void
};

export default function GroupEventCell(p: P) {

  const onOpen = () => {
    globalOpenGroup();
    p.onOpen()
  };

  return (
    <>
      <Cell
        key={p.group.id + ""}
        size="l"
        onClick={p.accent === p.group.id ? p.onClose : onOpen}
        description={
          <div>
            <div>Город: {p.group.city && (p.group.city.title || "-")}</div>
            <div>
              <EventDate date={p.group.start_date} />
            </div>
          </div>
        }
        before={<Avatar size={56} src={p.group.photo_100} />}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <div
            style={{
              textOverflow: "ellipsis",
              maxWidth: "95%",
              overflow: "hidden"
            }}
          >
            {p.group.name}
          </div>
          <div style={{ color: "#bbb" }}>
            {p.accent === p.group.id ? (
              <i className="fas fa-chevron-up" />
            ) : (
              <i className="fas fa-chevron-down" />
            )}
          </div>
        </div>
      </Cell>
      {p.accent === p.group.id && (
        <Cell>
          <>
            <div style={{ whiteSpace: "pre-line" }}>
              {p.group.description && (
                <ReactMarkdown
                  source={p.group.description.replace(/\n/, "\n\n")}
                />
              )}
              <Separator style={{ margin: '12px 0' }} />
              {/*<Button
                size="m"
                level="commerce"
                target="_blank"
                style={{ marginLeft: 8 }}
              >
                <i className="fas fa-running" /> Я пойду
              </Button>*/}
              <Button
                size="m"
                component="a"
                level="primary"
                target="_blank"
                href={"http://vk.com/club" + p.group.id}
                style={{ marginLeft: 8 }}
              >
                <i className="fas fa-external-link-alt" /> Открыть
              </Button>
            </div>
          </>
        </Cell>
      )}
    </>
  );
}
