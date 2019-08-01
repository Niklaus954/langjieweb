import { connect } from 'react-redux'
import { updateSelectedSideName } from '../actions'
import Login from '../components/Common/Login.jsx'

const mapStateToProps = state => ({
    selectedSideName: state.selectedSideName,
})

const mapDispatchToProps = dispatch => ({
    updateSelectedSideName: data => dispatch(updateSelectedSideName(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login)