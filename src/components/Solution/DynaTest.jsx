import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const DynaTest = ({history}) => {
    return (
        <Link to={'/solution/electroHydraulicUniversal'}><div>DynaTest</div></Link>
    );
}

export default withRouter(DynaTest);