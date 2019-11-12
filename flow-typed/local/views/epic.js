// @flow

declare type EpicViewId = "events" | "main" | "menu" | "check-params";

declare type EpicGlobalViewId = "global-moderation" | "global-events";

declare type EpicContextType = [EpicViewId, (EpicViewId) => void];
