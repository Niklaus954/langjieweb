import { connect } from 'react-redux'
import { updateMemberInfo } from '../actions'
import SuperAuth from '../components/Service/SuperAuth.jsx'

const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => ({
    updateMemberInfo: data => dispatch(updateMemberInfo(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SuperAuth)