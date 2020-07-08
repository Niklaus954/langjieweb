import React, { useEffect, useState} from 'react';
import Common from '../Common/Common'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import CONFIG from '../../config';
import apiAboutLangjie from '../../api/apiAboutLangjie';
import FadeTransitions from '../Common/FadeTransitions'
import ParagraphStyles from "../Common/ParagraphStyles";
import Button from '@material-ui/core/Button';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import Axios from 'axios';

const ReadingContent = state => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    const contentId = state.location.pathname.split('/')[state.location.pathname.split('/').length - 1]
    const [data, setData] = useState([])
    const [news, setNews] = useState([])
    const [newUrl, setNewUrl] = useState([])
    useEffect(() => {
        const fetch = async() => {
            const result = await apiAboutLangjie.fetchRecommendReadingById({
                contentId: contentId
            })
            if(result.code === 200) setData(result.data)
        }

        const fetchNewsItem = () => {
            Axios.get('/getToken/wx/getToken').then(res => {
                Axios({
                    method: "POST",
                    url:'/wxApi/cgi-bin/material/get_material?access_token='+res.data.access_token,
                    data: {
                        "media_id": contentId
                    }
                }).then(val => {
                    setNews(val.data['news_item'][0]['content'])
                    setNewUrl(val.data['news_item'][0]['url'])
                    console.log(val)
                })
            })
        }
        //fetch()
        fetchNewsItem()
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
            {/* <div style={{padding: isPc ? "20px 40px" : "20px", overflow:'auto', background: '#fff'}}>
                <div>{ParagraphStyles.RenderTitle(data)}</div>
                <div>{ParagraphStyles.ContentStyles(ParagraphStyles.CommonContentRender(data))}</div>
                <div style={{height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Button variant="outlined" color='primary' startIcon={<FormatListNumberedIcon/>} onClick={() => {console.log(state.history.goBack())}}>返回列表</Button></div>
            </div> */}
            <div style={{height: "100%", width: "100%"}}>
                <iframe src={newUrl}  height="98%" width="98%" frameBorder={0}></iframe>
            </div>
        </FadeTransitions>
    )
}


export default ReadingContent