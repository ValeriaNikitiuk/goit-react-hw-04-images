import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import pixabayApi from './servicesApi/posts-api';
import Loader from './Loader/Loader';

const Status = {
  IDLE: 'idle',
  // непрацюючий
  PENDING: 'pending',
  //  ===== очікує
  RESOLVED: 'resolved',
  //  ВИРІШИЛИ:
  REJECTED: 'rejected',
  // відхилили
};

export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('idle');
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!search) {
      return;
    }
    const renderImg = () => {
      setStatus(Status.PENDING);

      pixabayApi
        .fetchImages(search, page)
        .then(response =>
          setImages(prevState => [...prevState, ...response.hits])
        )
        .catch(error => {
          setStatus(Status.REJECTED);
        })
        .finally(() => setStatus(Status.RESOLVED));
    };
    renderImg();
  }, [search, page]);

  const searchPosts = newSearch => {
    if (newSearch === search) {
      return;
    }
    setSearch(newSearch);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <Searchbar onSubmit={searchPosts} />
      {status === Status.IDLE && <p>Please enter your search term</p>}
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && <p>Something wrong, try later</p>}

      {images.length > 0 && (
        <>
          <ImageGallery images={images} />
          <Button onClick={loadMore}>
            <Loader />
          </Button>
        </>
      )}
    </>
  );
}
