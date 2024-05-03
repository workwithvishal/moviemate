'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import dayjs from 'dayjs';

import useFetch from '@/hooks/useFetch';
import ContentWrapper from './ContentWrapper';
import Genres from './Genres';
import RatingCircle from './RatingCircle';
import PosterFallBack from '../public/assets/no-poster.png';
import PlayBtn from './PlayBtn';
import VideoPopup from './VideoPopup';

import '../styles/detailsBanner.scss';

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediatype, id } = useParams();
  const { data } = useFetch(`/${mediatype}/${id}`);

  const { url } = useSelector((state) => state.home);

  const _genres = data?.genres?.map((g) => g.id);

  const directors = crew?.filter((f) => f.job === 'Director');
  const writers = crew?.filter(
    (w) => w.job === 'ScreenPlay' || w.job === 'Story' || w.job === 'Writer'
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  };

  return (
    <div className="detailsBanner">
      {data ? (
        <>
          <div className="backdrop-img">
            <Image
              src={url?.backdrop + data.backdrop_path}
              alt="backdrop-img"
              priority={true}
              className="background-img"
              style={{ objectFit: 'cover' }}
              fill={true}
            />
          </div>
          <div className="opacity-layer"></div>
          <ContentWrapper>
            <div className="content">
              <div className="left">
                {data.poster_path ? (
                  <Image
                    className="posterImg"
                    src={url.backdrop + data.poster_path}
                    alt="poster img"
                    width={350}
                    height={500}
                    priority={true}
                  />
                ) : (
                  <Image
                    className="posterImg"
                    src={PosterFallBack}
                    alt="poster img"
                    width={350}
                    height={500}
                    priority={true}
                  />
                )}
              </div>
              <div className="right">
                <div className="title">
                  {`${data.name || data.title} (${dayjs(
                    data.release_date
                  ).format('YYYY')})`}
                </div>
                <div className="subtitle">{data.tagline}</div>
                <Genres data={_genres} />
                <div className="row">
                  <RatingCircle rating={data?.vote_average.toFixed(1)} />
                  <div
                    className="playbtn"
                    onClick={() => {
                      setShow(true);
                      setVideoId(video.key);
                    }}
                  >
                    <PlayBtn />
                    <span className="text">Watch Trailer</span>
                  </div>
                </div>
                <div className="overview">
                  <div className="heading">Overview</div>
                  <div className="description">{data?.overview}</div>
                </div>
                <div className="info">
                  {data.status && (
                    <div className="infoItem">
                      <span className="text bold">Status: </span>
                      <span className="text">{data.status}</span>
                    </div>
                  )}
                  {data.release_date && (
                    <div className="infoItem">
                      <span className="text bold">Release Date: </span>
                      <span className="text">
                        {dayjs(data.release_date).format('MMM D YYYY')}
                      </span>
                    </div>
                  )}
                  {data.runtime && (
                    <div className="infoItem">
                      <span className="text bold">Runtime: </span>
                      <span className="text">
                        {toHoursAndMinutes(data.runtime)}
                      </span>
                    </div>
                  )}
                </div>
                {directors?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Directors: </span>
                    <span className="text">
                      {directors.map((director, index) => (
                        <span key={index}>
                          {director.name}{' '}
                          {directors.length - 1 !== index && ', '}
                        </span>
                      ))}
                    </span>
                  </div>
                )}

                {writers?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Writers: </span>
                    <span className="text">
                      {writers.map((writer, index) => (
                        <span key={index}>
                          {writer.name} {writers.length - 1 !== index && ', '}
                        </span>
                      ))}
                    </span>
                  </div>
                )}

                {data?.created_by?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Creators: </span>
                    <span className="text">
                      {data?.created_by.map((creator, index) => (
                        <span key={index}>
                          {creator.name}{' '}
                          {data?.created_by.length - 1 !== index && ', '}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <VideoPopup
              show={show}
              setShow={setShow}
              videoId={videoId}
              setVideoId={setVideoId}
            />
          </ContentWrapper>
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
