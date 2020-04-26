import React, { useState, useEffect } from 'react';

export default function App() {
  // const [image, setImage] = useState({ hits: [] });

  // useEffect(async () => {
  //   const image =
  //   setImage(image);
  // });

  return (
    <>
      <header>
        <h1>Pet or Pest?</h1>
      </header>
      <img
        className="animal"
        src="http://s3.eu-gb.cloud-object-storage.appdomain.cloud/pest-or-pest-storage/07ff9e5c-fd23-4b56-8fad-e3192c87d229.jpg"
      />
      <button className="arrow arrow--pest">Pest</button>
      <button className="arrow arrow--pet">Pet</button>
      <footer>Pet or Pest? Made by D Goomani and Aimee Rivers</footer>
    </>
  );
}
