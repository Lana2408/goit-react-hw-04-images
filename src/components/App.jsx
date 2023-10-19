import React, { useState, useEffect } from 'react';
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

  const handleKeyDown = (event) => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };

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
        toast.error(error.message, notifications);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [query, page, handleKeyDown]);

  const handleSearch = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const openModal = (image) => {
    setIsNeedShowModal(true);
    setLargeImage(image);
  };

  const closeModal = () => {
    setIsNeedShowModal(false);
    setLargeImage(''); 
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      <ImageGallery images={images} openModal={openModal} />
      {isNeedShowModal && (
        <Modal
          largeImage={largeImage}
          images={images}
          onClose={closeModal}
        />
      )}
      {images.length > 0 && isLoadMore && (
        <Button images={images} onClick={handleLoadMore} />
      )}
      <ToastContainer />
    </>
  );
};

export default App;
