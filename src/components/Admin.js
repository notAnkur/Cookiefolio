import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDeliveryDrivers } from '../actions/deliveryAction';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import DeliveryCard from './DeliveryCard';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const Admin = (props) => {

  const classes = useStyles();

  React.useEffect(() => {
    props.getDeliveryDrivers();
  }, [props.deliveryState.deliveryDriver.length]);

  const handleCardRefresh = () => {
    props.getDeliveryDrivers();
  }
  
  return(
      <React.Fragment>
        <Container className={classes.cardGrid} maxWidth="md">
          <Typography component="h1" variant="h4" align="center" color="primary" gutterBottom>
            <Link to="/" style={{ textDecoration: 'none', color: '#3770ff' }}>
              Cookiefolio
            </Link>
          </Typography>
          <br />
          <Typography component="h1" variant="h6" align="center" color="primary" gutterBottom>
            Delivery Drivers
          </Typography>
          <br />
          <Grid container spacing={4}>
            {
              !props.deliveryState.deliveryFetchStatus
                ? `Loading...`
                : (
                  props.deliveryState.deliveryDriver.map(driver => (
                    <DeliveryCard driver={driver} key={driver._id} handleCardRefresh={handleCardRefresh}/>
                  ))
                )
            }
          </Grid>
        </Container>
      </React.Fragment>
    );

}

const mapStateToProps = state => ({
  deliveryState: state.delivery
});

export default withRouter(connect(mapStateToProps, {getDeliveryDrivers})(Admin));