import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      margin: "0 0 10px 0",
    },
    cardContent: {
        padding: "12px"
    },
    title:{
        fontSize: "0.8rem",
        fontWeight: "600 !important",
        fontColor: "black"
    },
    subtitle: {
        fontSize: "0.8rem",
        fontWeight: "400 !important",
        fontStyle: "italic"
    }
  }));


function ProductCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.title} component="h4">{props.title}</Typography>
          <Typography className={classes.subtitle} component="p">{props.subtitle}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
