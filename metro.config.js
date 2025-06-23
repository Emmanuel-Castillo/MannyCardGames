const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (() => {

    // Loads the default Metro config tailored for Expo
  const config = getDefaultConfig(__dirname);

  const { resolver, transformer } = config;

  config.transformer = {
    ...transformer,

    // Tells Metro to use the svg transformer for .svg files
    babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
  };

  config.resolver = {
    ...resolver,

    // Exclude .svg from the assetExts list so that Metro doesn't treat them as static assets like images
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),

    // Adds support for .cjs files (CommonJS modules) and svg files
    // svg files added to treat them like code and process them through the transformer
    sourceExts: [...resolver.sourceExts, 'svg', 'cjs'],

    // Disables use of export fields in package.json
    unstable_enablePackageExports: false,
  };

  return config;
})();
