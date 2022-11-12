import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Stack, Button, IconButton, Table, TableBody, Typography, TableCell, TableHead, TableRow, Alert, ButtonGroup } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useEffect, useState, ChangeEvent } from 'react';
import { Post, ViewStatus } from '@/lib/global'
import Layout from '@/components/admin/layout'
import Tags from '@/components/Tags'

export default function PageConfig() {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);

  const limit = 20;

  const update_post = async () => {
    console.log("UPDATE POST")
    const res = await fetch('/api/posts?' + new URLSearchParams({ page, limit }));
    if (!res.ok) {
      console.error("cannot get posts")
      return;
    }
    const js = await res.json();
    console.log(js.posts)
    setPosts(js.posts);
    setCount(js.count)
  }

  const handleChange = (_: ChangeEvent<unknown>, value: number) => {
    console.log("page = ", value);
    setPage(value - 1);
  }

  useEffect(() => { update_post(); }, [page])

  return (
    <>
      <Typography variant="h2">All Posts</Typography>
      <Typography variant="h5">{count}posts</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Updated</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Views</TableCell>
            <TableCell>LGTMs</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => (
            <TableRow hover key={post._id}>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.user}</TableCell>
              <TableCell><Tags tags={post.tags} size="small" /></TableCell>
              <TableCell>
                {(post.status === ViewStatus.Published) && <Alert severity="success">Published</Alert>}
                {(post.status === ViewStatus.Draft) && <Alert severity="info">Draft</Alert>}
                {(post.status === ViewStatus.Deleted) && <Alert severity="error">Deleted</Alert>}
              </TableCell>
              <TableCell>{post.update as string}</TableCell>
              <TableCell>{post.create as string}</TableCell>
              <TableCell>{post.viewcount}</TableCell>
              <TableCell>{post.lgtm}</TableCell>
              <TableCell>
                <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                  <IconButton aria-label="delete" ><DeleteIcon /></IconButton>
                  <IconButton aria-label="edit" ><EditIcon /></IconButton>
                  <IconButton aria-label="view" ><VisibilityIcon /></IconButton>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack alignItems="center">
        <Pagination count={Math.floor(count / limit)} page={page + 1} onChange={handleChange} size="large" color="primary" />
      </Stack>
    </>
  );
}

PageConfig.getLayout = function getLayout(page: any) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}
