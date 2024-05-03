import DetailsBanner from '@/components/DetailsBanner';
import Cast from '@/components/Cast';
import VideosSection from '@/components/VideosSection';
import Similar from '@/components/Similar';
import Recomendation from '@/components/Recomendation';
import { Base_URL, headers } from '@/utils/api';

const getData = async (mediatype, id) => {
  try {
    const res = await fetch(Base_URL + `/${mediatype}/${id}/videos`, {
      headers,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getCredits = async (mediatype, id) => {
  try {
    const res = await fetch(Base_URL + `/${mediatype}/${id}/credits`, {
      headers,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default async function Page({ params }) {
  const { mediatype, id } = params;
  const data = await getData(mediatype, id);
  const credits = await getCredits(mediatype, id);

  return (
    <div>
      <DetailsBanner video={data?.results[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} />
      <VideosSection data={data} />
      <Similar mediaType={mediatype} id={id} />
      <Recomendation mediaType={mediatype} id={id} />
    </div>
  );
}
