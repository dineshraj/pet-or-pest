import React from 'react';

const App: React.FunctionComponent = () => {
  // const [image, setImage] = useState({ hits: [] });

  // useEffect(async () => {
  //   const image =
  //   setImage(image);
  // });

  function handleClick(e): void {
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

export default App;
