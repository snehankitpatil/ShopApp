require('@babel/register')({ presets: ['module:metro-react-native-babel-preset'] });
const React = require('react');
// mock react-native
const mockComponent = (name) => {
  const Component = ({ children }) => React.createElement(name, null, children);
  Component.displayName = name;
  return Component;
};
require('react-native').View = mockComponent('View');
require('react-native').Text = mockComponent('Text');
// just load App.js to see if it imports cleanly
try {
  const App = require('./App.js').default;
  console.log("App loaded successfully", typeof App);
} catch (e) {
  console.error("CRASH:", e);
}
