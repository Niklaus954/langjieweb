import React from 'react';
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import CONFIG from '../../config'
import useMediaQuery from '@material-ui/core/useMediaQuery';
const isPc = useMediaQuery(CONFIG.minDeviceWidth)
const AboutI = () => {
    return(
        <div>AboutI</div>
    )
}
export default AboutI
