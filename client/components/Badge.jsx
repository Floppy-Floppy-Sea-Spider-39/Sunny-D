import React, { useState, useEffect } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


// https://mui.com/material-ui/react-image-list/
function Badge(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const imgClass = (props.achieved) ? "badge" : "badge unAchieved";
    
    return (
        <>
            <Modal open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="modal">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {props.details.title}
                        </Typography>
                        <img className="badge" src={props.details.img} alt={props.details.title}/>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {props.details.description}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Date Achieved: Not yet achieved
                        </Typography>
                    </div>
                </Box>
            </Modal>
            <ImageListItem style={{textAlign: 'center'}} key={props.details.img}>
                <Tooltip title={props.details.title} placement='bottom'>
                    <img className="badge unAchieved" src={props.details.img} alt={props.details.title} onClick={handleOpen}/>
                </Tooltip>
                <ImageListItemBar title={props.details.title} position='below' />
            </ImageListItem>
        </>
    )

}

export default Badge;