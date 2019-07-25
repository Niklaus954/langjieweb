const showSideMenuBar = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_SIDE_BAR_EXPAND':
            return action.data;
        default:
            return state
    }
}

export default showSideMenuBar