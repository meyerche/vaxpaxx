import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from "@material-ui/core";
import { isMacOs, isIOS } from "react-device-detect";

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
    const geoLink = function() {
        if (isMacOs || isIOS) {
            return `https://maps.apple.com/?q=${props.site.address}`;
        } else {
            return `https://maps.google.com/maps/search/?api=1&query=${props.site.address}`;
        }
    }

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h2">
                    {props.site.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    <Link href={geoLink()} target="_blank">
                        {props.site.address}
                    </Link>
                </Typography>
                <Typography variant="body2" component="p">
                    Doses available: {props.site.doses}
                    <br />
                    Doses expire: {props.site.expiration}
                </Typography>
            </CardContent>
        </Card>
    );
}
