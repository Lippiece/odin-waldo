const Home = () => {
  return (
    <>
      <section className="hero">
        <h1>Welcome to Odin Waldo</h1>
        <p>Find your favorite characters from a pool of images</p>
        <button>Start tagging</button>
      </section>
      <section className="about">
        <h2>About Odin Waldo</h2>
        <p>
          Odin Waldo is a photo tagging app that challenges users to
          find their favorite characters from a pool of images. With
          our easy-to-use interface, you'll have a blast trying to
          spot all the characters in our collection.
        </p>
      </section>
      <section className="features">
        <h2>Features</h2>
        <ul>
          <li>Pool of images to choose from</li>
          <li>Easy-to-use interface</li>
          <li>
            Compete with friends and family to find characters the
            fastest
          </li>
        </ul>
      </section>
      <section className="call-to-action">
        <h2>Ready to get started?</h2>
        <button>Sign up now</button>
      </section>
    </>
  );
};

export default Home;
