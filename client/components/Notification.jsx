import React, { useState, useEffect } from "react";
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

function Notification(props) {

  function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
  }

  return (
    <Snackbar
    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
    open={props.isSnackOpen}
    // TransitionComponent={TransitionDown}
    autoHideDuration={5000}
    message={props.message}
    onClose={() => console.log('Active')}
   />
  );
}

export default Notification;



