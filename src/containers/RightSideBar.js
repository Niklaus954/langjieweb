import { connect } from 'react-redux'
import RightSideBar from '../components/Common/RightSideBar'
import { updateShowRightSideBar } from '../actions'

const mapStateToProps = state => ({
    showRightSideBar: state.showRightSideBar,
    selectedSideMenu: state.selectedSideMenu,
})

const mapDispatchToProps = dispatch => ({
    updateShowRightSideBar: data => dispatch(updateShowRightSideBar(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RightSideBar)