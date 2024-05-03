import HeroBanner from '@/components/HeroBanner';
import Trending from '@/components/Trending';
import Popular from '@/components/Popular';
import TopRated from '@/components/TopRated';

export default async function Home() {
  return (
    <div className="homePage">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
}
