import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setCurEmpAccountID, fetchSingleEmployeeInfo } from '../../redux/actions/employeeAction';

import { 
    Button, 
    Grid,
    Typography, 
    List, ListItem, ListItemText, 
    Card, CardContent, CardActions,
    DialogTitle, Dialog, DialogActions, DialogContent, 
  TextField 
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { deleteEmployee, editEmployee } from '../../redux/actions/employeeAction';

const styles = (theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    listRoot: {
      width: '100%',
      maxWidth: 360,
      minWidth: 260,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 300,
    },
  });


export class ManageEmployees extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            openAdd:false,
            open:false
        }
    }
    
    // not used
    handleDelete = (event) => {
      const {employee: {curEmpUsername}} = this.props;
      this.props.deleteEmployee(curEmpUsername);
    }

    handleOpenDialog = (event, edata) => {
      this.setState({openAdd:true})
    }

    handleListItemClick = (accountid) => {
      //display info
      // console.log(accountid);
      this.props.setCurEmpAccountID(accountid);
      this.props.fetchSingleEmployeeInfo(accountid);
    }

    handleChange = (event) => {
      event.preventDefault();
      this.setState({
        [event.target.name]: event.target.value
      });

      this.setState({error:false})
  }

  handleEdit = (event) => {
      const {employee: {curEmpUsername, curEmpAccountID}} = this.props;
      const edata = {
          "username": curEmpUsername,
          "emp_level": this.state.level,
          "emp_type": this.state.position,
      };

      console.log(edata);
      this.props.editEmployee(edata, curEmpAccountID);
      this.handleCancel();
  };

  handleCancel = (event) => {
      this.setState({open:false})
  }

  handleOpen = (event) => {
      this.setState({open:true})
  }

    renderEmpInfo(curEmployee) {
      return (
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Employee Name
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            {curEmployee.curEmpName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Employee ID
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            {curEmployee.curEmpAccountID}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Position
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            {curEmployee.curEmpType}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Level
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            {curEmployee.curEmpLevel}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Salary
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            {curEmployee.curEmpSalary}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Starting Date
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            {curEmployee.curEmpStartDate}
          </Typography>
        </CardContent>
      )
    }

    // ** this is not displayed properly. I will fix it later.
    displayDefaultMessage() {
      return (
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Please select an Employee.
          </Typography>
        </CardContent>
      )
    }
    
    render() {
        const {classes, employees, curEmployee, curEmpAccountID} = this.props;

        return (
            <div className={classes.root}>
            <Grid container spacing={3} justify="center" alignItems="center">
              <Grid item xs={4}>
              <Typography variant="h5" gutterBottom>
                Employees
              </Typography>
                <List className={classes.listRoot}>
                  {employees.map((value) => {
                    const labelId = `checkbox-list-label-${value.accountID}`;
                    return (
                      // selected={this.selectedIndex === value} disabled
                      <ListItem key={value.accountID} 
                                role={undefined} 
                                button
                                onClick={() => this.handleListItemClick(value.accountID)}>
                        <ListItemText id={labelId} primary={`EmployeeID: ${value.accountID} | Name: ${value.name}`} />
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>

              <Grid item xs={4}>
                <Typography variant="h5" gutterBottom>
                  Employee Info
                </Typography>
                <Card className={classes.listRoot} variant="outlined">
                  {
                    curEmpAccountID != 0 ? this.renderEmpInfo(curEmployee) : this.displayDefaultMessage()
                  }
                  <CardActions>
                  <Grid container justify="center" alignItems="center">
              <Button variant="outlined" color="primary" onClick={this.handleOpen}>
                Update
              </Button>
              </Grid>
                <Dialog open={this.state.open} onClose={this.handleCancel} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update Employee</DialogTitle>
                    <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="level"
                        label="Level"
                        name="level"
                        type="char"
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="position"
                        label="Position"
                        name="position"
                        type="char"
                        onChange={this.handleChange}
                        fullWidth
                    />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleCancel} color="tertiary">
                        Cancel
                      </Button>
                      <Button onClick={this.handleEdit} color="primary">
                        Update
                      </Button>
                    </DialogActions>
                </Dialog>
                    <Button variant="outlined" color="primary" onClick={(event) => this.handleDelete(event)}>Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
              
              <Grid item xs={12}>
              </Grid>
            </Grid>
          </div>
        )
    }
}

const mapStateToProps = state => ({
    employees: state.employee.employeeS,
    curEmployee: state.employee,
    curEmpAccountID: state.employee.curEmpAccountID,
    employee: state.employee
})

const mapActionsToProps = {
  setCurEmpAccountID,
  fetchSingleEmployeeInfo,
  deleteEmployee,
  editEmployee
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ManageEmployees));
