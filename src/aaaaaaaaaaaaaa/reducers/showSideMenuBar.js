const showSideMenuBar = (state = false, action) => {
    switch (action.type) {
        case 'SHOW_SIDE_MENU_BAR':
            return action.data;
        default:
            return state
    }
}

export default showSideMenuBar