import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import NavBar from '../components/NavBar'
import SummaryWindow from '../components/SummaryWIndow'
import DetailWindow from '../components/DetailWindow'
import Membership from '../components/Membership'
import Profile from '../components/Profile'
import AddFund from '../components/AddFund'
import MakeBet from '../components/MakeBet'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import { fetchCustomerInfo, displayMemberInfo, displayProfile } from '../redux/actions/customerAction'

const styles = (theme) => ({
    root: {
      flexGrow: 1,
    },
});

export class Customer extends Component {
    constructor(props) {
        super(props);
        this.handleMemberShip = this.handleMemberShip.bind(this);
        this.handleProfile = this.handleProfile.bind(this);
    }

    handleMemberShip = (event) => {
        this.props.displayMemberInfo();
        // console.log(this.props.customer.display);
    }
    
    handleProfile = () => {
        this.props.displayProfile();
        // console.log(this.props.customer.display);
    }

    render() {
        // this is required to refer styles
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <NavBar/>
                <Container maxWidth="lg" style={{marginTop: '100px'}}>
                    <h1>Welcome {this.props.customer.name}</h1>
                    <Grid container spacing={2} justify="center" alignItems="center" style={{height: '500px'}}>
                  
                        <Grid item xs={6}>
                            <SummaryWindow/>
                        </Grid>
                        <Grid item xs={6}>   
                            <DetailWindow/>
                        </Grid>
              
                    </Grid>
                </Container>

                <Container maxWidth="lg">
                    <Grid id="top-row" container spacing={3}>
                        <Grid item xs={6}>                
                            <Membership onClick={this.handleMemberShip}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Profile onClick={this.handleProfile}/>
                       </Grid>
                    </Grid>
         

                    <Grid id="bottom-row" container spacing={3}>
                        <Grid item xs={6}>                
                                <AddFund/>
                            </Grid>
                            <Grid item xs={6}>
                                <MakeBet/>
                        </Grid>     
                        </Grid>        
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    customer: state.customer,
    user: state.user
})

const mapActionsToProps = {
    fetchCustomerInfo,
    displayMemberInfo,
    displayProfile
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Customer));
