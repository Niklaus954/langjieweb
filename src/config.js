import React from 'react'
import SendIcon from '@material-ui/icons/Send'

const CONFIG = {
    minDeviceWidth: 600,
    activeMenuColor: '#f60',
    homeMenu: [
        {
            id: 1,
            text: '关于朗杰',
            pathname: '/home/aboutLangjie',
            icon: <SendIcon />,
        },
        {
            id: 2,
            text: '公众号',
            pathname: '/home/wxPublicPlat',
            icon: <SendIcon />,
        },
        {
            id: 3,
            text: '活动',
            pathname: '/home/activity',
            icon: <SendIcon />,
        },
        {
            id: 4,
            text: '大事记',
            pathname: '/home/eventRecord',
            icon: <SendIcon />,
        },
        {
            id: 5,
            text: '联系我们',
            pathname: '/home/contactUs',
            icon: <SendIcon />,
        },
    ],
    solutionMenu: [
        {
            id: 6,
            text: '安可迅平台',
            pathname: '/solution/actionPlat',
            icon: <SendIcon />,
            subArr: [
                {
                    id: 7,
                    text: '工具箱',
                    pathname: '/solution/toolBox',
                    icon: <SendIcon />,
                },
                {
                    id: 8,
                    text: '控制器产品',
                    pathname: '/solution/ctrlProducts',
                    icon: <SendIcon />,
                },
                {
                    id: 9,
                    text: '服务团队',
                    pathname: '/solution/serverTeam',
                    icon: <SendIcon />,
                },
                {
                    id: 10,
                    text: '二次开发',
                    pathname: '/solution/secondryDevelop',
                    icon: <SendIcon />,
                },
            ],
        },
        {
            id: 11,
            text: '应用软件',
            pathname: '/solution/application',
            icon: <SendIcon />,
            subArr: [
                {
                    id: 12,
                    text: 'MaxTest',
                    pathname: '/solution/maxTest',
                    icon: <SendIcon />,
                },
                {
                    id: 13,
                    text: 'DynaTest',
                    pathname: '/solution/dynaTest',
                    icon: <SendIcon />,
                },
            ],
        },
        {
            id: 14,
            text: '成套测控系统',
            pathname: '/solution/completeCtrlSystem',
            icon: <SendIcon />,
            subArr: [
                {
                    id: 15,
                    text: '抗折抗压',
                    pathname: '/solution/flexuralCompression',
                    icon: <SendIcon />,
                },
                {
                    id: 16,
                    text: '电子万能',
                    pathname: '/solution/electronicUniversal',
                    icon: <SendIcon />,
                },
                {
                    id: 17,
                    text: '电液万能',
                    pathname: '/solution/electroHydraulicUniversal',
                    icon: <SendIcon />,
                },
                {
                    id: 18,
                    text: '动态疲劳',
                    pathname: '/solution/dynamicFatigue',
                    icon: <SendIcon />,
                },
                {
                    id: 19,
                    text: '压剪',
                    pathname: '/solution/pressShear',
                    icon: <SendIcon />,
                },
            ],
        },
    ],
};

export default CONFIG;