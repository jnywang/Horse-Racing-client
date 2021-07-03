import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchSingleHorse, fetchSuperHorse } from '../../redux/actions/horseAction';

import { 
    Grid,
    Typography, 
    List, ListItem, ListItemText, 
    Card, CardContent
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

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
        maxHeight: 330,
    },
  });



export class ManageHorses extends Component {

    handleListItemClick = (horseID) => {
        this.props.fetchSingleHorse(horseID);
        this.props.fetchSuperHorse();
        
    }
    
    renderHorseInfo(horse) {
      return (
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            {horse.nickname}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Horse ID
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            {horse.curHorseID}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Breed
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            {horse.curBreed}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Age (years)
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            {horse.curAge}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Odds
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            {horse.curODDs}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Number of races participated
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            {horse.curNumraces}
          </Typography>
        </CardContent>
      )
    }

    displayDefaultMessage() {
      return (
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Please select a Horse.
          </Typography>
        </CardContent>
      )
    }

    render() {
      const {classes, horses, horse, curHorseID, superHorseID} = this.props;
        return (
            <div className={classes.root}>
            <Grid container spacing={3} justify="center" alignItems="center" style={{marginTop: '2em'}}>
              <Grid item xs={4}>
              <Typography variant="h5" gutterBottom>
                Horses
              </Typography>
              
              <List className={classes.listRoot}>
                {horses.map((value) => {
                  const labelId = `checkbox-list-label-${value.horseID}`;
                  return (
                    <ListItem 
                      key={value.horseID} 
                      role={undefined} 
                      button
                      onClick={() => this.handleListItemClick(value.horseID)}>
                      <ListItemText 
                      id={labelId} 
                      primary={
                        `${value.nickname != null ? value.nickname : 'No Name'}`
                      }
                      secondary={
                        `ID: ${value.horseID}; 
                        MVP: ${superHorseID == value.horseID ? 'Yes' : 'No'}`
                      }
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
             
            <Grid item xs={4}>
              <Typography variant="h5" gutterBottom>
                Horse Info
              </Typography>

              <Card className={classes.listRoot} variant="outlined">
                {
                  curHorseID != 0 ? this.renderHorseInfo(horse) : this.displayDefaultMessage()
                }
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
    horses: state.horsesInfo.horses,
    horse: state.horsesInfo,
    curHorseID: state.horsesInfo.curHorseID,
    superHorseID: state.horsesInfo.superHorseID
})

const mapActionsToProps = {
  fetchSingleHorse,
  fetchSuperHorse
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ManageHorses));