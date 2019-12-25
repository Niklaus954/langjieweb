import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import CONFIG from '../../config'
import useMediaQuery from '@material-ui/core/useMediaQuery';


const ParagraphStyles = (props) => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    return(
        <div>
            <div style={{fontSize: isPc ? 16 : 14, textIndent: isPc ? 32 : 28, fontWeight: 400, lineHeight: 1.4, color: "#333"}}>{props}</div>
        </div>
    )
}


export default ParagraphStyles