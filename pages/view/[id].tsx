import PageView from '@/components/PageView';
import { Post } from '@/lib/global'
import { GetServerSideProps } from 'next';
import { get_post } from '@/lib/mongo'
import MenuDial from '@/components/menu/MenuDial'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string;
  const post = await get_post(id);
  return { props: { post } }
}

type Props = {
  post: Post | null
}

export default function Home(props: Props) {
  if (props.post == undefined) {
    return (
      <>
        <h1>Not found!</h1>
        <MenuDial />
      </>
    )
  }
  return (
    <>
      <PageView post={props.post} />
      <MenuDial />
    </>
  )
}

