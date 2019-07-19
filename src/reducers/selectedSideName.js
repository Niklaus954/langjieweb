import CONFIG from '../config'

const selectedSideName = (state = CONFIG.defaultIndexTitle, action) => {
    switch (action.type) {
        case 'UPDATE_SELECTED_SIDE_NAME':
            return action.data;
        default:
            return state
    }
}

export default selectedSideName