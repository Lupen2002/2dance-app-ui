// @flow

declare type EpicViewId = "events" | "main" | "menu" | "check-params";

declare type EpicGlobalViewId = "main" | "menu";

declare type EpicContextType = [EpicViewId, (EpicViewId) => void];
