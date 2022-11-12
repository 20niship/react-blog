import List from '@mui/material/List'
import styles from '../styles/Home.module.css'
import FeaturedPost from '../components/FeaturedPost';
import { Post } from '../lib/global'
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState, Fragment, ChangeEvent } from 'react'

type Props = {
  posts: Post[],
  const: number,
  page: number,
}

export default function SearchResultList(props: Props) {
  const handleChange = (_: ChangeEvent<unknown>, value: number) => {
    let params = new URLSearchParams(location.search);
    params.set('page', value.toString());
    window.location.search = params.toString();
  }

  return (
    <Fragment>
      <List className={styles.container} dense={false} >
        {
          props.posts.map((post) => (
            <FeaturedPost key={post.title} post={post} />
          ))
        }
      </List>
      <Typography > Page: {props.page} </Typography>
      <Pagination count={10} page={props.page} onChange={handleChange} />
    </Fragment>
  );
}

