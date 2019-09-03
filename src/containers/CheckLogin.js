import { connect } from 'react-redux'
import { updateSelectedSideName, updateMemberInfo } from '../actions'
import CheckLogin from '../components/Common/CheckLogin.jsx'

const mapStateToProps = state => ({
    selectedSideName: state.selectedSideName,
})

const mapDispatchToProps = dispatch => ({
    updateSelectedSideName: data => dispatch(updateSelectedSideName(data)),
    updateMemberInfo: data => dispatch(updateMemberInfo(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CheckLogin)