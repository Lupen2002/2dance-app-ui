// @flow

declare type EpicViewId = "events" | "main" | "menu";

declare type EpicContextType = [EpicViewId, (EpicViewId) => void];
