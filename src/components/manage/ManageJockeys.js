import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchSingleJockey } from '../../redux/actions/jockeyAction';

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

export class ManageJockeys extends Component {

    handleListItemClick = (jockeyID) => {
        // setSelectedIndex(index);
        console.log(jockeyID)
        this.props.fetchSingleJockey(jockeyID);
    }
    
    renderjockeyInfo(jockey) {
      return (
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            {jockey.nickname}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Name
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            {jockey.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            jockey ID
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            {jockey.jockeyid}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Years of experience
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            {jockey.years_of_exp}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Horse club
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            {jockey.horse_club}
          </Typography>
        </CardContent>
      )
    }

    // ** this is not displayed properly. I will fix it later.
    displayDefaultMessage() {
      return (
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Please select a jockey.
          </Typography>
        </CardContent>
      )
    }

    render() {
      const {classes, jockeys, jockey, curJockeyID} = this.props;
    //   const [selectedIndex, setSelectedIndex] = React.useState(1);

        return (
            <div className={classes.root}>
            <Grid container spacing={3} justify="center" alignItems="center">
              <Grid item xs={4}>
              <Typography variant="h5" gutterBottom>
                Jockeys
              </Typography>
              
              <List className={classes.listRoot}>
                {jockeys.map((value) => {
                  const labelId = `checkbox-list-label-${value.jockeyid}`;
                  return (
                    <ListItem 
                      key={value.jockeyid} 
                      role={undefined} 
                      button
                      onClick={() => this.handleListItemClick(value.jockeyid)}>
                      <ListItemText 
                      id={labelId} 
                      primary={
                        `${value.name}`
                      }
                      secondary={`ID: ${value.jockeyid}; Num of Horses Ridden: ${value.num_of_horse_ridden}`} 
                      />
                      
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
             
            <Grid item xs={4}>
              <Typography variant="h5" gutterBottom>
                Jockey Info
              </Typography>

              <Card className={classes.listRoot} variant="outlined">
                {
                  curJockeyID != 0 ? this.renderjockeyInfo(jockey) : this.displayDefaultMessage()
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
    jockeys: state.jockeyInfo.jockeys,
    jockey: state.jockeyInfo,
    curJockeyID: state.jockeyInfo.jockeyid
})

const mapActionsToProps = {
  fetchSingleJockey
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ManageJockeys));