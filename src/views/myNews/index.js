import React from 'react';
import HomeLayout from '../Shared/layouts/Home';
import News from './subComponents/News';

export default function MyNews() {
  return (
    <HomeLayout>
      <News />
    </HomeLayout>
  );
}
