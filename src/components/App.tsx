import React, { useState, useEffect } from 'react';

export default function App() {
  // const [image, setImage] = useState({ hits: [] });

  // useEffect(async () => {
  //   const image =
  //   setImage(image);
  // });

  function handleClick(e) {
    console.log(e.target);
    console.log(e.target.getAttribute('data-id'));
  }

  return (
    <>
      <header className="header">
        <h1>Pet or Pest?</h1>
      </header>
      <main className="main">
        <img
          className="animal"
          src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/01/07/13/monarch-butterfly.jpg?w968h681"
        />
        <button data-id="pest" className="arrow arrow--pest" onClick={(e: Event) => handleClick(e)}>Pest</button>
        <button data-id="pet" className="arrow arrow--pet" onClick={(e: Event) => handleClick(e)}>Pet</button>
      </main>
      <footer className="footer">Pet or Pest? Made by D Goomani and Aimee Rivers</footer>
    </>
  );
}
