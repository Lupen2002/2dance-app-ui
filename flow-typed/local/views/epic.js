// @flow

declare type EpicViewId = "main" | "scanner";

declare type EpicContextType = [EpicViewId, (EpicViewId) => void];
