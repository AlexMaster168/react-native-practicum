import React from "react";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

// Реальная реклама. Грузится только в production-сборке (см. index.js),
// чтобы dev-build без нативного модуля google-mobile-ads не падал на старте.
const AdBannerImpl = () => {
  const adsId = useSelector(({ ads }) => ads.adsId);
  const theme = useSelector(({ app }) => app.activeTheme);

  return (
    <SafeAreaView
      style={{
        position: "relative",
        bottom: 0,
        alignItems: "center",
        backgroundColor: theme.background,
      }}
    >
      <BannerAd
        unitId={adsId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: false }}
      />
    </SafeAreaView>
  );
};

export default AdBannerImpl;
