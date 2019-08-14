import React, { useState, useEffect } from 'react';
import apiAboutLangjie from '../../api/apiAboutLangjie'

const EventRecord = () => {
    const [data, setdata] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const result = await apiAboutLangjie.fetchEventRecord();
            if (result.code === 200) setdata(result.data);
        }
        fetch();
    }, []);

    return (
        <div>
            {JSON.stringify(data)}
            {JSON.stringify(data)}
            {JSON.stringify(data)}
        </div>
    );
}

export default EventRecord;