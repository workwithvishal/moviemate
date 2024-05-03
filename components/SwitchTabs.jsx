'use client';

import { useState } from 'react';

import '../styles/switchTabs.scss';

const SwitchTabs = ({ data, handleTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    handleTabChange(tab, index);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, index) => (
          <span
            key={index}
            className={`tabItem ${selectedTab === index ? 'active' : ''}`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}{' '}
          </span>
        ))}
        <span className="movingBg" style={{ left: left }} />
      </div>
    </div>
  );
};

export default SwitchTabs;
