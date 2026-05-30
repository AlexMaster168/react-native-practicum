import { Platform } from 'react-native';

// TestIds.BANNER из google-mobile-ads, захардкожен строкой, чтобы не импортить
// нативный модуль на старте (store инициализируется до готовности нативки —
// иначе dev-build падает с 'RNGoogleMobileAdsModule' could not be found).
const TEST_BANNER_ID = 'ca-app-pub-3940256099942544/6300978111';

const adUnitId = __DEV__
  ? TEST_BANNER_ID
  : Platform.OS === 'ios'
  ? 'ca-app-pub-8936705114042872/4270192898'
  : 'ca-app-pub-8936705114042872/1835601249';

let initialState = {
  adsId: adUnitId,
};
export const adsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
