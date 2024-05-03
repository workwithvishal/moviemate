'use client';

const { useRef } = require('react');

const { store } = require('@/store');
const { getApiConfiguration, getGenres } = require('@/store/homeSlice');

export default function Preloader({ url, genres }) {
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(getApiConfiguration(url));
    store.dispatch(getGenres(genres));
    loaded.current = true;
  }
  return null;
}
