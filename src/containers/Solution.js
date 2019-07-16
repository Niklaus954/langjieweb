import { connect } from 'react-redux'
import { updateSideMenuList, updateSelectedSideMenu } from '../actions'
import Solution from '../components/Solution'

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
)(Solution)