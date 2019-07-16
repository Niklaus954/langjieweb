const hotInfoList = (state = [
    {
        img: '图片1',
        text: '文字1',
    },
], action) => {
    switch (action.type) {
      case 'FETCH_HOT_INFO_LIST':
        return [
            {
                img: '图片1',
                text: '文字1',
            },
            {
                img: '图片2',
                text: '文字2',
            },
            {
                img: '图片3',
                text: '文字3',
            },
            {
                img: '图片4',
                text: '文字4',
            },
        ];
      default:
        return state
    }
  }
  
  export default hotInfoList