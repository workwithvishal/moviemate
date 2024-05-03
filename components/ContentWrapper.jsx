import React from 'react';

import '../styles/contentWrapper.scss'

const ContentWrapper = ({ children }) => {
  return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;
