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
    <ModalPage onClose={p.onClose} dynamicContentHeight settlingHeight={100}>
      <ModalPageHeader>{p.title}</ModalPageHeader>
      <div style={{ minHeight: "100vh" }} >
        {p.children}
      </div>
    </ModalPage>
  );
}
