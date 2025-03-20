import React from 'react';
import { Tabs } from 'antd';
import { FaRegUserCircle } from 'react-icons/fa'; // Example icon component
import Audios from './Audios';
import AudioSpanish from './AudioSpanish';

const onChange = (key: string) => {
  console.log(key);
};

const items = [
  {
    key: '1',
    label: 'English',
    children: (
        <Audios />
    ),
  },
  {
    key: '2',
    label: 'Spanish',
    children: (
      <AudioSpanish />
    ),
  },
 
];

const AudioMother: React.FC = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;

export default AudioMother;
