const selectedSideMenu = (state = '', action) => {
    switch (action.type) {
        case 'UPDATE_SELECTED_SIDE_MENU':
            return action.data;
        default:
            return state
    }
}

export default selectedSideMenu