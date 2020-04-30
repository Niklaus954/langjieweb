import { connect } from 'react-redux'
import { updateSelectedSideMenu, updateSelectedSideName, updateSideMenuList } from '../actions'
import Shop from '../components/Shop'

const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => ({
    updateSelectedSideMenu: data => dispatch(updateSelectedSideMenu(data)),
    updateSelectedSideName: data => dispatch(updateSelectedSideName(data)),
    updateSideMenuList: data => dispatch(updateSideMenuList(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Shop)