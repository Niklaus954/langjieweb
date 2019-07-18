

const CONFIG = {
    // url: pathname => 'http://192.168.50.230:8090' + pathname,
    url: pathname => 'https://os.langjie.com' + pathname,
    minDeviceWidth: 800,
    indexPageMaxWidth: 1300,
    activeMenuColor: '#f60',
    jumpDelay: 100,
    menu: [
        {
            id: -1,
            text: '关于朗杰',
            type: 'home',
            pathname: '/home',
            subArr: [
                {
                    id: 1,
                    supId: -1,
                    text: '关于朗杰',
                    type: 'home',
                    pathname: '/home/aboutLangjie',                    
                },
                {
                    id: 2,
                    supId: -1,
                    text: '公众号',
                    type: 'home',
                    pathname: '/home/wxPublicPlat',                    
                },
                {
                    id: 3,
                    supId: -1,
                    text: '活动',
                    type: 'home',
                    pathname: '/home/activity',                    
                },
                {
                    id: 4,
                    supId: -1,
                    text: '大事记',
                    type: 'home',
                    pathname: '/home/eventRecord',                    
                },
                {
                    id: 5,
                    supId: -1,
                    text: '联系我们',
                    type: 'home',
                    pathname: '/home/contactUs',                    
                },
            ],
        },
        {
            id: -2,
            text: '解决方案',
            type: 'solution',
            pathname: '/solution',
            subArr: [
                {
                    id: 6,
                    supId: -2,
                    text: '安可迅平台',
                    type: 'solution',
                    pathname: '/solution/actionPlat',                    
                    subArr: [
                        {
                            id: 7,
                            supId: 6,
                            text: '工具箱',
                            type: 'solution',
                            pathname: '/solution/toolBox',                            
                        },
                        {
                            id: 8,
                            supId: 6,
                            text: '控制器产品',
                            type: 'solution',
                            pathname: '/solution/ctrlProducts',
                        },
                        {
                            id: 9,
                            supId: 6,
                            text: '服务团队',
                            type: 'solution',
                            pathname: '/solution/serverTeam',
                        },
                        {
                            id: 10,
                            supId: 6,
                            text: '二次开发',
                            type: 'solution',
                            pathname: '/solution/secondryDevelop',
                        },
                    ],
                },
                {
                    id: 11,
                    supId: -2,
                    text: '应用软件',
                    pathname: '/solution/application',
                    type: 'solution',                    
                    subArr: [
                        {
                            id: 12,
                            supId: 11,
                            text: 'MaxTest',
                            pathname: '/solution/maxTest',
                            type: 'solution',                            
                        },
                        {
                            id: 13,
                            supId: 11,
                            text: 'DynaTest',
                            pathname: '/solution/dynaTest',
                            type: 'solution',                            
                        },
                    ],
                },
                {
                    id: 14,
                    supId: -2,
                    text: '成套测控系统',
                    pathname: '/solution/completeCtrlSystem',                    
                    type: 'solution',
                    subArr: [
                        {
                            id: 15,
                            supId: 14,
                            text: '抗折抗压',
                            pathname: '/solution/flexuralCompression',                            
                            type: 'solution',
                        },
                        {
                            id: 16,
                            supId: 14,
                            text: '电子万能',
                            pathname: '/solution/electronicUniversal',                            
                            type: 'solution',
                        },
                        {
                            id: 17,
                            supId: 14,
                            text: '电液万能',
                            pathname: '/solution/electroHydraulicUniversal',                            
                            type: 'solution',
                        },
                        {
                            id: 18,
                            supId: 14,
                            text: '动态疲劳',
                            pathname: '/solution/dynamicFatigue',                            
                            type: 'solution',
                        },
                        {
                            id: 19,
                            supId: 14,
                            text: '压剪',
                            pathname: '/solution/pressShear',                            
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
            pathname: '/service',
            subArr: [
                {
                    id: 20,
                    supId: 14,
                    text: '云服务',
                    pathname: '/service/cloud',                            
                    type: 'service',
                },
            ],
        },
    ]
};

export default CONFIG;