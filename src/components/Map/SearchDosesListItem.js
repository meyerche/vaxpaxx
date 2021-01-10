import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function SearchDosesListItem(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h2">
                    {props.site.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {props.site.address}
                </Typography>
                <Typography variant="body2" component="p">
                    Doses available: {props.site.doses}
                    <br />
                    Doses expire: {props.site.expire}
                </Typography>
            </CardContent>
        </Card>
    );
}
