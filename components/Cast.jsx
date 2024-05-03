'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';

import ContentWrapper from './ContentWrapper';
import avatar from '../public/assets/avatar.png';

import '../styles/cast.scss';

const Cast = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const { url } = useSelector((state) => state.home);
  useEffect(() => {
    if (data) setLoading(false);
  }, [data]);

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          <div className="listItems">
            {data?.map((item) => {
              let imgUrl = item.profile_path
                ? url.profile + item.profile_path
                : avatar;

              return (
                <div className="listItem" key={item.id}>
                  <div className="profileImg">
                    <Image
                      src={imgUrl}
                      alt="cast avatar"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="name">{item.name}</div>
                  <div className="character">{item.character}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
