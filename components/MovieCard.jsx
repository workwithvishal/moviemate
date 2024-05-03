'use client'

import dayjs from 'dayjs';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import RatingCircle from './RatingCircle';
import Genres from './Genres';
import PosterFallback from '../public/assets/no-poster.png';

import '../styles/movieCard.scss';

const MovieCard = ({ data, fromSearch, mediaType }) => {
  const { url } = useSelector((state) => state.home);
  const router = useRouter();
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallback;

  return (
    <div
      className="movieCard"
      onClick={() => router.push(`/${data.media_type || mediaType}/${data.id}`)}
    >
      <div className="posterBlock">
        <Image className="posterImg" src={posterUrl} fill sizes='100%' alt="poster" />
        {!fromSearch && (
          <>
            <RatingCircle rating={data.vote_average.toFixed(1)} />
            <Genres data={data.genre_ids.slice(0, 2)} />
          </>
        )}
      </div>
      <div className="textBlock">
        <span className="title">{data.title || data.name}</span>
        <span className="date">
          {dayjs(data.release_date).format('MMM D, YYYY')}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
