"use client";

import { createContext, useContext } from "react";
import { TravelContextType } from "./types";

export const TravelContext = createContext<TravelContextType | undefined>(undefined);

export const useTravel = () => {
  const context = useContext(TravelContext);
  if (context === undefined) {
    throw new Error("useTravel must be used within a TravelProvider");
  }
  return context;
};
