const sideMenuList = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_SIDE_MENU_LIST':
            return action.data;
        default:
            return state
    }
}

export default sideMenuList