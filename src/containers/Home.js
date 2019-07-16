import { connect } from 'react-redux'
import { updateSideMenuList, updateSelectedSideMenu } from '../actions'
import Home from '../components/Home'

const mapStateToProps = state => ({
    sideMenuList: state.sideMenuList,
})

const mapDispatchToProps = dispatch => ({
    updateSideMenuList: data => dispatch(updateSideMenuList(data)),
    updateSelectedSideMenu: data => dispatch(updateSelectedSideMenu(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home)