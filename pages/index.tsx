import { latest, latest_with_draft } from '../lib/mongo'
import { GetServerSideProps } from 'next';
import { Post } from '../lib/global'
import Typography from '@mui/material/Typography';
import { Fragment } from 'react'
import SearchResultList from '../components/SearchResultList'

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const posts = await latest();
  const posts = await latest_with_draft();
  return { props: { posts } }
}

type Props = {
  posts: Post[];
}

export default function Home(props: Props) {
  return (
    <Fragment>
      <Typography variant="h4">記事一覧</Typography>
      <SearchResultList posts={props.posts} page={1} count={10} />
    </Fragment>
  )
}

