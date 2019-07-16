import React, { Component } from 'react';
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom'
import TopMenuBar from '../containers/TopMenuBar'
import ToolBox from './Solution/ToolBox'
import CtrlProducts from './Solution/CtrlProducts'
import ServerTeam from './Solution/ServerTeam'
import SecondryDevelop from './Solution/SecondryDevelop'
import MaxTest from './Solution/MaxTest'
import DynaTest from './Solution/DynaTest'
import FlexuralCompression from './Solution/FlexuralCompression'
import ElectronicUniversal from './Solution/ElectronicUniversal'
import ElectroHydraulicUniversal from './Solution/ElectroHydraulicUniversal'
import DynamicFatigue from './Solution/DynamicFatigue'
import PressShear from './Solution/PressShear'
import SideBar from '../containers/SideBar'
import CONFIG from '../config'
import Common from './Common/Common'

class Solution extends Component {

    componentDidMount() {
        const { updateSideMenuList, updateSelectedSideMenu } = this.props;
        Common.routeInit({
            updateSideMenuList,
            updateSelectedSideMenu,
            pathname: this.props.location.pathname,
            orderPathname: '/solution',
            history: this.props.history,
            menuList: CONFIG.solutionMenu,
        });
    }

    render() {
        return (
            <Router>
                <div>
                    <TopMenuBar selectedMenu={'solution'} />
                    <div style={{ display: 'flex' }}>
                        <SideBar />
                        <div>
                            <Route path="/solution/toolBox" component={ToolBox} />
                            <Route path="/solution/ctrlProducts" component={CtrlProducts} />
                            <Route path="/solution/serverTeam" component={ServerTeam} />
                            <Route path="/solution/secondryDevelop" component={SecondryDevelop} />
                            <Route path="/solution/maxTest" component={MaxTest} />
                            <Route path="/solution/dynaTest" component={DynaTest} />
                            <Route path="/solution/flexuralCompression" component={FlexuralCompression} />
                            <Route path="/solution/electronicUniversal" component={ElectronicUniversal} />
                            <Route path="/solution/electroHydraulicUniversal" component={ElectroHydraulicUniversal} />
                            <Route path="/solution/dynamicFatigue" component={DynamicFatigue} />
                            <Route path="/solution/pressShear" component={PressShear} />
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default Solution