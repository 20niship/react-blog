import type { NextPage } from 'next'
import List from '@mui/material/List'
import styles from '../styles/Home.module.css'
import { connect, page_list } from '../lib/utils/mongo'
import FeaturedPost from '../components/FeaturedPost';
import { Page } from '../lib/global'
import { GetServerSideProps } from 'next';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState, Fragment, useRouter } from 'react'
import SearchResultList from '../components/SearchResultList'

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connect();
  const pages = await page_list(0, 30);
  console.log("pages = ", pages)
  return { props: { pages } }
}

type Props = {
  pages: Page | undefined;
}

export default function Home(props: Props) {
  return (
    <Fragment>
      <Typography variant="h4">記事一覧</Typography>
      <SearchResultList pages={props.pages} page={1} count={10} />
    </Fragment>
  )
}

