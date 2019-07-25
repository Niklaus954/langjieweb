import { connect } from 'react-redux'
import TopMenuBar from '../components/Common/TopMenuBar'
import { showSideMenuBar, updateSideMenuList, updateSelectedSideMenu, updateSelectedSideName, updateSideBarExpand } from '../actions'

const mapStateToProps = state => ({
    sideMenuBar: state.showSideMenuBar,
    sideMenuList: state.sideMenuList,
    selectedSideMenu: state.selectedSideMenu,
    selectedSideName: state.selectedSideName,
})

const mapDispatchToProps = dispatch => ({
    showSideMenuBar: data => dispatch(showSideMenuBar(data)),
    updateSideMenuList: data => dispatch(updateSideMenuList(data)),
    updateSelectedSideMenu: data => dispatch(updateSelectedSideMenu(data)),
    updateSelectedSideName: data => dispatch(updateSelectedSideName(data)),
    updateSideBarExpand: data => dispatch(updateSideBarExpand(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TopMenuBar)