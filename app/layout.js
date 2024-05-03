import '../styles/globals.scss'

import { Inter } from 'next/font/google'
import { Providers } from '../store/Provider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { store } from '@/store';
import { getApiConfiguration, getGenres } from '@/store/homeSlice';
import Preloader from '@/components/Preloader';
import { fetchDataFromApi } from '@/utils/api';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Moviemate',
  description: 'Search movies and series',
  icons: {
    icon: ['/favicon.ico'],

  },
}
// function for making api calls based on genre
const fetchApiConfig = async () => {
  try {
    const res = await fetchDataFromApi('/configuration');
    const url = {
      backdrop: `${res.images.secure_base_url}original`,
      poster: `${res.images.secure_base_url}original`,
      profile: `${res.images.secure_base_url}original`,
    };
    store.dispatch(getApiConfiguration(url));
    return url;
  } catch (error) {
    console.log(error);
  }
};

// making calls for all the promises
const genresCall = async () => {
  let allGenres = {};
  let promises = [];
  let endPoints = ['tv', 'movie'];
  endPoints.forEach((url) => {
    promises.push(fetchDataFromApi(`/genre/${url}/list`));
  });

  // returns both the responses at once
  const data = await Promise.all(promises);
  data.map(({ genres }) => {
    return genres.map((item) => (allGenres[item.id] = item));
  });
  store.dispatch(getGenres(allGenres));
  return allGenres;
};

export default async function RootLayout({ children }) {
  const url = await fetchApiConfig();
  const genres = await genresCall();

  return (
    <html lang="en">

      <body className={inter.className}>
        <Preloader url={url} genres={genres} />

        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
