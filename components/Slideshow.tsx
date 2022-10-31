import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import styles from '../styles/Slideshow.module.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

type Props = {
  sec: number;
  images: string[];
};

export default function Showcase(props: Props) {
  const [count, setCount] = useState(0);
  const { images, sec } = props;

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

  return (
    <div className={styles.showcase}>
      {
        images.map((image, index) => {
          return (
            <CSSTransition
              key={index}
              timeout={sec}
              in={index === count}
              classNames="fade"
              unmountOnExit
            >
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
              </Card>
            </CSSTransition>
          )
        })
      }
    </div>
  )
};

