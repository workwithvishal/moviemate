'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import ContentWrapper from './ContentWrapper';
import PlayBtn from './PlayBtn';
import VideoPopup from './VideoPopup';

import '../styles/videosSection.scss';

const VideosSection = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    if (data) setLoading(false);
  }, [data]);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Official Videos</div>
        {!loading ? (
          <div className="videos">
            {data?.results?.map((video) => (
              <div
                className="videoItem"
                key={video.id}
                onClick={() => {
                  setVideoId(video.key);
                  setShow(true);
                }}
              >
                <div className="videoThumbnail">
                  <Image
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                    alt="Video thumbnail"
                    className="videoPoster"
                    height={150}
                    width={400}
                  />
                  <PlayBtn />
                </div>
                <div className="videoTitle">{video.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideosSection;
