import CONFIG from '../../config'

const Common = {
    jumpToIndex: params => {
        const { updateSelectedSideMenu, updateSelectedSideName } = params;
        updateSelectedSideMenu('');
        updateSelectedSideName(CONFIG.defaultIndexTitle);
    }
};

export default Common