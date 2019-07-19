import CONFIG from '../../config'

const Common = {
    routeInit: params => {
        const { updateSideMenuList, updateSelectedSideMenu, pathname, history, menuList } = params;
        // 获取选中的那个节点
        let tempPathName = pathname;
        // if (pathname === orderPathname) {
        //     tempPathName = menuList[0].pathname;
        //     history.push({
        //         pathname: tempPathName,
        //     });
        // }
        // 递归定位到最底层
        let selectedSideMenu;
        getUnderNode(menuList);
        try {
            updateSideMenuList(menuList);
            updateSelectedSideMenu(selectedSideMenu);
        } catch (e) {
            history.push({
                pathname: '/',
            });
        }

        function getUnderNode(menuList) {
            menuList.forEach((items, index) => {
                if (items.pathname === tempPathName) {
                    selectedSideMenu = items.pathname;
                } else if (items.subArr) {
                    getUnderNode(items.subArr);
                }
            });
        }
    },
    jumpToIndex: params => {
        const { updateSelectedSideMenu, updateSelectedSideName } = params;
        setTimeout(() => {
            updateSelectedSideMenu('');
            updateSelectedSideName(CONFIG.defaultIndexTitle);
        }, CONFIG.jumpDelay);
    }
};

export default Common