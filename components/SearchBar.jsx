'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import '../styles/heroBanner.scss';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const searchQueryHandler = (e) => {
    if (e.key === 'Enter' || (e.type === 'click' && query.length > 0)) {
      router.push(`/search/${query}`);
    }
  };

  return (
    <div className="searchInput">
      <input
        type="text"
        placeholder="Search for movies and series..."
        onKeyUp={searchQueryHandler}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchQueryHandler}>Search</button>
    </div>
  );
};

export default SearchBar;
