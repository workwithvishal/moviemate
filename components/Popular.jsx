'use client';

import React, { useEffect, useState } from 'react';

import ContentWrapper from './ContentWrapper';
import SwitchTabs from './SwitchTabs';
import Carousel from './Carousel';
import { Base_URL, headers } from '@/utils/api';


import '../styles/trending.scss';

const Popular = () => {
  const [data, setData] = useState({});
  const [endpoint, setEndpoint] = useState('movie');

  const getData = async () => {
    try {
      const res = await fetch(Base_URL + `/${endpoint}/popular`, {
        headers,
      });
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [endpoint]);

  const handleTabChange = (tab) => {
    setEndpoint(tab === 'Movies' ? 'movie' : 'tv');
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">What&apos;s popular</span>
        <SwitchTabs
          data={['Movies', 'TV Shows']}
          handleTabChange={handleTabChange}
        />
      </ContentWrapper>
      <Carousel data={data?.results} endpoint={endpoint} />
    </div>
  );
};

export default Popular;
