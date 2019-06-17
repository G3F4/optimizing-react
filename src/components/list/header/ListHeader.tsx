import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import React, { memo } from 'react';

export interface ListProps {
  onSaveAll(): void;
  onEditAll(): void;
}

function ListHeader(props: ListProps) {
  const { onSaveAll, onEditAll } = props;
  // tslint:disable-next-line:no-shadowed-variable

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Invitations
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <Button color="inherit" onClick={onSaveAll}>Save all</Button>
        <Button color="inherit" onClick={onEditAll}>Edit all</Button>
      </Toolbar>
    </AppBar>
  );
}

export default memo(ListHeader);
