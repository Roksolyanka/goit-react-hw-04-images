import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from '../Searchbar/Searchbar';
import { Button } from '../Button/Button';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Modal } from '../Modal/Modal';
import { Loader } from '../Loader/Loader';
import { AppDiv } from './AppDiv.styled';

const toastConfig = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
};

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const onSubmit = query => {
    const queryTrim = query.trim();
    if (queryTrim === '') {
      return toast.error(
        'You did not specify data for the search, please try again!',
        toastConfig
      );
    }
    setQuery(queryTrim);
    setImages([]);
    setPage(1);
    fetchImages(queryTrim, 1);
  };

  const fetchImages = async (query, currentPage) => {
    setIsLoading(true);

    try {
      const apiKey = '36422452-9b888b62de5b5be2dbb1e9e04';
      const url = `https://pixabay.com/api/?q=${query}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.hits.length === 0) {
        toast.error('No images were found for your request!', toastConfig);
      } else {
        setImages(prevImages => [...prevImages, ...data.hits]);
        setPage(currentPage + 1);
        toast.success('Images successfully uploaded!', toastConfig);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, toastConfig);
    } finally {
      setIsLoading(false);
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const onModalClick = image => {
    setShowModal(prevShowModal => !prevShowModal);
    setSelectedImage(image);
  };

  return (
    <AppDiv>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery images={images} onClick={onModalClick} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <Button onClick={() => fetchImages(query, page)} />
      )}
      {showModal && <Modal image={selectedImage} onClose={onModalClick} />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </AppDiv>
  );
};
