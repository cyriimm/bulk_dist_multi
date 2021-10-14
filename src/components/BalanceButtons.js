import {Tooltip, Button, Typography, makeStyles} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import BalancesList from "./BalancesList";
import Link from "@material-ui/core/Link";

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


export default function BalanceButtons() {


    const [showDetails, setShowDetails] = useState(false);

    const classes = useStyles();
  const spacing = 24;
  return (
    <div style={{ display: 'flex', marginLeft: spacing }}>
        <span>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowDetails(!showDetails)}>
              Balance
          </Button>
            <br>
            </br>

            {showDetails ?

                <Grid item xs={12} className={classes.balancesContainer}>

                    <BalancesList/>
                </Grid> : null
            }
        </span>
    </div>
  );
}
