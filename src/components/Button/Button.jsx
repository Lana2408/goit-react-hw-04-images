import React, { Component } from 'react';
import { ButtonLoad } from './Button.styled';

class Button extends Component {
  render() {
    const { images, onClick } = this.props;
    
    return (
      <div>
        {images.length > 0 && (
          <ButtonLoad type="button" onClick={onClick}>
            Load more
          </ButtonLoad>
        )}
      </div>
    );
  }
}

export default Button;
