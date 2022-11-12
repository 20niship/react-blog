import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react'
import CreatePost from '@/components/menu/CreatePost'
import DeletePost from '@/components/menu/DeletePost'

export default function BasicSpeedDial() {
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");

  const handleOpen = () => { setOpen(true); setDialogType("") }
  const handleClose = () => { setOpen(false); setDialogType("") }
  const open_dialog = (type: string) => { setDialogType(type); }

  const render_dialog = () => {
    console.log(dialogType)
    switch (dialogType) {
      case "":
      case "save":
        return (<></>);
      case "create":
        return <CreatePost onClose={handleClose} />
      case "delete":
        return <DeletePost />
    }
  }
  const dlg = render_dialog();

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: "30px", right: "30px" }}
        icon={<SpeedDialIcon />}
        onClose={() => { if (dialogType !== "") handleClose }}
        onOpen={handleOpen}
        open={open}
      >
        <SpeedDialAction icon={(<SaveIcon />)} tooltipTitle="new" tooltipOpen onClick={() => { open_dialog("create") }} />
        <SpeedDialAction icon={(<DeleteIcon />)} tooltipTitle="delete" tooltipOpen onClick={() => { open_dialog("delete") }} />
      </SpeedDial>
      {dlg}
    </>
  );
}

