// @flow

import React, { createContext, useContext } from 'react'

type P = {
  activeStory: EpicViewId,
  setActiveStory: EpicViewId => void,
  children: React$Node
};

const defaultValue: EpicContextType = ["", () => {}];

export const EpicContext = createContext<EpicContextType>(defaultValue);

export const EpicContextProvider = (p: P) => {
  return (
    <EpicContext.Provider value={[p.activeStory, p.setActiveStory]}>
      {p.children}
    </EpicContext.Provider>
  )
};

export const useEpicContext = () => useContext(EpicContext);

