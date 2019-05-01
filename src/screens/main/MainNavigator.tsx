import React from "react";
import { createSwitchNavigator } from "react-navigation";

// navigators
import OnboardingNavigator from "src/screens/onboarding/OnboardingNavigator";

// constants
import { ONBOARDING_FLOW, APP_FLOW } from "./MainConstants";
import AppNavigator from "src/screens/app/AppNavigator";

export const MainNavigator = createSwitchNavigator(
  {
    [ONBOARDING_FLOW]: OnboardingNavigator,
    [APP_FLOW]: AppNavigator
  },
  {
    initialRouteName: ONBOARDING_FLOW
  }
);


