import { Component } from 'react';
import { fetchImages } from './service/api-pixabay';

import SearchBar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import { Loader } from './Loader/Loader';
import { notifications } from './notifications/notifications';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    isNeedShowModal: false,
    largeImage: '',
    isLoadMore: true,
    error: null,
  };


  async componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    const perPage = 12;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true, isLoadMore: false });
        const fetchedImages = await fetchImages(query, page, perPage);
        const result = fetchedImages.hits;

        this.setState(prevState => {
          return {
            images: [...prevState.images, ...result],
            isLoadMore: true,
          };
        });

        if (fetchedImages.totalHits < perPage * page && page !== 1) {
          this.setState({ isLoadMore: false });
        }

        if (result.length < perPage && page === 1) {
          this.setState({ isLoadMore: false });
        }

        if (result.length === 0 && page === 1) {
          toast.warn(
            'Sorry, there are no images matching your search query. Please try again.',
            notifications
          );
          this.setState({ isLoadMore: false });
        }
      } catch (error) {
        this.setState({
          error: toast.error(error.message, notifications),
        });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSearch = query => {
    this.setState({ query, page: 1, images: [] });
  };

  openModal = image => {
    this.setState(() => ({
      isNeedShowModal: true,
      largeImage: image,
    }));
  };

  closeModal = () => {
    this.setState({ isNeedShowModal: false, largeImage: '' });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoadMore: false,
    }));
  };

  render() {
    const { images, largeImage, isLoading, isLoadMore, isNeedShowModal } =
      this.state;

    return (
      <>
        <SearchBar onSubmit={this.handleSearch} />
        {isLoading && <Loader />}
        <ImageGallery images={images} openModal={this.openModal} />
        {isNeedShowModal && (
          <Modal
            largeImage={largeImage}
            onClose={this.closeModal}
            images={images}
          />
        )}
        {images.length > 0 && isLoadMore && (
          <Button images={images} onClick={this.handleLoadMore} />
        )}
        <ToastContainer />
      </>
    );
  }
}
