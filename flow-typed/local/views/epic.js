// @flow

declare type EpicViewId = "events" | "main" | "menu" | 'check-params';

declare type EpicContextType = [EpicViewId, (EpicViewId) => void];
