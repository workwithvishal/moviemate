'use client';

const { store } = require('.');
const { Provider } = require('react-redux');

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
