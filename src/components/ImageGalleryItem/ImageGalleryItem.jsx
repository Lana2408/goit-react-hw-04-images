import { ItemImage, Item } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  tags,
  openModal,
  largeImageURL,
}) => {
  return (
    <>
      <Item>
        <ItemImage
          src={webformatURL}
          alt={tags}
          loading="lazy"
          onClick={() => openModal(largeImageURL)}
        />
      </Item>
    </>
  );
};