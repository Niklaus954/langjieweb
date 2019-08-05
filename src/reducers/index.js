import { combineReducers } from 'redux'
import hotInfoList from './hotInfoList'
import sideMenuList from './sideMenuList'
import selectedSideMenu from './selectedSideMenu'
import showSideMenuBar from './showSideMenuBar'
import selectedSideName from './selectedSideName'
import sideBarExpand from './sideBarExpand'
import showRightSideBar from './showRightSideBar'

export default combineReducers({
	hotInfoList,
	sideMenuList,
	selectedSideMenu,
	selectedSideName,
	showSideMenuBar,
	sideBarExpand,
	showRightSideBar,
})