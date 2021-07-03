import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addEmployee } from '../../redux/actions/employeeAction';
import { 
    Button, Grid,
    DialogTitle, Dialog, DialogActions, DialogContent, 
    TextField 
} from '@material-ui/core'

// Dialog
export class AddEmployee extends Component {
    constructor() {
        super();
        this.state = {
            startdate: "2021-6-18",
            open:false,
            error: false
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
          [event.target.name]: event.target.value
        });

        this.setState({error:false})
    }

    handleAdd = (event) => {
        const edata = {
            "username": this.state.eusername,
            "name": this.state.ename,
            "emp_level": this.state.level,
            "emp_type": this.state.position,
            "managed_by": parseInt(this.state.managedBy),
            "starting_date": this.state.startdate
        };

        console.log(edata);
        this.props.addEmployee(edata);
        this.handleCancel();
    };

    handleCancel = (event) => {
        this.setState({open:false})
    }

    handleOpen = (event) => {
        this.setState({open:true})
    }
    
    render() {
        return (
            <div>
              <Grid container justify="center" alignItems="center">
              <Button variant="outlined" color="primary" onClick={this.handleOpen}>
                Add Employee
              </Button>
              </Grid>
                <Dialog open={this.state.open} onClose={this.handleCancel} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
                    <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="eusername"
                        name="eusername"
                        label="Username"
                        type="char"
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ename"
                        label="Name"
                        name="ename"
                        type="char"
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="managedBy"
                        label="Manager's ID"
                        name="managedBy"
                        type="char"
                        onChange={this.handleChange}
                        fullWidth
                    />
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
                    <TextField
                        autoFocus
                        margin="dense"
                        id="startdate"
                        label="Starting date"
                        name="startdate"
                        type="date"
                        value={this.state.startdate}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleCancel} color="tertiary">
                        Cancel
                      </Button>
                      <Button onClick={this.handleAdd} color="primary">
                        Add
                      </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    employee: state.employee
})

const mapActionsToProps = {
    addEmployee
}

export default connect(mapStateToProps, mapActionsToProps)(AddEmployee);