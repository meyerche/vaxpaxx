import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    textField: {
        //marginLeft: theme.spacing(1),
        //marginRight: theme.spacing(1),
        width: '20ch',
    },
    button: {
        marginTop: theme.spacing(3)
    }
}));

function AddDoses() {

    const classes = useStyles();

    return (
        <Container maxWidth={"sm"}>
            <form className={classes.root}>
                <TextField
                    id="storeName"
                    label="Location Name"
                    placeholder="e.g. Walgreens, CVS, or St Mary's Memorial Hospital"
                    variant="outlined"
                    margin={"normal"}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    id="address"
                    label="Address"
                    variant="outlined"
                    margin={"normal"}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    id="expiration"
                    label="Expiration Time"
                    variant="outlined"
                    margin={"normal"}
                    className={classes.textField}
                    type={"time"}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    id="dosesAvailable"
                    label="Doses Available"
                    variant="outlined"
                    className={classes.textField}
                    type={"number"}
                    margin={"normal"}
                    defaultValue={"0"}
                    InputLabelProps={{ shrink: true }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    href="#contained-buttons"
                    size={"large"}
                    className={classes.button}>

                    Add Doses
                </Button>
            </form>
        </Container>

        // <form noValidate autoComplete="off">
        //     <Grid
        //         container
        //         direction="column"
        //         justify="flex-start"
        //         alignItems="stretch"
        //         spacing={3}
        //     >
        //         <Grid item xs={6}>
        //         </Grid>
        //         <Grid item xs={3}>
        //         </Grid>
        //         <Grid item xs={3}>
        //
        //         </Grid>
        //     </Grid>
        // </form>
    );
}

export default AddDoses;
