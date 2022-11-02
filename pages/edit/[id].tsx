import { GetServerSideProps } from 'next';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import InfoIcon from '@mui/icons-material/Info';
import UpdateIcon from '@mui/icons-material/Update';

import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { githubDark } from '@uiw/codemirror-theme-github';

import { useCallback, useEffect, useState } from 'react';

import md2html from '../../lib/utils/md';
import PageView from '../../components/PageView';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Page } from '../../lib/global'
import { connect, get_page_by_id } from '../../lib/utils/mongo'
import { BlankLayout } from '../../components/Layouts';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  await connect();
  const page = await get_page_by_id(id);
  return { props: { page } }
}

type Props = {
  page: Page | null
}

export default function Editor(props: Props) {
  if (props.page == undefined) {
    return (
      <h1>Not found!</h1>
    )
  }

  const { page } = props;
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
    update_text(page.context, false);
  }, [])

  return (
    <>
      <Grid container spacing={2} sx={{ width: "100vw", margin: "auto" }}>
        <Grid item xs={12}>
          <Typography component="h2" variant="h5">
            {page.title}
          </Typography>
          <Chip icon={<InfoIcon />} label={page.update} />
          <Chip icon={<UpdateIcon />} label={page.create} />
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
    </>
  )
}

Editor.getLayout = function getLayout(page) {
  return (
    <BlankLayout>
      <Header />
      {page}
      <Footer />
    </BlankLayout>
  );
}

