import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { connect } from 'react-redux';
import { setRaceLocation, fetchRaceInfo } from '../redux/actions/raceInfoAction';

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

export class RaceList extends Component {

    handleSelection = (raceIndex) => {
        this.props.setRaceLocation(raceIndex);
        this.props.fetchRaceInfo(raceIndex);
    }

    renderRow(stadiums) {
        return stadiums.map((data)=> (
            <ListItem button key={data.raceid} onClick={() => this.handleSelection(data.raceid)}>
                <ListItemText 
                primary={`A Race is held at ${data.stadium_name}; race type: ${data.race_type}`}
                secondary={`on ${data.race_date}; Location: ${data.stadium_address}`} 
                />
            </ListItem>
        ))
    }

    render() {
        // this is required to refer styles
        const {classes, stadiums} = this.props;

        return (
            <div>
                <Grid item xs={12}>
                    <Typography variant="h6" className={classes.title}>
                        Current Race Information
                    </Typography>
                    <List className={classes.root} subheader={<li />}>
                    {
                        this.renderRow(stadiums)
                    }
                    </List>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    stadiums: state.raceInfo.stadiums,
    raceLocation: state.raceInfo.raceLocation
})

const mapActionsToProps = {
    setRaceLocation,
    fetchRaceInfo
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(RaceList));
