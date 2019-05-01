import { createStackNavigator } from "react-navigation";

// screens
import PhoneDetailsScreen from "./PhoneDetailsScreen";
import CardDetailsScreen from "./CardDetailsScreen";
import OTPDetailsScreen from "./OTPDetailsScreen";

// constants
import {
  PHONE_DETAILS,
  OTP_DETAILS,
  CARD_DETAILS
} from "./OnboardingConstants";

export default createStackNavigator(
  {
    [PHONE_DETAILS]: PhoneDetailsScreen,
    [OTP_DETAILS]: OTPDetailsScreen,
    [CARD_DETAILS]: CardDetailsScreen
  },
  {
    headerMode: "float",
    navigationOptions: {
      headerStyle: { borderBottomWidth: 0 }
    }
  }
);
