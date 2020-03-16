import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { finishDelivery } from '../actions/deliveryAction';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  depositContext: {
    flex: 1,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const DeliveryCard = (props) => {
  const classes = useStyles();

  const handleDelivered = () => {
    props.finishDelivery(props.driver._id, props.handleCardRefresh);
  }
  
  return(
    <React.Fragment>
      <Grid item key={props.driver._id} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
        {console.log(props.driver)}
          <CardMedia
            className={classes.cardMedia}
            image="https://cdn3.iconfinder.com/data/icons/food-delivery-6/64/18-Placeholder-512.png"
            title="Delivery Driver"
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {props.driver.username}
            </Typography>
            <Typography>
              Driver Id: {props.driver._id}
            </Typography>
            <Typography>
              Assigned To: {props.driver.assignedOrderId===null ? "Driver available" : props.driver.assignedOrderId}
            </Typography>
          </CardContent>
          {
            props.driver.isAvailable
              ? null
              : (
                <CardActions>
                  <Button size="small" color="primary" onClick={handleDelivered}>
                    Mark Delivered
                  </Button>
                </CardActions>
              )
          }
        </Card>
      </Grid>
    </React.Fragment>
    );

}

export default withRouter(connect(null, {finishDelivery})(DeliveryCard));