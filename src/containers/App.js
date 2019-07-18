import { connect } from 'react-redux'
import App from '../components/App'

const mapStateToProps = state => ({
    selectedSideMenu: state.selectedSideMenu,
})

export default connect(
    mapStateToProps,
)(App)