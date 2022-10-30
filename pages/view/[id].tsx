import type { NextPage } from 'next'
import FeaturedPost from '../../components/FeaturedPost';
import { Page } from '../../lib/global'
import { GetServerSideProps } from 'next';
import { connect, get_page_by_id } from '../../lib/utils/mongo'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  console.log(id);
  await connect();
  const page = await get_page_by_id(id);
  console.log("pages = ", page)
  return { props: { page } }
}

type Props = {
  page: Page | null
}

export default function Home(props: Props) {
  if (props.page == undefined) {
    return (
      <h1>Not found!</h1>
    )
  }
  return (
    <>
      {
        <FeaturedPost page={props.page} />
      }
    </>
  )
}

