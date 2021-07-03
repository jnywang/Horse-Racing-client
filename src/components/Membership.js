import React, { Component } from 'react'
import { Button } from '@material-ui/core'

// change summary table info
export class Membership extends Component {

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
                    Membership Info
                </Button>
            </div>
        )
    }
}

export default Membership
