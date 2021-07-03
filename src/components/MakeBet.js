import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

const styles=(theme) =>({
    link: {
        textDecoration: 'none',
        color: '#fff',
    }
});

// redirect to another page
export class MakeBet extends Component {

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Button type="submit" variant="contained" color='primary' style={{width: '200px', margin: '0 auto', display: "flex",}}>
                    <Link to="/bet" className={classes.link}>Make a Bet</Link>
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(MakeBet);
