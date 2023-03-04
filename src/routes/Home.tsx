import "../css/Home.css"

import { Button } from "@blueprintjs/core"

const Home = () => {
  return (
    <>
      <section className="hero">
        <h1>Welcome to Odin Waldo</h1>
        <h2>
          Find your favorite characters from a pool of images
        </h2>
        <Button>Start tagging</Button>
      </section>
      <section className="about">
        <h1>About Odin Waldo</h1>
        <p>
          Odin Waldo is a photo tagging app that challenges users to find their
          favorite characters from a pool of images. With our easy-to-use
          interface, you'll have a blast trying to spot all the characters in
          our collection.
        </p>
      </section>
      <section className="features">
        <h2>Features</h2>
        <ul>
          <li>
            <strong>Pool of images to choose from</strong>
          </li>
          <li>
            <strong>Easy-to-use interface</strong>
          </li>
          <li>
            <strong>
              Compete with friends and family to find characters the fastest
            </strong>
          </li>
        </ul>
      </section>
      <section className="call-to-action">
        <h1>Ready to get started?</h1>
        <Button>Sign up now</Button>
      </section>
    </>
  )
}

export default Home
