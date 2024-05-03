'use client';

import React, { useEffect, useState } from 'react';

import SwitchTabs from './SwitchTabs';
import ContentWrapper from './ContentWrapper';
import Carousel from './Carousel';
import { Base_URL, headers } from '@/utils/api';

import '../styles/trending.scss';

const Trending = () => {
  const [data, setData] = useState({});
  const [endpoint, setEndpoint] = useState('day');
  
  const getData = async () => {
    try {
      const res = await fetch(Base_URL + `/trending/all/${endpoint}`, {
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
    setEndpoint(tab === 'Day' ? 'day' : 'week');
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={['Day', 'Week']} handleTabChange={handleTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} />
    </div>
  );
};

export default Trending;
