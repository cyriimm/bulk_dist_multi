import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useIsProdNetwork } from '../utils/connection';
import DebugButtons from '../components/DebugButtons';
import BulkButtons from '../components/BulkButtons';
import {Button, makeStyles} from '@material-ui/core';
import { useIsExtensionWidth } from '../utils/utils';
import Link from "@material-ui/core/Link";
import BalanceButtons from "../components/BalanceButtons";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down(theme.ext)]: {
      padding: 0,
    },
    [theme.breakpoints.up(theme.ext)]: {
      maxWidth: 'md',
    },
  },
  balancesContainer: {
    [theme.breakpoints.down(theme.ext)]: {
      marginBottom: 24,
    },
  },
}));

export default function WalletPage() {
  const classes = useStyles();
  const isProdNetwork = useIsProdNetwork();
  const isExtensionWidth = useIsExtensionWidth();


  return (
    <Container fixed maxWidth="md" className={classes.container}>

      <Grid item xs={12}>
        <BulkButtons />
      </Grid>
        <br></br>
      <Grid item xs={12}>
        <BalanceButtons />
      </Grid>
        <br></br>
      <Grid container spacing={isExtensionWidth ? 0 : 3}>
        {isProdNetwork ? null : (
          <Grid item xs={12}>
            <DebugButtons />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
