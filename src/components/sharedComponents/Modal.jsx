import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from '../sharedComponents/Modal.module.css';
import propTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, src, alt }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: propTypes.func.isRequired,
  src: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
};
