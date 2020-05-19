import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CONFIG from '../../config';
import apiLogin from '../../api/apiLogin';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, IconButton, useMediaQuery } from '@material-ui/core';
import { Menu as MenuIcon, Search as SearchIcon } from '@material-ui/icons';


const keywordsPool = {
    // '10月27日': { weight: 1, href: '/home/eventRecord' },
    // '在济南舜和国际酒店隆重召开': { weight: 1, href: '/home/contactUs' },
    // '朗杰': { weight: 1, href: '/home/aboutLangjie' },
};

const translateKeywords = ["安可迅"];

let SIDEMENUIDARR = [];

const Common = {
    // 跳转到首页
    jumpToIndex: params => {
        const { updateSelectedSideMenu, updateSelectedSideName, updateSideBarExpand } = params;
        updateSelectedSideMenu('');
        updateSelectedSideName(CONFIG.defaultIndexTitle);
        updateSideBarExpand([]);
    },

    // 获取不带?的pathname
    getPathName: pathname => pathname.split('?')[0],

    // 获取token
    getAuthToken: () => {
        let payload;
        try {
            payload = JSON.parse(localStorage.getItem('lj_token'));
            const { lj_token, endDate } = payload;
            if (Date.now() > endDate) {
                return null;
            } else {
                return lj_token;
            }
        } catch (error) {
            return null;
        }
    },
    
    // 获取get的参数对象
    getLocationParamMapper: search => {
        const query = search.split('?')[1];
        try {
            const param = query.split('&');
            const hashMapper = {};
            param.forEach((items, index) => {
                const key = items.split('=')[0];
                const value = items.split('=')[1];
                hashMapper[key] = value;
            });
            return hashMapper;
        } catch (e) {
            return {
                path: '/index',
            };
        }
    },

    // 登陆后的处理
    loginCallBack: async (result, params) => {
        const { apiLogin, updateMemberInfo, history, redirectUrl, location } = params;
        if (result.code === 200) {
            const data = {
                lj_token: result.data.lj_token,
                endDate: result.data.endDate,
                unionid: result.data.unionid,
            };
            localStorage.setItem('lj_token', JSON.stringify(data));
            // 根据unionid获取会员基本信息
            const memberInfo = await apiLogin.fetchMemberInfo({ unionid: result.data.unionid });
            localStorage.setItem('lj_member_info', JSON.stringify(memberInfo.data));
            updateMemberInfo(memberInfo.data);

            history.push(redirectUrl);
            Common.refreshSideMenuAuth(history, { pathname: redirectUrl });
        }
    },

    refreshSideMenuAuth: async (history, location) => {
        if (Common.getAuthToken()) {
            const result = await apiLogin.refreshSideMenuAuth();
            SIDEMENUIDARR = result.data;
            const path = location.pathname === '/' ? '/index' : location.pathname;
            history.push({
                pathname: path,
            });
        }
    },

    // 客户服务菜单显示权限
    authSideMenuList: node => {
        if (node.auth) {
            if (Common.getAuthToken()) {
                // 判断该身份是否拥有这些菜单
                if (SIDEMENUIDARR.indexOf(node.id) !== -1) return true;
                return false;
            } else {
                return false;
            }
        }
        return true;
    },

    // 关键字超链接
    keywordsLink: (str, existKeyPool) => {
        for (const keywords in keywordsPool) {
            const index = str.indexOf(keywords);
            if (index !== -1 && existKeyPool.indexOf(keywords) === -1) {
                existKeyPool.push(keywords);
                const firstBlock = str.slice(0, index);
                const linkBlock = <Link to={keywordsPool[keywords].href}>{keywords}</Link>;
                const endBlock = str.slice(index + keywords.length, str.length);
                return <span>{firstBlock}{linkBlock}{endBlock}</span>;
            }
        }
        return str;
    },

    // 根据知识库的内容转换成前端
    transToView: (str, existKeyPool) => {
        existKeyPool = existKeyPool === undefined ? [] : existKeyPool;
        if (typeof str === 'string') {
            if (str.indexOf('"class":"picture"') !== -1) {
                let objType;
                try {
                    objType = JSON.parse(str);
                } catch (e) {
                    str = str.match(/{(\S*)}/ig)[0];
                    objType = JSON.parse(str);
                }
                return {
                    type: 'picture',
                    value: objType.name,
                    valueArr: [objType.name],
                };
            } else if (str.indexOf('"class":"video"') !== -1) {
                let objType;
                try {
                    objType = JSON.parse(str);
                } catch (e) {
                    str = str.match(/{(\S*)}/ig)[0];
                    objType = JSON.parse(str);
                }
                return {
                    type: 'video',
                    value: objType.name,
                    valueArr: [objType.name],
                };
            } else {
                str = Common.keywordsLink(str, existKeyPool);
                return {
                    type: 'text',
                    value: str,
                    valueArr: [ str ],
                };
            }
        } else {
            if (str[0].indexOf('"class":"picture"') !== -1) {
                const valueArr = str.map(items => {
                    return JSON.parse(items).name;
                });
                return {
                    type: 'picture',
                    value: valueArr[0],
                    valueArr,
                };
            } else if (str[0].indexOf('"class":"video"') !== -1) {
                const valueArr = str.map(items => {
                    return JSON.parse(items).name;
                });
                return {
                    type: 'video',
                    value: valueArr[0],
                    valueArr,
                };
            } else {
                str = str.map(items => Common.keywordsLink(items, existKeyPool));
                return {
                    type: 'text',
                    value: str[0],
                    valueArr: str,
                };
            }
        }
    },

    // 根据知识库的内容转换成前端（整篇）
    transToViewAll: contentObj => {
        const existKeyPool = [];
        const resArr = [];
        for (const key in contentObj) {
            resArr.push(Common.transToView(contentObj[key], existKeyPool));
        }
        return resArr;
    },

    // 单页恢复侧边栏显示
    getSelectMenuInfo: (arr, menuId, rootId) => {
        // console.log(arr)
        // console.log(111)
        // //console.log(menuId)
        // for (let i = 0; i < arr.length; i++) {
        //     if (arr[i].id === menuId) {
        //         return {
        //             item: arr[i],
        //             menuList: arr,
        //         };
        //     }
        //     if (arr[i].subArr) {
        //         const r = Common.getSelectMenuInfo(arr[i].subArr, menuId);
        //         if (r) return r;
        //     }
        // }
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === menuId) {
                return {
                    item: arr[i],
                    menuList: rootId ? CONFIG.menu.filter(items => items.id === rootId)[0].subArr : arr,
                };
            }
            if (arr[i].subArr) {
                const r = Common.getSelectMenuInfo(arr[i].subArr, menuId, rootId);
                if (r) return r;
            }
        }
    },

    //关键字中英文翻译处理
    transKeyword: (content) => {
        translateKeywords.map((keyword, wordIndex) => {
            if(content.indexOf(keyword) !== -1){
                //关键字翻译所需
                let dom = <div style={{display: 'flex'}}><div>{keyword}</div><div>{content.split(keyword)[content.split(keyword).length - 1]}</div></div>;
                this.transSpecialCode(dom)
            }else{
                this.transSpecialCode(content)
            }
        })
    },

    //处理特殊字符®
    transSpecialCode: (specialWord) => {
    
        let dom = specialWord
        let transDom = JSON.stringify(dom)
        if(transDom.indexOf('®') !== -1) {
            return(
                <div style={{display: 'flex'}}><div>{specialWord.split('®')[0]}</div><div><sup>®</sup></div><div>{specialWord.split('®')[specialWord.split('®').length - 1]}</div></div>
            )
        }else{
            return specialWord
        }
    },

    //朗杰服务 产品、维修、合同搜索框
    SearchBarComponent:(children) =>{
        
        const useStyles = makeStyles(theme => ({
            root: {
                padding: "2px 4px",
                display: 'flex',
                alignItems: 'center',
                border: "#3F51B5 1px solid"
            },
            container: {
                maxHeight: 540,
            },
            input: {
                marginLeft: theme.spacing(1),
                flex: 1
            },
            IconButton: {
                padding: 10
            },
            divider: {
                height: 28, 
                margin: 4
            }
        }))
        const classes = useStyles()
        const isPc = useMediaQuery(CONFIG.minDeviceWidth)
        const [inputVal, setInputVal] = useState()

        const fetch = async () => {
            const result = await children.searchFetch({
                keywords: inputVal
            })

            console.log(result)
        }
        const searchFetch = () => {
            fetch()
            //产品、 维修、 合同查询搜索接口
        }

        const type = (child) =>{
            if(child.serviceType === 'VirCard') {
                return ("请输入产品序列号、型号")
            }else if(child.serviceType === 'Repair') {
                return ('请输入维修单号')
            }else if(child.serviceType === 'Contract'){
                return ('请输入合同编号')
            }
        }

        return(
            <div>
                <Paper component="form" className={classes.root} style={{margin: isPc ? "30px 20px": "10px"}}>
                    {/* <IconButton className={classes.IconButton} aria-label="menu">
                        <MenuIcon/>
                    </IconButton> */}
                    <InputBase
                    className={classes.input}
                    placeholder={type(children)}
                    onChange={ e => setInputVal(e.target.value)}
                    />
                    <IconButton type="submit" className={classes.IconButton} aria-label="search" onClick={searchFetch}><SearchIcon/></IconButton>
                </Paper>
            </div>
        )
    }
};



export default Common