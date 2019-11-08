// @flow

import { ModalPage, ModalPageHeader } from "@vkontakte/vkui";
import React from "react";

type P = {
  title: string,
  onClose: () => void,
  children?: React$Node
};

export default function SelectModal(p: P) {
  return (
    <ModalPage onClose={p.onClose}>
      <ModalPageHeader>{p.title}</ModalPageHeader>
      {p.children}
      <div style={{ minHeight: "25vh" }} />
    </ModalPage>
  );
}
