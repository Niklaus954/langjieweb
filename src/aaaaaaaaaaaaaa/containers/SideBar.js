import { connect } from 'react-redux'
import SideBar from '../components/Common/SideBar'
import { updateSelectedSideMenu, showSideMenuBar } from '../actions'

const mapStateToProps = state => ({
    sideMenuList: state.sideMenuList,
    selectedSideMenu: state.selectedSideMenu,
    sideMenuBar: state.showSideMenuBar,
})

const mapDispatchToProps = dispatch => ({
    updateSelectedSideMenu: data => dispatch(updateSelectedSideMenu(data)),
    showSideMenuBar: data => dispatch(showSideMenuBar(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SideBar)