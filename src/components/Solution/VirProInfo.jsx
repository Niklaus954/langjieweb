import React, { useEffect, useState } from 'react';
import apiSolution from '../../api/apiSolution';
import FadeTransitions from '../Common/FadeTransitions';
import { useMediaQuery } from '@material-ui/core';
import CONFIG from '../../config';
import Common from '../Common/Common';
import { AbTabs, ProductCarousel, ProductTitle } from '../Common/BaseComp';

const VirProInfo = state => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    const [data, setData] = useState([])
    const [hardInfo, setHardInfo] = useState([])
    const [resourceDownload, setResourceDownload] = useState([])
    const virProType = state.location.pathname.split('/')[state.location.pathname.split('/').length - 1];
    const keyObj = {
        "proName":"名称",
        "proIntroduce": "介绍",
        "proAlbum": "图片",
        "hardInterface": "硬件接口"
    }
    useEffect(() => {
        const fetch = async() => {
            const result = await apiSolution.fetchVir()
            if(result.code === 200){
                result.data.forEach((item, index) => {
                    if(item['id'] == virProType) {
                        setHardInfo(item['content'][keyObj.hardInterface])
                        setData(item)
                        if(item['link'].length === 0) return
                        const linkContent = result.data.filter(items => items.id == item['link'][0])[0]['content']
                        const resourceArr = []
                        try {
                            (async() => {
                                for(let key in linkContent) {
                                    for(let i = 0; i < linkContent[key].length; i++) {
                                        if(linkContent[key][i].length !== 0) {
                                            const result = await apiSolution.fetchResourceDownload(linkContent[key][i])
                                            if(result.code === 200) {
                                               // result.data[0].softName = linkContent[key][i]
                                               
                                                resourceArr.push(Object.assign({
                                                    softName: linkContent[key][i]
                                                }, result.data))
                                            }
                                        }
                                    }
                                }
                            })().then(() => {
                                setResourceDownload(resourceArr)
                            })
                            
                        } catch (error) {
                            
                        }    
                    }
                })
            }
        }
        fetch()
        updateSideMenu()
    }, [virProType])

    // 恢复侧边栏的显示
    const updateSideMenu = () => {
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

    const RenderContent = () => {
        if(data.length === 0) return
        const content = data.content;
        const resArr = []
        var tabs = []
        for(let key in content) {
            const val = Common.transToView(content[key])
            if(key === keyObj.proName) {
                resArr.push(<ProductTitle key="productTitle">{val}</ProductTitle>)
            }else if(key === keyObj.proAlbum) {
                resArr.push(<div key="carousel" >
                    <ProductCarousel
                    history={state} 
                    proIntroduce={content[keyObj.proIntroduce]} 
                    hardInfo={hardInfo}
                    >{val}</ProductCarousel>
                </div>)
            }else {
                tabs.push({
                    key: key,
                    content: val
                })
            }
        }
        resArr.push(<AbTabs key="abTabs" resourceDownload={resourceDownload}>{tabs}</AbTabs>)
        return resArr
    }
    return(
        <FadeTransitions>
            <div style={{padding: isPc ? "20px 40px" : "10px", overflow:'auto', background: "#fff", width: "100%"}}>
                <div>{RenderContent()}</div>
            </div>
        </FadeTransitions>
    )
}

export default VirProInfo;