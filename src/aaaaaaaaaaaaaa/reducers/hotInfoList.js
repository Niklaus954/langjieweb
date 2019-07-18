const hotInfoList = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_HOT_INFO_LIST':
            return action.data;
        default:
            return state
    }
}

export default hotInfoList