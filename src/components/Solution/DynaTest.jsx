import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';


class DynaTest extends Component {

    componentWillMount() {
        
    }

    render() {
        return (
            <div><Link to={'/solution/electroHydraulicUniversal'}>DynaTest</Link></div>
        )
    }
}

export default withRouter(DynaTest);