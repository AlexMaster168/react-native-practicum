module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // Плагин reanimated/worklets подключается автоматически через babel-preset-expo (SDK 56)
  };
};
