// @flow

declare type EpicViewId = "events" | "main" | "menu" | "check-params";

declare type EpicGlobalViewId =
  | "global-settings"
  | "global-events"
  | "global-favorite";

declare type EpicContextType = [EpicViewId, (EpicViewId) => void];
