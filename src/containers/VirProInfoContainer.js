import { connect } from 'react-redux'
import VirProInfo from '../components/Solution/VirProInfo'
import { updateSideMenuList, updateSelectedSideMenu, updateSelectedSideName } from '../actions';
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
)(VirProInfo)