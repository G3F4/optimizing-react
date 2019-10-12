import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import React, { memo } from 'react';

const ListHeader: React.FC = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">Invitations</Typography>
      <div style={{ flexGrow: 1 }} />
    </Toolbar>
  </AppBar>
);

export default memo(ListHeader);
