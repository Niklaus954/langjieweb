import React, { useEffect, useState } from 'react';
import apiSolution from '../../api/apiSolution';
import FadeTransitions from '../Common/FadeTransitions';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CONFIG from '../../config';
import Common from '../Common/Common'

const VirProInfo = state => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    const [data, setData] = useState([])
    const virProType = state.location.pathname.split('/')[state.location.pathname.split('/').length - 1]
    useEffect(() => {
        const fetch = async() => {
            const result = await apiSolution.fetchVir()
            if(result.code === 200){
                result.data.forEach((item, index) => {
                    if(item['id'] == virProType) {
                        setData(item)
                    }
                })
            }
        }
        fetch()
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
    const Render = () => {

        if(data.length === 0) return
        const content = data.content;
        const resArr = []
        for(let key in content) {
            const arr = []
            if(typeof content[key] === 'string') {
                key = JSON.parse(content[key])
                resArr.push(<div key={key} style={{backgroundImage: `url(${CONFIG.url(`/img/gallery/${key['name']}`)})`, width:  "100%", height: 200,  backgroundSize:'contain', backgroundRepeat: "no-repeat", backgroundPosition:"center", cursor:"pointer" }} onLoad={() => {console.log(111)}}></div>)
            }else{
                resArr.push(<div key={key}><h3>{key}</h3></div>)
                content[key].forEach((item, index) => {
                    arr.push(<div key={index} style={{fontSize: isPc ? 16 : 14, textIndent: isPc ? 32 : 28, fontWeight: 400, lineHeight: 1.4, color: "#333"}}>
                        <div><p>{item}</p></div>
                    </div>)
                })
            }
            resArr.push(arr)
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

export default VirProInfo;