
import React, { Component } from 'react';
import apiAboutLangjie from '../../api/apiAboutLangjie';


class WxPublicPlat extends Component {


    async componentWillMount() {
        const result = await apiAboutLangjie.fetchRecommendReading({
            page: 1,
            pageSize: 20,
        });
        console.log(result);
    }

    render() {
        return(
            <div>公众号</div>
        )
    }

}

export default WxPublicPlat;