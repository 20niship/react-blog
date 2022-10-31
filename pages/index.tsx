import type { NextPage } from 'next'
import List from '@mui/material/List'
import styles from '../styles/Home.module.css'
import { connect, page_list } from '../lib/utils/mongo'
import FeaturedPost from '../components/FeaturedPost';
import { Page } from '../lib/global'
import { GetServerSideProps } from 'next';

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
    <List className={styles.container} dense={false}>
      {props.pages.map((page) => (
        <FeaturedPost key={page.title} page={page} />
      ))}
    </List>
  )
}

