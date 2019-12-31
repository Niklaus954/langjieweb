import React, { Component }  from 'react';
import apiAboutLangjie from'../../api/apiAboutLangjie'
import { withRouter } from 'react-router-dom'

const Activity = ({parentLocation}) => {
    console.log(parentLocation);

    return <div>
        123
    </div>
}

export default withRouter(Activity);

// class Activity extends Component {

//     async componentWillMount() {
//         const result = await apiAboutLangjie.fetchRecentActivity({
//             page: 1,
//             pageSize: 20,
//         });
//         console.log(result);
//     }

//     render() {
//         return (
//             <div>活动</div>
//         )
//     }
// }


// export default Activity;