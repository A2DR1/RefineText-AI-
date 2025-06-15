const { getDefaultConfig } = require("@expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push("cjs");
config.resolver.unstable_enablePackageExports = false;

// ✅ This helps Metro resolve tslib
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  tslib: path.resolve(__dirname, "node_modules/tslib"),
};

module.exports = config;