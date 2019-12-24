import AboutLangjie from './components/Home/AboutLangjie'
import WxPublicPlat from './components/Home/WxPublicPlat'
import Activity from './components/Home/Activity'
import EventRecord from './components/Home/EventRecord'
import ContactUs from './components/Home/ContactUs'
import ToolBox from './components/Solution/ToolBox'
import CtrlProducts from './components/Solution/CtrlProducts'
import ServerTeam from './components/Solution/ServerTeam'
import SecondryDevelop from './components/Solution/SecondryDevelop'
import Dyna from './components/Solution/Dyna'
import MaxTest from './components/Solution/MaxTest'
import DynaTest from './components/Solution/DynaTest'
import FlexuralCompression from './components/Solution/FlexuralCompression'
import ElectronicUniversal from './components/Solution/ElectronicUniversal'
import ElectroHydraulicUniversal from './components/Solution/ElectroHydraulicUniversal'
import DynamicFatigue from './components/Solution/DynamicFatigue'
import PressShear from './components/Solution/PressShear'
import ActionPlat from './components/Solution/ActionPlat'
import Application from './components/Solution/Application'
import CompleteCtrlSystem from './components/Solution/CompleteCtrlSystem'
import Cloud from './components/Service/Cloud'
import VirCard from './components/Service/VirCard'
import Repair from './components/Service/Repair'
import Contract from './components/Service/Contract'

const CONFIG = {
    // url: pathname => 'http://192.168.50.231:8090' + pathname,
    url: pathname => 'http://os.langjie.com:8090' + pathname,
    wxLoginAppid: 'wx1dbbbe221c943cd9',
    minDeviceWidthNum: 800,
    minDeviceWidth: '(min-width:800px)',
    indexPageMaxWidth: 1300,
    activeMenuColor: '#ffde03',
    defaultIndexTitle: '杭州朗杰测控技术开发有限公司',
    menu: [
        {
            id: -1,
            text: '关于朗杰',
            type: 'home',
            pathname: '/homePage',
            component: AboutLangjie,
            auth: false,
            subArr: [
                {
                    id: 1,
                    supId: -1,
                    text: '关于朗杰',
                    type: 'home',
                    pathname: '/home/aboutLangjie',     
                    component: AboutLangjie,               
                    auth: false,
                },
                {
                    id: 2,
                    supId: -1,
                    text: '推荐阅读',
                    type: 'home',
                    pathname: '/home/wxPublicPlat', 
                    component: WxPublicPlat,                   
                    auth: false,
                },
                {
                    id: 3,
                    supId: -1,
                    text: '近期活动',
                    type: 'home',
                    pathname: '/home/activity',
                    component: Activity,                        
                    auth: false,
                },
                {
                    id: 4,
                    supId: -1,
                    text: '大事记',
                    type: 'home',
                    pathname: '/home/eventRecord',   
                    component: EventRecord,                
                    auth: false,
                },
                {
                    id: 5,
                    supId: -1,
                    text: '联系我们',
                    type: 'home',
                    pathname: '/home/contactUs',  
                    component: ContactUs,                  
                    auth: false,
                },
            ],
        },
        {
            id: -2,
            text: '解决方案',
            type: 'solution',
            pathname: '/solutionPage',
            component: ActionPlat,
            auth: false,
            subArr: [
                {
                    id: 6,
                    supId: -2,
                    text: '安可迅平台',
                    type: 'solution',
                    pathname: '/solution/actionPlat',
                    component: ActionPlat,               
                    auth: false,
                    subArr: [
                        {
                            id: 7,
                            supId: 6,
                            text: '工具箱',
                            type: 'solution',
                            pathname: '/solution/toolBox',    
                            component: ToolBox,                        
                            auth: false,
                        },
                        {
                            id: 9,
                            supId: 6,
                            text: '服务团队',
                            type: 'solution',
                            pathname: '/solution/serverTeam',
                            component: ServerTeam,   
                            auth: false,
                        },
                        {
                            id: 10,
                            supId: 6,
                            text: '二次开发',
                            type: 'solution',
                            pathname: '/solution/secondryDevelop',
                            component: SecondryDevelop,   
                            auth: false,
                        },
                    ],
                },
                {
                    id: 8,
                    supId: -2,
                    text: '控制器产品',
                    type: 'solution',
                    pathname: '/solution/ctrlProducts',
                    component: CtrlProducts,   
                    auth: false,
                    subArr: [
                        {
                            id: 21,
                            supId: 8,
                            text: '代龙',
                            type: 'solution',
                            pathname: '/solution/dyna',
                            component: Dyna,               
                            auth: false,
                        },
                    ],
                },
                {
                    id: 11,
                    supId: -2,
                    text: '应用软件',
                    pathname: '/solution/application',
                    component: Application,   
                    auth: false,
                    type: 'solution',                    
                    subArr: [
                        {
                            id: 12,
                            supId: 11,
                            text: 'MaxTest',
                            pathname: '/solution/maxTest',
                            component: MaxTest,   
                            auth: false,
                            type: 'solution',                            
                        },
                        {
                            id: 13,
                            supId: 11,
                            text: 'DynaTest',
                            pathname: '/solution/dynaTest',
                            component: DynaTest,   
                            auth: false,
                            type: 'solution',                            
                        },
                    ],
                },
                {
                    id: 14,
                    supId: -2,
                    text: '成套测控系统',
                    pathname: '/solution/completeCtrlSystem',     
                    component: CompleteCtrlSystem,               
                    auth: false,
                    type: 'solution',
                    subArr: [
                        {
                            id: 15,
                            supId: 14,
                            text: '抗折抗压',
                            pathname: '/solution/flexuralCompression', 
                            component: FlexuralCompression,                              
                            auth: false,
                            type: 'solution',
                        },
                        {
                            id: 16,
                            supId: 14,
                            text: '电子万能',
                            pathname: '/solution/electronicUniversal',    
                            component: ElectronicUniversal,                         
                            auth: false,
                            type: 'solution',
                        },
                        {
                            id: 17,
                            supId: 14,
                            text: '电液万能',
                            pathname: '/solution/electroHydraulicUniversal', 
                            component: ElectroHydraulicUniversal,                             
                            auth: false,
                            type: 'solution',
                        },
                        {
                            id: 18,
                            supId: 14,
                            text: '动态疲劳',
                            pathname: '/solution/dynamicFatigue', 
                            component: DynamicFatigue,                                  
                            auth: false,
                            type: 'solution',
                        },
                        {
                            id: 19,
                            supId: 14,
                            text: '压剪',
                            pathname: '/solution/pressShear', 
                            component: PressShear,                           
                            auth: false,
                            type: 'solution',
                        },
                    ],
                },
            ],
        },
        {
            id: -3,
            text: '客户服务',
            type: 'service',
            pathname: '/servicePage',
            component: Cloud,
            auth: false,
            subArr: [
                {
                    id: 20,
                    supId: -3,
                    text: '维修查询',
                    pathname: '/service/repair',  
                    component: Repair,                          
                    auth: true,
                    type: 'service',
                },
                {
                    id: 22,
                    supId: -3,
                    text: '产品查询',
                    pathname: '/service/virCard',  
                    component: VirCard,                          
                    auth: true,
                    type: 'service',
                },
                {
                    id: 23,
                    supId: -3,
                    text: '合同查询',
                    pathname: '/service/contract',  
                    component: Contract,                          
                    auth: true,
                    type: 'service',
                },
            ],
        },
    ]
};

export default CONFIG;