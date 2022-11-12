import PageView from '@/components/PageView';
import { Post } from '@/lib/global'
import { GetServerSideProps } from 'next';
import { get_post } from '@/lib/mongo'
import MenuDial from '@/components/menu/MenuDial'
import Layout from '@/components/admin/layout'
import md2html from '@/lib/utils/md';
import InfoIcon from '@mui/icons-material/Info';
import UpdateIcon from '@mui/icons-material/Update';
import { Accordion, Paper, Box, AccordionSummary, AccordionDetails, Typography, Chip, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tags from '@/components/Tags'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string;
  const post = await get_post(id);
  return { props: { post } }
}

type Props = {
  post: Post | null
}

export default function PostConfig(props: Props) {
  const { post } = props;
  if (post == undefined) {
    return (
      <>
        <h1>Not found!</h1>
        <MenuDial />
      </>
    )
  }
  return (
    <Box >
      <Button href="/admin/posts" variant="outlined" sx={{m:1}}>&lt; Back to Posts Page</Button>
      <Typography component="h2" variant="h5" sx={{ m: 1 }}>
        {post.title}
      </Typography>
      <Chip icon={<InfoIcon />} label={post.update as string} />
      <Chip icon={<UpdateIcon />} label={post.create as string} />
      <Tags tags={post.tags} />
      <Typography sx={{ m: 2, p: 1 }}>Page settings : </Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Preview</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper elevation={4} sx={{ borderRadius: 1, mt: 2, p: 1 }}>
            <div dangerouslySetInnerHTML={{ __html: md2html(props.post.context) }} />
          </Paper>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Statistics</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Statistics Here......
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Action/Delete</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Statistics Here......
        </AccordionDetails>
      </Accordion>
      <MenuDial />
    </Box>
  )
}

PostConfig.getLayout = function getLayout(page: any) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}
