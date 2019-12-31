import React,{useEffect, useState} from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
    withRouter,
} from 'react-router-dom'
import CONFIG from '../../config';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import apiIndex from '../../api/apiIndex';
import Common from '../Common/Common';

const SuggestReading = ({ history }) => {
    const [data, setData] = useState([])
    useEffect(() => {
        apiIndex.fetchArticle().then(result => {
            const data = {
                title: result.data.title,
                href: result.data.href,
                img: '',
                content: '',
            };
            for (const key in result.data.content) {
                const r = Common.transToView(result.data.content[key]);
                if (!data.content && r.type === 'text') {
                    data.content = r.value;
                }
                if (!data.img && r.type === 'picture') {
                    data.img = CONFIG.url('/img/gallery/' + r.value);
                }
            }
            setData([data]);
        });
    }, [])
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);

    const goToInfo = item => {
        history.push({
            pathname: item.href,
            state: {
                aaa: 123
            },
        });
    }

    if(isPc){
        return(
            <div style={{maxWidth: CONFIG.indexPageMaxWidth, width: isPc ? "100%" : "", margin: "auto"}}>
                {
                    data.map((val ,index) => (
                        <div key={index} style={{ display: "flex", flexDirection: "row", padding: "40px"}}>
                            {/*<div style={{ maxWidth: 500, overflow: 'hidden', display: "flex", alignItems: "center"}}><img src={val.img} alt="" width="100%"  ></img></div>*/}
                            <div style={{backgroundImage: `url(${val.img})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", width: 400, height: 240, backgroundPosition: "center"}}></div>
                            <div style={{paddingLeft: 40, width: "70%"}}>
                                <div><h3>{val.title}</h3></div>
                                <Divider/>
                                <div>
                                <p style={{lineHeight: 1.4, fontWeight: 400, color: "#333", fontSize: "16px"}}>{val.content}</p>
                                    <Button color="primary" variant="outlined" onClick={() => goToInfo(val)}>了解详情</Button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }else{
        return(
            <div style={{maxWidth: CONFIG.indexPageMaxWidth, width: isPc ? "100%" : "", margin: "auto"}}>
                {data.map((val, index) => (
                    <div key={index} style={{ display: "flex", flexDirection: "column"}}>
                        {/*<div style={{margin: "20px 40px 0 40px", maxWidth: "500px", overflow: 'hidden'}}><img src={val.img} alt="" width="100%" ></img></div>*/}
                        <div style={{backgroundImage: `url(${val.img})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", maxWidth: 300, height: 240, margin: "20px 40px 0 40px", backgroundPosition: "center"}}></div>
                        <div style={{padding: "20px 40px"}}>
                            <div><h3>{val.title}</h3></div>
                            <Divider/>
                            <div>
                            <p style={{lineHeight: "20px"}}>{val.content}</p>
                                <Button color="primary" variant="outlined" onClick={() => goToInfo(val)}>了解详情</Button>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
        )
    }
}

export default withRouter(SuggestReading);