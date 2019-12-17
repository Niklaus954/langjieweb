let lj_member_info;
try {
    lj_member_info = JSON.parse(localStorage.getItem('lj_member_info'));
    if (!lj_member_info) lj_member_info = {};
} catch (error) {
    lj_member_info = {};
}
const memberInfo = (state = lj_member_info, action) => {
    switch (action.type) {
        case 'UPDATE_MEMBER_INFO':
            return action.data;
        default:
            return state;
    }
}

export default memberInfo