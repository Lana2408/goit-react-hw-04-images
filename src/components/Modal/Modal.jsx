import React, { useEffect } from 'react';
import { Overlay, ModalContent } from './Modal.styled';

const Modal = ({ largeImage, images, onClose }) => {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContent>
        <img src={largeImage} alt={images.tags} />
      </ModalContent>
    </Overlay>
  );
};

export default Modal;
