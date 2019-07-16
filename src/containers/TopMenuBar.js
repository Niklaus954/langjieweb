import { connect } from 'react-redux'
import TopMenuBar from '../components/Common/TopMenuBar'
import { showSideMenuBar } from '../actions'

const mapStateToProps = state => ({
    sideMenuBar: state.showSideMenuBar,
})

const mapDispatchToProps = dispatch => ({
    showSideMenuBar: data => dispatch(showSideMenuBar(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TopMenuBar)