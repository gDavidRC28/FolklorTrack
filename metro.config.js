const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configuración para Supabase y polyfills
config.resolver.alias = {
  crypto: require.resolve('react-native-quick-crypto'),
  stream: require.resolve('readable-stream'),
  buffer: require.resolve('buffer'),
  http: require.resolve('stream-http'),
  https: require.resolve('https-browserify'),
  url: require.resolve('url'),
};

// Extensiones de archivo
config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs'];

module.exports = config;