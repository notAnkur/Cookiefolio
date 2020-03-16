import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { order } from '../actions/orderAction';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://cookiefolio.ankuranant.dev/">
        Cookiefolio
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Place your order'];

const Checkout = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [cookieQuantity, setCookieQuantity] = React.useState('');
  const [orderId, setOrderId] = React.useState(null);

  const onFirstNameChange = (event) => {
    setFirstName(event.target.value);
  }

  const onLastNameChange = (event) => {
    setLastName(event.target.value);
  }

  const onAddressChange = (event) => {
    setAddress(event.target.value);
  }

  const onCookieQuantityChange = (event) => {
    setCookieQuantity(event.target.value);
  }

  const handleOrder = () => {
    const orderData = {
      username: firstName+" "+lastName,
      address: address,
      cookieQuantity: cookieQuantity
    }
    props.order(orderData);
    setActiveStep(activeStep + 1);
  };

  React.useEffect(() => {
    console.log(props.orderState)
    setOrderId(props.orderState.newOrder===undefined ? null : props.orderState.newOrder._id);
  }, [Object.keys(props.orderState).length]);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            <Link color="inherit" href="https://cookiefolio.ankuranant.dev/">
              Cookiefolio
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  {console.log(props.orderState)}
                  {
                    orderId===null 
                      ? <LinearProgress />
                      : (
                          `Your order number is #${orderId}.
                          ${
                            props.orderState.newOrder.assignedTo===null
                              ? `Your order will be shipped as soon as delivery driver is available.`
                              : `Your order has been picked. Delivery driverId: ${props.orderState.newOrder.assignedTo}`
                          }`
                        )
                  }
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>

                <React.Fragment>
                  <Typography variant="h6" gutterBottom>
                    Order details
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        onChange={onFirstNameChange}
                        fullWidth
                        autoComplete="fname"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="lastName"
                        name="astName"
                        label="Last Name"
                        onChange={onLastNameChange}
                        fullWidth
                        autoComplete="lname"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="cookie"
                        name="cookie"
                        label="Cookie Quantity"
                        type="number"
                        onChange={onCookieQuantityChange}
                        fullWidth
                        autoComplete="lname"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="address"
                        name="address"
                        label="Address"
                        onChange={onAddressChange}
                        fullWidth
                        autoComplete="address"
                      />
                    </Grid>
                  </Grid>
                </React.Fragment>

                <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOrder}
                    className={classes.button}
                  >
                    Place Order
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  orderState: state.order
});

export default withRouter(connect(mapStateToProps, {order})(Checkout));