import { GetServerSideProps } from 'next';
import { Grid, Button, Typography, Chip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import UpdateIcon from '@mui/icons-material/Update';

import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { githubDark } from '@uiw/codemirror-theme-github';

import { useCallback, useEffect, useState } from 'react';

import md2html from '../../lib/utils/md';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Post } from '../../lib/global'
import { get_post } from '../../lib/mongo'
import { BlankLayout } from '../../components/Layouts';
import { useRouter } from 'next/router';
import useMessage from '@/components/Message';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string;
  const post = await get_post(id);
  return { props: { post } }
}

type Props = {
  post: Post | null
}

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export default function Editor(props: Props) {
  const router = useRouter();
  const [Message, opener] = useMessage();
  const { id } = router.query;
  if (props.post == undefined) {
    return (
      <h1>Not found!</h1>
    )
  }

  const { post } = props;
  const [text, setText] = useState("");
  const [mdhtml, setMdhtml] = useState("");

  const update_text = useCallback((md: string, _: any) => {
    console.log('value:');
    setText(md);
    const html = md2html(md)
    setMdhtml(html);
    console.log(html);
  }, []);

  useEffect(() => {
    update_text(post.context, false);
  }, [])

  const deletePost = async () => {
    const r = await fetch("/api/posts/" + id, { method: "DELETE", headers, body: "" });
    if (!r.ok) return;
    console.log(id);
  }

  const savePost = async () => {
    const r = await fetch("/api/posts/" + id, { method: "POST", headers, body: JSON.stringify({ post: { context: text } }) });
    if (!r.ok) {
      opener("Post update Error!", "error")
      return;
    }
    console.log(id);
    opener("Post updated Successfully")
  }

  const preview = async () => {
    router.push("/view/" + id)
  }


  return (
    <>
      <Grid container spacing={2} sx={{ width: "100vw", margin: "auto" }}>
        <Grid item xs={12}>
          <Typography component="h2" variant="h5">
            {post.title}
          </Typography>
          <Chip icon={<InfoIcon />} label={post.update as string} />
          <Chip icon={<UpdateIcon />} label={post.create as string} />
          <Button variant="outlined" onClick={savePost}>Save</Button>
          <Button variant="outlined" color="error" onClick={deletePost}>Delete</Button>
          <Button variant="outlined" color="info" onClick={preview}>Preview</Button>
        </Grid>
        <Grid item xs={6}>
          <CodeMirror
            value={text}
            height="100%"
            theme={githubDark}
            extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
            onChange={update_text}
          />
        </Grid>
        <Grid item xs={6}>
          <div key={new Date().getTime()} dangerouslySetInnerHTML={{ __html: mdhtml }} />
        </Grid>
      </Grid>
      {Message}
    </>
  )
}

Editor.getLayout = function getLayout(post) {
  return (
    <BlankLayout>
      <Header />
      {post}
      <Footer />
    </BlankLayout>
  );
}

