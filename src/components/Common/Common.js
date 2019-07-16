const Common = {
    routeInit: params => {
        const { updateSideMenuList, updateSelectedSideMenu, pathname, orderPathname, history, menuList } = params;
        updateSideMenuList(menuList);
        let selectedMenu = menuList[0].subArr ? menuList[0].subArr[0].pathname : menuList[0].pathname;
        let selectedSideMenu;
        if (pathname === orderPathname) {
            selectedSideMenu = selectedMenu;
            history.push({
                pathname: selectedMenu,
            });
        } else {
            for (let i = 0; i < menuList.length; i++) {
                if (menuList[i].subArr) {
                    for (let j = 0; j < menuList[i].subArr.length; j++) {
                        if (pathname.indexOf(menuList[i].subArr[j].pathname) !== -1) {
                            selectedSideMenu = menuList[i].subArr[j].pathname;
                            break;
                        }
                    }
                } else {
                    if (pathname.indexOf(menuList[i].pathname) !== -1) {
                        selectedSideMenu = menuList[i].pathname;
                        break;
                    }
                }
            }
        }
        try {
            updateSelectedSideMenu(selectedSideMenu);
        } catch (e) {
            history.push({
                pathname: '/',
            });
        }
    }
};

export default Common