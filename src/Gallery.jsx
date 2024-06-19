import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useGlobalContext } from './context';
import { toast } from 'react-toastify';

const Gallery = () => {
  const { searchValue } = useGlobalContext();

  const photosFetch = async () => {
    const url = `https://api.unsplash.com/search/photos?client_id=${
      import.meta.env.VITE_UNSPLASH_ACCESS_KEY
    }&query=${searchValue}`;
    try {
      const response = await axios(url);
      return response.data;
    } catch (error) {
      console.log(error.response, error.message);
    }
  };

  // Queries
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['photos', searchValue],
    queryFn: photosFetch,
  });

  if (isPending) {
    return (
      <section className='image-container'>
        <h4>Loading...</h4>
      </section>
    );
  }

  if (isError) {
    return (
      <section className='image-container'>
        <h4>There was an error...</h4>
        {toast.error(`Error getting photos from API: ${error.message}`)}
      </section>
    );
  }

  if (data.results.length < 1) {
    return (
      <section className='image-container'>
        <h4>No Results Found</h4>
      </section>
    );
  }
  return (
    <section className='image-container'>
      {data.results.map((item) => {
        const url = item?.urls?.regular;
        return (
          <img
            src={url}
            key={item.id}
            alt={item.alt_description}
            className='img'
          ></img>
        );
      })}
    </section>
  );
};

export default Gallery;
