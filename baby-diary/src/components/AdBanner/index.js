import React from "react";
import { View } from "react-native";

// В dev реклама не показывается, поэтому google-mobile-ads (нативный модуль)
// здесь НЕ импортируется — иначе dev-build без рекламного модуля падает на
// старте (TurboModuleRegistry: 'RNGoogleMobileAdsModule' could not be found).
// Реальная реклама подключается только в production-сборке.
let AdBanner = () => <View />;

if (!__DEV__) {
  AdBanner = require("./AdBannerImpl").default;
}

export default AdBanner;
