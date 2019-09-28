// @flow

declare type EpicViewId = "main" | "menu";

declare type EpicContextType = [EpicViewId, (EpicViewId) => void];
