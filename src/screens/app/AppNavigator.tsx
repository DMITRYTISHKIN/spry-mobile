import { createDrawerNavigator } from "react-navigation";
import { HOME, QR_SCANNER } from "./AppConstants";

import HomeScreen from "./HomeScreen";
import QrScanner from './qrScanner/QrScanner';

export default createDrawerNavigator(
  {
    [HOME]: HomeScreen,
    [QR_SCANNER]: QrScanner
  }
);
