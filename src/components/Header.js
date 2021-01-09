import React from "react";
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import "./Header.css"

class ButtonAppBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const classes = makeStyles((theme) => ({
            root: {
                flexGrow: 1,
            },
            menuButton: {
                marginRight: theme.spacing(2),
            },
            title: {
                flexGrow: 1,
            },
            searchIcon: {
                padding: theme.spacing(0, 2),
                height: '100%',
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
        }));

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h4" className={classes.title}>
                            <Link to={"/"}>VaxPaxx</Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default ButtonAppBar;
