import fetchHotInfoList from '../api/fetchHotInfoList'

export const fetchHostInfoList = data => ({
	type: 'FETCH_HOT_INFO_LIST',
	data,
})

export const fetchHostInfoListAsync = () => {
	return async dispatch => {
		const result = await fetchHotInfoList(dispatch);
		dispatch(fetchHostInfoList(result));
	}
}

export const updateSideMenuList = data => ({
	type: 'UPDATE_SIDE_MENU_LIST',
	data,
})

export const updateSelectedSideMenu = data => ({
	type: 'UPDATE_SELECTED_SIDE_MENU',
	data,
})

export const updateSelectedSideName = data => ({
	type: 'UPDATE_SELECTED_SIDE_NAME',
	data,
})

export const showSideMenuBar = data => ({
	type: 'SHOW_SIDE_MENU_BAR',
	data,
})

export const updateSideBarExpand = data => ({
	type: 'UPDATE_SIDE_BAR_EXPAND',
	data,
})