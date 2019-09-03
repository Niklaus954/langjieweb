import { connect } from 'react-redux'
import { updateSelectedSideMenu, updateSideBarExpand, updateSelectedSideName } from '../actions'
import Index from '../components/Index'

const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => ({
    updateSelectedSideMenu: data => dispatch(updateSelectedSideMenu(data)),
    updateSideBarExpand: data => dispatch(updateSideBarExpand(data)),
    updateSelectedSideName: data => dispatch(updateSelectedSideName(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Index)