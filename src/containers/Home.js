import { connect } from 'react-redux'
import { updateSideMenuList, updateSelectedSideMenu, updateSideBarExpand, updateSelectedSideName } from '../actions'
import Home from '../components/Home'

const mapStateToProps = state => ({
    sideMenuList: state.sideMenuList,
    selectedSideMenu: state.selectedSideMenu,
    sideBarExpand: state.sideBarExpand,
})

const mapDispatchToProps = dispatch => ({
    updateSideMenuList: data => dispatch(updateSideMenuList(data)),
    updateSelectedSideMenu: data => dispatch(updateSelectedSideMenu(data)),
    updateSideBarExpand: data => dispatch(updateSideBarExpand(data)),
    updateSelectedSideName: data => dispatch(updateSelectedSideName(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home)