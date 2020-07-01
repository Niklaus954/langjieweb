import React, { useEffect, useState } from 'react';
import apiSolution from '../../api/apiSolution';
import FadeTransitions from '../Common/FadeTransitions';
import { useMediaQuery, Button, ButtonGroup  }from '@material-ui/core';
import CONFIG from '../../config';
import Common from '../Common/Common';
import { Carousel } from "antd-mobile"
import ISD from '../Common/ISDInfomation'

const DynaProInfo = state => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    const [data, setData] = useState([])
    const [variant, setVariant] = useState("contained")
    const DynaProType = state.location.pathname.split('/')[state.location.pathname.split('/').length - 1]
    useEffect(() => {
        const fetch = async() => {
            const result = await apiSolution.fetchDyna()
            if(result.code === 200){
                result.data.forEach((item, index) => {
                    if(item['id'] == DynaProType) {
                        setData(item)
                    }
                })
            }
        }
        fetch()
        updateSideMenu()
    }, [])

    // 恢复侧边栏的显示
    const updateSideMenu = () => {
        const pagePath = state.location.pathname;
        let menuId, rootId;
        CONFIG.singlePage.forEach(items => {
            if (pagePath.indexOf(items.pathname) !== -1) {
                menuId = items.menuId;
                rootId = items.rootId
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


    const Render = () => {
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
                    <div style={{display: isPc ? "flex" : "none", alignSelf: "flex-end"}}>
                        <ButtonGroup color="primary" size="small">
                            <Button variant={variant === "contained" ? "contained" : "outlined"} onClick={() => setVariant('contained')}>正面图</Button>
                            <Button variant={variant === "outlined" ? "contained" : "outlined" } onClick={() => setVariant('outlined')}>背面图</Button>
                        </ButtonGroup>
                    </div>
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
            <div style={{padding: isPc ? "20px 40px" : "20px", overflow:'auto', background: "#fff"}}>
                <div>{Render()}</div>
            </div>
        </FadeTransitions>
    )
}

export default DynaProInfo;