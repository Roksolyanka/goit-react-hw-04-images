import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay } from './Overlay.styled';
import { ModalWindow } from './ModalWindow.styled';

export const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const onCloseEscape = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onCloseEscape);
    return () => {
      window.removeEventListener('keydown', onCloseEscape);
    };
  }, [onClose]);

  const onBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay className="overlay" onClick={onBackdropClick}>
      <ModalWindow className="modal">
        <img src={image} alt={image.tags} />
      </ModalWindow>
    </Overlay>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
