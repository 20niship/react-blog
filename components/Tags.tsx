import * as React from 'react';
import Chip from '@mui/material/Chip';
import TagIcon from '@mui/icons-material/Tag';
import { useRouter } from 'next/router'

type Props = {
  tags: string[]
  size?: "small"
}

export default function Tags(props: Props) {
  const { tags } = props;
  const size = props?.size || "";
  const router = useRouter();
  return (
    <>
      {
        tags.map(tag => {
          return <Chip icon={<TagIcon />} label={tag} key={tag} onClick={() => { router.push("/search?t=" + tag); }} size={size} />
        })
      }
    </>
  );
}
