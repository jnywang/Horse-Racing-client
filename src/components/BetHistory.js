import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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

// maybe add {Box} here
export class BetHistory extends Component {

    //render summaryInfo
    renderRow(bets) {
        return bets.map((data)=>(
            <ListItem key={data.betID}>
            <ListItemText
                primary={`Bet on ${data.nickname} (id: ${data.horseID})`}
                secondary={`on ${data.bet_date}; type: ${data.bet_type}`}
            />
            </ListItem>
        ))
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
                    <div className={classes.item}>
                        <List dense={false}>
                            {
                                this.renderRow(bets)
                            }
                        </List>
                    </div>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    bets: state.custBet.bets
})

export default connect(mapStateToProps, null)(withStyles(styles)(BetHistory));
