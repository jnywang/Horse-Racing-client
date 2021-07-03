import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { openAddFund,closeAddFund, addFund } from '../redux/actions/customerAction';

// dialog button
export class AddFund extends Component {
  constructor() {
    super();
    this.state = {
      amount: 0,
      invalid: false,
    }
  }

  handleClickOpen = () => {
    this.props.openAddFund();
    // console.log(this.props.customer.fundWindow);
  };

  handleClose = () => {
    this.props.closeAddFund();
    // console.log(this.props.customer.fundWindow);
  };

  handleChange = (event) => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value
    });
    if(this.state.amount<0){
      this.setState({invalid:true})
    } else {
      this.setState({invalid:false})
    }
  };

  // TODO: debug addFund
  handleTransaction = () => {
    if (this.state.amount < 0) {
      alert('Invalid number. Please entre again.')
      this.setState({amount: 0})
    } else {
      console.log('OK proceed transaction')
      const transactionData = {
        "username": this.props.customer.username,
        "fund": parseInt(this.state.amount)
      };

      this.props.addFund(transactionData);

      this.setState({amount: 0});

      this.props.closeAddFund();
    } 
  };

  render() {
    const {customer:{fundWindow}} = this.props;
    const {amount, invalid} = this.state;

    return (
      <div>
        <Button 
        variant="contained" 
        color='primary' 
        style={{width: '200px', margin: '0 auto', display: "flex",}} 
        onClick={this.handleClickOpen}>
          Add Fund
        </Button>
        <Dialog open={fundWindow} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Fund to Your Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To incraese your balance, please enter the amount.
            </DialogContentText>
            <TextField
              error={invalid}
              autoFocus
              margin="dense"
              id="addFund"
              name="amount"
              type="number"
              value={amount}
              onChange={this.handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleTransaction} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  customer: state.customer,
})

const mapActionsToProps = {
  openAddFund,
  closeAddFund,
  addFund
}

export default connect(mapStateToProps, mapActionsToProps)(AddFund);
