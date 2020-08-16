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

  const [currentImage, setCurrentImage] = useState(
    selectImage({ random: false })
  );

  const [previousImage, setPreviousImage] = useState(null);

  const [choiceMade, setChoiceMade] = useState(null);

  function handleClick(e): void {
    setPreviousImage(currentImage);
    let newImage = selectImage({ random: true });
    while (newImage === currentImage) {
      newImage = selectImage({ random: true });
    }
    setCurrentImage(newImage);
    setChoiceMade(e.target.getAttribute('data-id'));
  }

  function renderResults(): object {
    return (
      <>
        <span className="result__text">you said {choiceMade}!</span>
        <img className="result__image" src={previousImage} />
      </>
    );
  }

  return (
    <>
      <header className="header">
        <img src="pet-or-pest-logo.png" alt="pet or pest logo" />
        <h1 className="hide">Pet or Pest?</h1>
      </header>
      <main className="main">
        <div className="choice">
          <img
            className="animal"
            src={currentImage}
            alt="image of a pet or a pest"
          />
          <button
            data-id="pest"
            aria-label="choose pest"
            className="arrow arrow--pest"
            onClick={(e: Event): void => handleClick(e)}
          />
          <button
            data-id="pet"
            aria-label="choose pet"
            className="arrow arrow--pet"
            onClick={(e: Event): void => handleClick(e)}
          />
        </div>
        <div className="result">{previousImage ? renderResults() : null}</div>
      </main>
    </>
  );
};

App.propTypes = {
  imageData: PropTypes.array
};

export default App;
