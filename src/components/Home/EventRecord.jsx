import React, { useState, useEffect } from 'react';
import { Steps } from 'antd-mobile';
import apiAboutLangjie from '../../api/apiAboutLangjie'
import FadeTransitions from '../Common/FadeTransitions'
const Step = Steps.Step;

const EventRecord = () => {
    const [data, setdata] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const result = await apiAboutLangjie.fetchEventRecord();
            if (result.code === 200) setdata(result.data);
        }
        fetch();
    }, []);

    const renderStep = () => {
        const resArr = [];
        if (data.length === 0) return;
        const obj = data[0].content;
        for (let key in obj) {
            let textArr = [];
            if (typeof obj[key] === 'object') {
                try {
                    textArr = obj[key].map((items, index) => <p key={key + '-' + index}>{items}</p>);
                } catch (error) {
                    textArr = obj[key];
                }
            } else {
                textArr = obj[key];
            }
            resArr.unshift(<Step key={key} title={key + '年'} description={textArr} />);
        }
        return resArr;
    }

    return (
        <FadeTransitions>
            <Steps size="middle" current={100}>
                { renderStep() }
            </Steps>
        </FadeTransitions>
    );
}

export default EventRecord;