import React, { Component } from 'react';
import apiAboutLangjie from '../../api/apiAboutLangjie'

class AboutLangjie extends Component {

    async componentWillMount() {
        const result = await apiAboutLangjie.fetchBasicInfo();
        console.log(result);
    }

    render() {
        return (
            <div>关于朗杰</div>
        )
    }
}

export default AboutLangjie;