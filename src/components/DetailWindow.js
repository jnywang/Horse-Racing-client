import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import { fetchBetInfo } from '../redux/actions/custBetAction';

const styles = (theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: '#fafafa',
        position: 'relative',
        overflow: 'auto',
        height: 300,
      },
      title: {
        margin: (4, 0, 2),
      },
  });


// maybe add {Box} here
export class DetailWindow extends Component {

    componentDidMount() {
        const {customer: {accountID}} = this.props;

        this.props.fetchBetInfo(accountID);
    }
    
    render() {
        // this is required to refer styles
        const {classes, bets} = this.props;

        return (
            <div>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>
                        Bet History
                    </Typography>
                    <List className={classes.root} subheader={<li />}>
                    {
                        bets.map((data)=>(
                            <ListItem key={data.betID}>
                            <ListItemText
                                primary={`Bet on ${data.nickname} (id: ${data.horseID})`}
                                secondary={`on ${data.bet_date}; type: ${data.bet_type}`}
                            />
                            </ListItem>))
                    }
                    </List>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    customer: state.customer,
    bets: state.custBet.bets
})

export default connect(mapStateToProps, {fetchBetInfo})(withStyles(styles)(DetailWindow));
