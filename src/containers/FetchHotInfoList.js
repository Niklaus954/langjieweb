import { connect } from 'react-redux'
import { fetchHostInfoListAsync } from '../actions'
import HotInfoList from '../components/Index/HotInfoList'

const mapStateToProps = state => ({
    hotInfoList: state.hotInfoList,
})

const mapDispatchToProps = dispatch => ({
    fetchHostInfoList: () => dispatch(fetchHostInfoListAsync())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotInfoList)