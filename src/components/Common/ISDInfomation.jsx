import React, { useEffect, useState } from 'react';
import { Popover, Typography, makeStyles } from '@material-ui/core'

const Isd_obj = {
    "英文名称": "DBF9",
    "中文名称": "九孔应变接口",
    "符号图": {
        "class": "picture",
        "value": "https://wx.langjie.com/img/notiClient/1589942132473.png"
    },
    "详图": {
        "class": "picture",
        "value": "https://wx.langjie.com/img/gallery/DBF接口详图.png"
    },
    "接线详图": {
        "class": "picture",
        "value": "https://wx.langjie.com/img/gallery/DBF9接口接线详图.png"
    },
    "接线表格": {
        "class": "table",
        "value": [
            ["信号名称","引线","说明"],
            ["GNDA","1","模拟地"],
            ["SIGNALA+","2","传感器信号A+"],
            ["SIGNALA-","3","传感器信号A-"],
            ["VCCA_5","4","模拟5V"],
            ["GND_E","5","屏蔽地"],
            ["/","6","悬空备用"],
            ["/","7","悬空备用"],
            ["/","8","悬空备用"],
            ["/","9","悬空备用"]
        ]
    },
    "典型连接": {
        "典型连接器件": "负荷传感器",
        "典型连接原理图": {
            "class": "picture",
            "value": "https://wx.langjie.com/img/gallery/DBF9接口接线详图.png"
        },
        "典型连接原理图标题": "四线制连接负荷传感器",
        "典型连接附注": [
            "1、典型连接附注1",
            "2、典型连接附注2",
            "3、典型连接附注3"
        ],
        "变化图": [
            {
                "变化原理图": {
                    "class": "picture",
                    "value": ""
                },
                "变化原理图标题": "六线制连接负荷传感器",
                "变化原理图附注": []
            }
        ]
    }
}

const useStyles = makeStyles(theme => ({
    popover: {
        pointerEvents: 'none'
    },
    paper: {
        padding: theme.spacing(1)
    }
}))

const ISDInfomation = () => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null)
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handlePopoverClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    
    const ParseJpack = (param) => {
        console.log(param)
        for (const key in param) {
            if (param.hasOwnProperty(key)) {
                const element = param[key];
                console.log(element)
            }
        }
    }

    const IsdComponent = () => {
        ParseJpack(Isd_obj)
    }

    //图片显示
    return(
        <div>
            <Typography
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            >鼠标移动到此显示</Typography>
            <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
                paper: classes.paper
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
            >
                <Typography>显示隐藏的内容</Typography>
            </Popover>
        </div>
    )

}

export default ISDInfomation