import React from 'react';
import HomeLayout from '../Shared/layouts/Home';
import News from './subComponents/news';

export default function Home() {
  return (
    <HomeLayout>
      <News />
    </HomeLayout>
  );
}
