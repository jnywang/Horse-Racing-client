import React, { Component } from 'react'
import { Button } from '@material-ui/core'

export class Profile extends Component {

    render() {
        return (
            <div>
                <Button 
                type="submit" 
                variant="contained" 
                color='primary' 
                style={{width: '200px', margin: '0 auto', display: "flex",}}
                onClick={this.props.onClick}    
                >
                    Profile
                </Button>
            </div>
        )
    }
}

export default Profile
