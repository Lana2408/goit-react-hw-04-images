import { useState, useEffect } from 'react';
import { fetchImages } from './service/api-pixabay';

import SearchBar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import { Loader } from './Loader/Loader';
import { notifications } from './notifications/notifications';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isNeedShowModal, setIsNeedShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [isLoadMore, setIsLoadMore] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const perPage = 12;
      if (query.trim() === '') {
        return;
      }

      try {
        setIsLoading(true);
        setIsLoadMore(false);

        const fetchedImages = await fetchImages(query, page, perPage);
        const result = fetchedImages.hits;

        setImages((prevImages) => [...prevImages, ...result]);
        setIsLoadMore(fetchedImages.totalHits >= perPage * page);

        if (result.length === 0 && page === 1) {
          toast.warn(
            'Sorry, there are no images matching your search query. Please try again.',
            notifications
          );
          setIsLoadMore(false);
        }
      } catch (error) {
        setError(toast.error(error.message, notifications));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const handleSearch = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const openModal = (image) => {
    setIsNeedShowModal(true);
    setLargeImage(image);
  };

  const closeModal = () => {
    setPage((prevPage) => prevPage + 1);
    setIsLoadMore(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setIsLoadMore(false);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} query={query} setQuery={setQuery} />
      {isLoading && <Loader />}
      <ImageGallery images={images} openModal={openModal} />
      {isNeedShowModal && (
        <Modal largeImage={largeImage} onClose={closeModal} images={images} />
      )}
      {images.length > 0 && isLoadMore && (
        <Button images={images} onClick={handleLoadMore} />
      )}
      <ToastContainer />
    </>
  );
};

export default App;
