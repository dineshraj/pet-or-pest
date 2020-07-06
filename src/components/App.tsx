import React, { useState } from 'react';
import PropTypes from 'prop-types';

const IMAGE_PREFIX =
  'https://s3.eu-gb.cloud-object-storage.appdomain.cloud/pet-or-pest-storage';

const App: React.FunctionComponent = ({ imageData }) => {
  const [images] = useState(imageData);

  function selectImage({ random }): string {
    const index = random ? Math.floor(Math.random() * images.length) : 0;
    const newImage = `${IMAGE_PREFIX}/${images[index]}`;
    return newImage;
  }

  const [currentImage] = useState(selectImage({ random: false }));

  function handleClick(e): void {
    console.log(e.target.getAttribute('data-id'));
  }

  return (
    <>
      <header className="header">
        <img src="pet-or-pest-logo.png"></img>
        <h1 className="hide">Pet or Pest?</h1>
      </header>
      <main className="main">
        <img className="animal" src={currentImage} />
        <button
          data-id="pest"
          className="arrow arrow--pest"
          onClick={(e: Event): void => handleClick(e)}
        >
          Pest
        </button>
        <button
          data-id="pet"
          className="arrow arrow--pet"
          onClick={(e: Event): void => handleClick(e)}
        >
          Pet
        </button>
      </main>
      <footer className="footer">
        Pet or Pest? Made by <a href="http://www.dineshraj.com">D Goomani</a>{' '}
        and Aimee Rivers
      </footer>
    </>
  );
};

App.propTypes = {
  imageData: PropTypes.array
};

export default App;
