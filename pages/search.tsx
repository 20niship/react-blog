import List from '@mui/material/List'
import styles from '../styles/Home.module.css'
import { search } from '../lib/mongo'
import FeaturedPost from '../components/FeaturedPost';
import { Post } from '../lib/global'
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;
  const posts = await search(query);
  return { props: { posts } }
}

type Props = {
  posts: Post[];
}

export default function Home(props: Props) {
  return (
    <List className={styles.container} dense={false}>
      {props.posts.map(post => (
        <FeaturedPost key={post.title} post={post} />
      ))}
    </List>
  )
}

