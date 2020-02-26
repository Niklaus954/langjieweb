import React, { useEffect, useState} from 'react';
import Common from '../Common/Common'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import CONFIG from '../../config';
import apiAboutLangjie from '../../api/apiAboutLangjie';
import FadeTransitions from '../Common/FadeTransitions'
import ParagraphStyles from "../Common/ParagraphStyles";

const ActivityContent = state => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    const activityId = state.location.pathname.split('/')[state.location.pathname.split('/').length - 1]
    const [data, setData] = useState([])
    useEffect(() => {
        const fetch = async() => {
            const result = await apiAboutLangjie.fetchRecentActivityById({
                activityId: activityId
            })
            if(result.code === 200) setData(result.data)
        }
        fetch()
        updateSideMenu();
    },[])

    // 恢复侧边栏的显示
    const updateSideMenu = () => {
        const pagePath = state.location.pathname;
        let menuId;
        CONFIG.singlePage.forEach(items => {
            if (pagePath.indexOf(items.pathname) !== -1) {
                menuId = items.menuId;
            }
        });
        const { updateSideMenuList, updateSelectedSideMenu, updateSelectedSideName } = state;
        try {
            const result = Common.getSelectMenuInfo(CONFIG.menu, menuId);
            updateSideMenuList(result.menuList);
            updateSelectedSideMenu(result.item.pathname);
            updateSelectedSideName(result.item.text);
        } catch (e) {
            
        }
    }

    return(
        <FadeTransitions>
            <div style={{padding: isPc ? "20px 40px" : "20px", overflow:'auto', background: '#fff'}}>
                <div>{ParagraphStyles.RenderTitle(data)}</div>
                <div>{ParagraphStyles.ContentStyles(ParagraphStyles.CommonContentRender(data))}</div>
            </div>
        </FadeTransitions>
    )
}


export default ActivityContent