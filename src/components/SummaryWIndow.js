import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { connect } from 'react-redux';

const styles = (theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
      height: 300,
    },
    item: {
      backgroundColor: '#fafafa',
    },
    title: {
      margin: (4, 0, 2),
    },
});

export class SummaryWindow extends Component {
    displayMemberInfo(classes, customer) {
        return (
        <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
                Membership Summary
            </Typography>
            <div className={classes.item}>
            <Box component="span" display="block">
                Member ID: {customer.memberID}
            </Box>
            <Box component="span" display="block">
                Name: {customer.name}
            </Box>
            <Box component="span" display="block">
                Balance: ${customer.balance}
            </Box>
            </div>
        </Grid>
        )
    }

    displayProfile(classes, customer) {
        return (
        <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
                Profile Summary
            </Typography>
            <div className={classes.item}>
            <Box component="span" display="block">
                Username: {customer.username}
            </Box>
            <Box component="span" display="block">
                Name: {customer.name}
            </Box>
            <Box component="span" display="block">
                Address: {customer.address}
            </Box>
            </div>
        </Grid>
        )
    }

    render() {
        // this is required to refer styles
        const {classes, customer} = this.props;
        return (
            <div>
                {
                    customer.memberOrProfile ? this.displayMemberInfo(classes, customer) : this.displayProfile(classes, customer)
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    customer: state.customer,
})


export default connect(mapStateToProps, null)(withStyles(styles)(SummaryWindow));
