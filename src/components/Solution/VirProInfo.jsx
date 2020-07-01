import React, { useEffect, useState } from 'react';
import apiSolution from '../../api/apiSolution';
import FadeTransitions from '../Common/FadeTransitions';
import { useMediaQuery, Button, ButtonGroup } from '@material-ui/core';
import { Carousel } from 'antd-mobile'
import CONFIG from '../../config';
import Common from '../Common/Common';

const VirProInfo = state => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    const [data, setData] = useState([])
    const [hardInfo, setHardInfo] = useState([])
    const [variant, setVariant] = useState("contained")
    const infoArr = [];
    const virProType = state.location.pathname.split('/')[state.location.pathname.split('/').length - 1]
    useEffect(() => {
        const fetch = async() => {
            const result = await apiSolution.fetchVir()
            if(result.code === 200){
                result.data.forEach((item, index) => {
                    if(item['id'] == virProType) {
                        setData(item)
                        item.content['硬件接口'].split('、').map(item => {
                            fetchHardInfo(item)
                        })
                    }
                })
            }
        }
        fetch()

        const fetchHardInfo = async params => {
            const result = await apiSolution.fetchHardInterfaceInfo(params)
            let note = result.data[0].content['说明']
            const infoObj = {}
            note = typeof note === "object" ? note : JSON.parse(note)
            infoObj[params] = note
            infoArr.push(infoObj)
            // setHardInfo(infoArr)
        }
        
        updateSideMenu()
    }, [virProType])

    // 恢复侧边栏的显示
    const updateSideMenu = () => {
        //console.log(state)
        const pagePath = state.location.pathname;
        let menuId, rootId;
        CONFIG.singlePage.forEach(items => {
            if (pagePath.indexOf(items.pathname) !== -1) {
                menuId = items.menuId;
                rootId = items.rootId;
            }
        });
        const { updateSideMenuList, updateSelectedSideMenu, updateSelectedSideName } = state;
        try {
            const result = Common.getSelectMenuInfo(CONFIG.menu, menuId, rootId);
            updateSideMenuList(result.menuList);
            updateSelectedSideMenu(result.item.pathname);
            updateSelectedSideName(result.item.text);
        } catch (e) {
            
        }
    }

    const showHardInfo = () => {
       
    }

    const RenderContent = () => {
        if(data.length === 0) return
        const content = data.content;
        const resArr = []
        for(let key in content) {
            const arr = []
            const val = Common.transToView(content[key])
            if(val.type === 'picture') {
                resArr.push(<div key={key} style={{display: 'flex', justifyContent:'space-around', flexDirection: "row"}}>
                    <div style={{width: "80%"}}>
                        <Carousel
                        autoplay={false}
                        infinite
                        selectedIndex={variant === "contained" ? 0 : 1}
                        dots={false}
                        beforeChange={ (e,v) => console.log()}
                        afterChange={(index) => index === 0 ? setVariant('contained') : setVariant('outlined') }
                        >
                            {val.valueArr.map((img, index) => (
                                <div key={index} style={{display: "flex", justifyContent: "center"}}>
                                    <a
                                    href={`${CONFIG.url(`/img/gallery/${img}`)}`}
                                    style={{ display: 'inline-block', width: isPc ? "350px" : "80%", height: "auto" }}
                                >
                                    <img
                                    src={`${CONFIG.url(`/img/gallery/${img}`)}`}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                    onLoad={() => {
                                        window.dispatchEvent(new Event('resize'));
                                    }}
                                    />
                                </a>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    <div style={{display: "flex", alignSelf: "flex-end"}}>
                        <ButtonGroup color="primary" size="small">
                            <Button variant={variant === "contained" ? "contained" : "outlined"} onClick={() => setVariant('contained')}>正面图</Button>
                            <Button variant={variant === "outlined" ? "contained" : "outlined" } onClick={() => setVariant('outlined')}>背面图</Button>
                        </ButtonGroup>
                    </div>
                    {/* {
                        val.valueArr.map((img, index) => (
                            <div key={img} style={{backgroundImage: `url(${CONFIG.url(`/img/gallery/${img}`)})`, width: isPc ? "45%" : "100%", height: 200,  backgroundSize:'contain', backgroundRepeat: "no-repeat", backgroundPosition:"center", cursor:"pointer" }} onMouseEnter={() => showHardInfo(hardInfo)}></div>
                        ))
                    } */}
                </div>)
            }else{
                resArr.push(<div key={key}><h3>{key}</h3></div>)
                val.valueArr.map((item, index) => {
                    arr.push(<div key={index} style={{fontSize: isPc ? 16 : 14, textIndent: isPc ? 32 : 28, fontWeight: 400, lineHeight: 1.4, color: "#333"}}>
                        <div><p>{item}</p></div>
                    </div>)
                })
                resArr.push(arr)
            }
        }
        return resArr
    }
    return(
        <FadeTransitions>
            <div style={{padding: isPc ? "20px 40px" : "20px", overflow:'auto', background: "#fff", width: "100%"}}>
                <div>{RenderContent()}</div>
            </div>
        </FadeTransitions>
    )
}

export default VirProInfo;