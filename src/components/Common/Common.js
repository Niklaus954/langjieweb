import CONFIG from '../../config'

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
        const param = query.split('&');
        const hashMapper = {};
        param.forEach((items, index) => {
            const key = items.split('=')[0];
            const value = items.split('=')[1];
            hashMapper[key] = value;
        });
        return hashMapper;
    },

    // 登陆后的处理
    loginCallBack: async (result, params) => {
        const { apiLogin, updateMemberInfo, history, redirectUrl } = params;
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
        }
    },

    // 客户服务菜单显示权限
    authSideMenuList: node => {
        if (node.auth) {
            if (Common.getAuthToken()) {
                // 判断该身份是否拥有这些菜单
                return true;
            } else {
                return false;
            }
        }
        return true;
    },

    // 根据知识库的内容转换成前端
    transToView: str => {
        if (str.indexOf('"class":"picture"') !== -1) {
            const objType = JSON.parse(str);
            let arr = [], value;
            if (objType instanceof Array) {
                value = objType[0].name;
                objType.forEach(items => arr.push(items.name));
            } else {
                value = objType.name;
                arr.push(value);
            }
            return {
                type: 'picture',
                value,
                valueArr: arr,
            };
        } else if (str.indexOf('"class":"video"') !== -1) {
            const objType = JSON.parse(str);
            let arr = [], value;
            if (objType instanceof Array) {
                value = objType[0].name;
                objType.forEach(items => arr.push(items.name));
            } else {
                value = objType.name;
                arr.push(value);
            }
            return {
                type: 'video',
                value,
                valueArr: arr,
            };
        } else {
            return {
                type: 'text',
                value: str,
            };
        }
    }
};

export default Common