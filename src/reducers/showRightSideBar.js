const showRightSideBar = (state = false, action) => {
    switch (action.type) {
        case 'UPDATE_SHOW_RIGHT_SIDE_BAR':
            return action.data;
        default:
            return state
    }
}

export default showRightSideBar