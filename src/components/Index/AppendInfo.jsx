import React, {useEffect, useState} from 'react';
import CONFIG from '../../config';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid } from 'antd-mobile';
import Link from '@material-ui/core/Link';

const AppendInfo = () => {
    const [data, setData] = useState([]);
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    useEffect(() =>{
        setTimeout(() => {
            setData([{
                title: '安可迅平台',
                img: 'http://localhost:7090/images/plantform.png'
            },{
                title: '控制器产品',
                img: 'http://localhost:7090/images/controller.png'
            },{
                title: '应用软件',
                img: 'http://localhost:7090/images/software.png'
            },{
                title: '成套测控系统',
                img: 'http://localhost:7090/images/tester.png'
            }])
        }, 500)
    }, [])

    const onClick = (e) => {
        e.preventDefault()
        console.log(e.preventDefault())
    }
    if(isPc) return(
            <div style={{padding: "20px 40px", width: isPc ? "100%" : "", maxWidth: CONFIG.indexPageMaxWidth, margin: "auto"}}>
                <div style={{textAlign: "center"}}><h3>解决方案</h3></div>
                <div style={{display: "flex", flexDirection: "row"}}>
                    {data.map((item, index)=> (
                        <div key={index} style={{width: `${100/data.length}%`, height: 120, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                            <div style={{width: 50}}>
                                <img src={item.img} alt="" style={{width: 70}}/>
                            </div>
                            <div style={{marginLeft:20, marginTop: 30}}><Link component="button" onClick={onClick}>{item.title}</Link></div>
                        </div>
                    ))}
                </div>
            </div>
        )
        return (
            <div style={{padding: "20px 10px"}}>
                <div style={{textAlign: "center"}}><h3>解决方案</h3></div>
                <Grid 
                    data={data} 
                    columnNum={4} 
                    square={true}
                    hasLine={false} 
                    renderItem={item => (
                        <div>
                            <img src={item.img} alt="" style={{width:50}}></img>
                            <div style={{paddingTop: 10}}><Link component="button">{item.title}</Link></div>
                        </div>
                    )}
                    />
            </div>
        )   
}

export default AppendInfo