import Button from '@mui/material/Button';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useState } from 'react';

export interface SimpleDialogProps {
  onClose: () => void;
}

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export default function SimpleDialog(props: SimpleDialogProps) {
  const router = useRouter();
  const { onClose } = props;
  const [title, setTitle] = useState('new title');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const create_post = async () => {
    const r = await fetch("/api/posts", { method: "PUT", headers, body: JSON.stringify({ title }) });
    if (!r.ok) return;
    const js = await r.json();
    const id = js?.post?._id;
    console.log(id);
    router.push(`/edit/${id}`)
  };

  return (
    <Dialog onClose={onClose} open={true}>
      <DialogTitle>New Title</DialogTitle>
      <TextField label="title" value={title} onChange={handleChange} />
      <Button onClick={create_post}>Create Post</Button>
    </Dialog>
  );
}

