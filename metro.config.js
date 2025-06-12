const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const originalResolver = config.resolver || {};
const originalExtraNodeModules = originalResolver.extraNodeModules || {};

config.resolver = {
  ...originalResolver,
  extraNodeModules: new Proxy(
    {
      ...originalExtraNodeModules,
      stream: require.resolve('readable-stream'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      url: require.resolve('url/'),
      zlib: require.resolve('browserify-zlib'),
      crypto: require.resolve('react-native-quick-crypto'),
      buffer: require.resolve('@craftzdog/react-native-buffer'),
      assert: require.resolve('assert/'),
      util: require.resolve('util/'),
      vm: require.resolve('vm-browserify'),

      net: false,
      tls: false,
      fs: false,
    },
    {
      get: (target, name) => {
        if (name in target) {
          return target[name];
        }
        try {
          return require.resolve(name);
        } catch (e) {
          return undefined;
        }
      },
    }
  ),
};

module.exports = config;