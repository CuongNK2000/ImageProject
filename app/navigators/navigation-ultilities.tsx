import React, {useState, useEffect, useRef} from 'react';
import {
  PartialState,
  NavigationState,
  NavigationContainerRef,
} from '@react-navigation/native';
import {PrimaryParamList} from './param-navigation';

const navigationRef =
  React.createRef<NavigationContainerRef<PrimaryParamList>>();

export const RootNavigation = {
  navigate<RouteName extends keyof PrimaryParamList>(
    name: RouteName,
    params?: PrimaryParamList[RouteName],
  ) {}, // eslint-disable-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  goBack() {}, // eslint-disable-line @typescript-eslint/no-empty-function
  resetRoot(state?: PartialState<NavigationState> | NavigationState) {}, // eslint-disable-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  reset(state?: PartialState<NavigationState> | NavigationState) {}, // eslint-disable-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  getRootState(): NavigationState {
    return {} as any;
  },
};

export const setRootNavigation = (
  ref: React.RefObject<NavigationContainerRef>,
) => {
  for (const method in RootNavigation) {
    RootNavigation[method] = (...args: any) => {
      if (ref.current) {
        return ref.current[method](...args);
      }
    };
  }
};

/**
 * Gets the current screen from any navigation state.
 */
export function getActiveRouteName(
  state: NavigationState | PartialState<NavigationState>,
) {
  const route = state.routes[state.index];

  // Found the active route -- return the name
  if (!route.state) return route.name;

  // Recursive call to deal with nested routers
  return getActiveRouteName(route.state);
}
