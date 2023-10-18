import React, { Component } from 'react';
import { Overlay, ModalContent } from './Modal.styled';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  }

  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  }

  render() {
    const { largeImage, images } = this.props;
    return (
      <Overlay onClick={this.handleOverlayClick}>
        <ModalContent>
          <img src={largeImage} alt={images.tags} />
        </ModalContent>
      </Overlay>
    );
  }
}

export default Modal;
