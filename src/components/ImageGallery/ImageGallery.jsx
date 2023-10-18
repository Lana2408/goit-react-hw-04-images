import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <>
      <ImageGalleryList>
        {images.map(({ id, webformatURL, tags, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
              openModal={openModal}
              largeImageURL={largeImageURL}
            />
          );
        })}
      </ImageGalleryList>
    </>
  );
};