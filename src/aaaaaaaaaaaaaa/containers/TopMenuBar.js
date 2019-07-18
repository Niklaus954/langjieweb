import { connect } from 'react-redux'
import TopMenuBar from '../components/Common/TopMenuBar'
import { showSideMenuBar, updateSideMenuList, updateSelectedSideMenu } from '../actions'

const mapStateToProps = state => ({
    sideMenuBar: state.showSideMenuBar,
    sideMenuList: state.sideMenuList,
})

const mapDispatchToProps = dispatch => ({
    showSideMenuBar: data => dispatch(showSideMenuBar(data)),
    updateSideMenuList: data => dispatch(updateSideMenuList(data)),
    updateSelectedSideMenu: data => dispatch(updateSelectedSideMenu(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TopMenuBar)