import "../css/Home.css";

import {
  Body1,
  Body1Strong,
  Button,
  Title1,
  Title2,
} from "@fluentui/react-components";

const Home = () => {
  return (
    <>
      <section className="hero">
        <Title1 as="h1">Welcome to Odin Waldo</Title1>
        <Title2 as="h2">
          Find your favorite characters from a pool of images
        </Title2>
        <Button>Start tagging</Button>
      </section>
      <section className="about">
        <Title1 as="h1">About Odin Waldo</Title1>
        <Body1 as="p">
          Odin Waldo is a photo tagging app that challenges users to find their
          favorite characters from a pool of images. With our easy-to-use
          interface, you'll have a blast trying to spot all the characters in
          our collection.
        </Body1>
      </section>
      <section className="features">
        <Title2 as="h2">Features</Title2>
        <ul>
          <li>
            <Body1Strong as="p">Pool of images to choose from</Body1Strong>
          </li>
          <li>
            <Body1Strong as="p">Easy-to-use interface</Body1Strong>
          </li>
          <li>
            <Body1Strong as="p">
              Compete with friends and family to find characters the fastest
            </Body1Strong>
          </li>
        </ul>
      </section>
      <section className="call-to-action">
        <Title1 as="h1">Ready to get started?</Title1>
        <Button>Sign up now</Button>
      </section>
    </>
  );
};

export default Home;
