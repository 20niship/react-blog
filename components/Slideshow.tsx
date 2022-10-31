import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "../styles/Slideshow.module.scss";

type Props = {
  sec: number;
  images: string[];
};

const Showcase: React.FC<Props> = ({ sec = 1000, images = [] }: Props) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => {
        return count >= images.length - 1 ? 0 : count + 1;
      });
    }, sec);
    return () => {
      clearInterval(interval);
    };
  }, [images, sec]);

  const slide = images.map((image, index) => {
    return (
      <CSSTransition
        key={index}
        timeout={sec}
        in={index === count}
        classNames="fade"
        unmountOnExit
      >
        <div style={{ backgroundImage: `url(${image})` }} />
      </CSSTransition>
    );
  });

  return <section className={styles.showcase}>{slide}</section>;
};

export default Showcase;

