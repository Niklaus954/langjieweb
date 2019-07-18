import { combineReducers } from 'redux'
import hotInfoList from './hotInfoList'
import sideMenuList from './sideMenuList'
import selectedSideMenu from './selectedSideMenu'
import showSideMenuBar from './showSideMenuBar'

export default combineReducers({
	hotInfoList,
	sideMenuList,
	selectedSideMenu,
	showSideMenuBar,
})