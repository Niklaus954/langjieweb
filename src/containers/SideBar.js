import { connect } from 'react-redux'
import SideBar from '../components/Common/SideBar'
import { updateSelectedSideMenu, showSideMenuBar, updateSelectedSideName, updateSideBarExpand } from '../actions'

const mapStateToProps = state => ({
    sideMenuList: state.sideMenuList,
    selectedSideMenu: state.selectedSideMenu,
    sideMenuBar: state.showSideMenuBar,
    selectedSideName: state.selectedSideName,
    sideBarExpand: state.sideBarExpand,
})

const mapDispatchToProps = dispatch => ({
    updateSelectedSideMenu: data => dispatch(updateSelectedSideMenu(data)),
    showSideMenuBar: data => dispatch(showSideMenuBar(data)),
    updateSelectedSideName: data => dispatch(updateSelectedSideName(data)),
    updateSideBarExpand: data => dispatch(updateSideBarExpand(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SideBar)