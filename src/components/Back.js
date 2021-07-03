import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom';

// redirect to another page
export class Back extends Component {
    render() {
        return (
            <div>
                <Button type="submit" variant="contained" style={{margin: '0 auto', display: "flex"}} disableElevation>
                    <Link to="/customer">Back</Link>
                </Button>
            </div>
        )
    }
}

export default Back