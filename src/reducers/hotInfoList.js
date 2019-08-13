const hotInfoList = (state = [
    {
        img: 'loading.gif',
        text: '加载中...',
    },
    {
        img: 'loading.gif',
        text: '加载中...',
    },
], action) => {
    switch (action.type) {
        case 'FETCH_HOT_INFO_LIST':
            return action.data;
        default:
            return state;
    }
}

export default hotInfoList