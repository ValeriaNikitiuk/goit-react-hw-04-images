import { useState } from 'react';
import propTypes from 'prop-types';
import Modal from '../sharedComponents/Modal';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ src, alt, largeImageUrl }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <li className={s.ImageGalleryItem}>
      <img
        onClick={toggleModal}
        src={src}
        alt={alt}
        className={s.ImageGalleryItemImage}
      />
      {showModal && (
        <Modal onClose={toggleModal} src={largeImageUrl} alt={alt} />
      )}
    </li>
  );
}
ImageGalleryItem.propTypes = {
  src: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  largeImageUrl: propTypes.string.isRequired,
};
