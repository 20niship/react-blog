import List from '@mui/material/List'
import styles from '../styles/Home.module.css'
import { connect, page_list } from '../lib/utils/mongo'
import FeaturedPost from '../components/FeaturedPost';
import { Page } from '../lib/global'
import { GetServerSideProps } from 'next';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState, Fragment, ChangeEvent } from 'react'
import { useRouter } from 'next/router';

type Props = {
  pages: Page[],
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
          props.pages.map((page) => (
            <FeaturedPost key={page.title} page={page} />
          ))
        }
      </List>
      <Typography > Page: {props.page} </Typography>
      <Pagination count={10} page={props.page} onChange={handleChange} />
    </Fragment>
  );
}

