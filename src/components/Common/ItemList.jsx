import React, { Component, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import '../../public/css/hoverStyle.css';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, IconButton, useMediaQuery, Button, Divider, Snackbar } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import CONFIG from '../../config';
import apiService from '../../api/apiService';
import { ListView } from 'antd-mobile';
import { Alert } from '@material-ui/lab';
var that

    //朗杰服务 产品、维修、合同搜索框
   function SearchBarComponent (children){
        const useStyles = makeStyles(theme => ({
            root: {
                padding: "2px 4px",
                display: 'flex',
                alignItems: 'center',
                border: "#3F51B5 1px solid"
            },
            container: {
                maxHeight: 540,
            },
            input: {
                marginLeft: theme.spacing(1),
                flex: 1
            },
            IconButton: {
                padding: 10
            },
            divider: {
                height: 28, 
                margin: 4
            }
        }))
        const classes = useStyles()
        const isPc = useMediaQuery(CONFIG.minDeviceWidth)
        const [inputVal, setInputVal] = useState()
        const searchFetch = () => {
            children.searchInput(inputVal)
            //产品、 维修、 合同查询搜索接口
        }

        const resetSearchVal = () => {
            children.resetSearchInput()
            setInputVal("")
            document.getElementById('input').value = ''
        }
        const type = (child) =>{
            if(child.serviceType === 'VirCard') {
                return ("请输入产品序列号、型号")
            }else if(child.serviceType === 'Repair') {
                return ('请输入维修单号')
            }else if(child.serviceType === 'Contract'){
                return ('请输入合同编号')
            } else if (child.serviceType === 'CloudDisk') {
                return ('请输入文件类型')
            }
        }

        return(
            <div style={{margin: isPc ? "30px 20px": "10px"}}>
                <Paper component="form" className={classes.root}>
                    <InputBase
                    id="input"
                    className={classes.input}
                    placeholder={type(children.children)}
                    onChange={ e => setInputVal(e.target.value)}
                    />
                    {/* <IconButton type="submit"  className={classes.IconButton} aria-label="search" onClick={searchFetch}></IconButton> */}
                    <Button className={classes.IconButton} onClick={searchFetch}><SearchIcon/></Button>
                    <Divider orientation="vertical" className={classes.divider} />
                    <Button variant="text" color="primary" onClick={resetSearchVal}>重置</Button>
                </Paper>
            </div>
        )
    }
    //文件类型图表
    function IconSuffixName(suffixName) {
        if (['.xlsx, .xls'].indexOf(suffixName) !== -1) {
            return <svg t="1608517924083" className="icon" style={{width: 60, height: 60}}  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8172" width="200" height="200"><path d="M0 146.176C0 65.444571 65.609143 0 146.176 0h731.648C958.555429 0 1024 65.609143 1024 146.176v731.648C1024 958.555429 958.390857 1024 877.824 1024H146.176C65.444571 1024 0 958.390857 0 877.824V146.176z m352.420571 207.725714l123.684572 168.155429L336.438857 713.142857h93.110857l90.331429-132.717714L609.517714 713.142857h93.110857l-139.666285-191.085714 123.684571-168.155429h-92.416l-74.349714 109.787429-75.044572-109.787429h-92.416z" fill="#5DCDA7" p-id="8173"></path></svg>
        } else if (['.doc','.docx'].indexOf(suffixName) !== -1) {
            return <svg t="1608518019221" className="icon" style={{width: 60, height: 60}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8306" width="200" height="200"><path d="M0 0m51.2 0l921.6 0q51.2 0 51.2 51.2l0 921.6q0 51.2-51.2 51.2l-921.6 0q-51.2 0-51.2-51.2l0-921.6q0-51.2 51.2-51.2Z" fill="#65A5FF" p-id="8307"></path><path d="M237.7216 329.147733l103.424 365.704534h89.941333l64.6656-227.4304 58.368 227.4304h98.4064l133.751467-365.704534h-90.1632l-87.296 232.0896-58.88-232.106666h-99.754667l-65.297066 232.106666-55.296-232.106666z" fill="#FFFFFF" p-id="8308"></path></svg>
        } else if (['.ppt','.pptx'].indexOf(suffixName) !== -1) {
            return <svg t="1608518085142" className="icon" style={{width: 60, height: 60}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8579" width="200" height="200"><path d="M899.102424 1023.199375H124.096951C56.444097 1023.199375 0.800625 967.956216 0.800625 899.903049V125.297889C1.200938 57.645035 56.444097 2.001564 124.096951 2.001564h775.005473c67.652854 0 123.296325 55.243159 123.296325 123.296325v775.005473c0 67.652854-55.643471 122.896013-123.296325 122.896013z" fill="#EC5840" p-id="8580"></path><path d="M540.021892 249.795152c107.684128 0 161.726349 46.035966 161.726349 138.107897 0 92.472244-54.442533 139.308835-162.126662 139.308835h-137.307271v191.749805H348.272088V249.795152h191.749804zM401.913995 480.375293h134.905395c38.029711 0 65.65129-8.006255 84.065676-22.817826 17.613761-15.211884 26.820954-38.029711 26.820954-69.654418 0-31.624707-9.207193-54.442533-27.621579-68.453479-18.414386-15.612197-46.035966-22.817826-83.265051-22.817826h-134.905395V480.375293z" fill="#FFFFFF" p-id="8581"></path></svg>
        } else if (['.pdf'].indexOf(suffixName) !== -1) {
            return <svg t="1608518165608" className="icon" style={{width: 60, height: 60}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8714" width="200" height="200"><path d="M163.045 58.955h696.844c52.656 3.361 97.637 48.961 99.822 101.732v693.865c-3.304 51.706-47.053 95.737-98.588 99.828h-697.07c-51.703-3.36-95.565-47.058-99.766-98.595V158.951c3.419-51.82 47.112-95.907 98.758-99.996zM833.233 580.9c-13.267-12.761-42.702-19.791-87.617-20.394-35.266 0-70.43 2.512-105.3 7.635a267.648 267.648 0 0 1-48.732-33.26 350.401 350.401 0 0 1-88.015-134.736c1.304-4.925 2.208-9.243 3.415-13.668 0 0 21.102-118.158 15.473-157.246a45.126 45.126 0 0 0-2.714-11.451l-1.81-4.726c-4.921-15.071-18.688-25.52-34.564-26.022H472.82a38.977 38.977 0 0 0-39.99 24.718c-13.065 45.616 0.202 115.245 24.213 205.07l-6.026 14.571c-17.082 41.094-38.586 82.392-57.474 119.067l-2.512 4.72c-17.182 33.362-35.369 66.217-54.362 98.568l-16.875 8.743c-1.305 0-30.144 15.675-37.077 19.797-57.774 33.758-95.957 72.443-102.183 102.99a25.168 25.168 0 0 0 9.647 28.032l16.376 8.036c7.03 3.415 14.668 5.226 22.504 5.123 41.099 0 89.825-50.537 154.537-163.276a1545.272 1545.272 0 0 1 237.827-55.664c53.05 30.647 112.33 49.134 173.42 54.158 6.835 0.103 13.768-0.603 20.4-2.208 8.141-1.907 15.373-6.834 20.195-13.666a71.17 71.17 0 0 0 7.639-49.434 33.413 33.413 0 0 0-9.847-16.578v1.1zM219.82 796.223a281.337 281.337 0 0 1 81.09-95.454c2.713-2.211 9.443-8.54 15.67-14.37-46.015 72.145-76.562 100.88-96.76 109.824z m259.637-589.094c13.261 0 20.694 32.754 22.504 63.603a129.095 129.095 0 0 1-15.676 67.42c-7.433-27.834-11.052-56.574-11.052-85.308 0-0.099-1.806-45.715 4.224-45.715z m-77.473 419.992c9.25-16.177 18.692-33.26 28.538-51.447 18.888-34.862 35.569-70.939 50.037-107.811a356.808 356.808 0 0 0 82.693 101.08l13.06 10.15c-59.378 10.951-117.658 27.029-174.33 47.826v0.202z m418.386-3.617c-7.132 2.81-14.767 4.117-22.504 4.018a274.642 274.642 0 0 1-95.454-28.535 838.003 838.003 0 0 1 44.91-1.81c18.491-1.006 36.978 0.903 54.763 5.828 22.505 5.829 23.815 17.987 19.791 20.396h-1.508v0.103z m0 0" p-id="8715"></path></svg>
        } else if (['.tar','.gz','.zip','.rar','.z7'].indexOf(suffixName) !== -1) {
            return <svg t="1608518242374" className="icon" style={{width: 60, height: 60}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8848" width="200" height="200"><path d="M435.414958 649.073228h147.371217v71.98594H435.414958z" p-id="8849"></path><path d="M995.905487 28.094513c-17.996485-17.996485-42.39172-28.094513-67.886741-28.094513H619.479008v73.085725H509.700449V143.97188h109.778559v73.085726H509.700449V287.943761h109.778559v73.085725H509.700449V431.915641h109.778559v325.136497c0 9.698106-3.799258 18.196446-11.397774 25.29506-7.598516 7.098614-15.996876 10.697911-25.095098 10.69791H435.414958c-9.498145 0.199961-18.696348-3.699277-25.095099-10.69791-6.698692-6.698692-10.397969-15.796915-10.297988-25.29506v-251.950791h109.678578v-73.085725H400.021871v-70.886155h109.678578v-73.085726H400.021871v-70.886155h109.678578V143.97188H400.021871V73.085725h109.678578V0H95.981254C42.991603 0 0 42.991603 0 95.981254v832.037492c0 25.495021 10.098028 49.890256 28.094513 67.886741 17.996485 17.996485 42.39172 28.094513 67.886741 28.094513h832.037492c25.495021 0 49.890256-10.098028 67.886741-28.094513 17.996485-17.996485 28.094513-42.39172 28.094513-67.886741V95.981254c0-25.39504-10.098028-49.890256-28.094513-67.886741z" p-id="8850"></path></svg>
        } else if (['.gallery'].indexOf(suffixName) !== -1) {
            return <svg t="1608518301670" className="icon" style={{width: 60, height: 60}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8983" width="200" height="200"><path d="M91.11 0H936.04c29.145 25.206 58.29 50.412 87.959 74.83v873.026c-28.094 22.843-59.077 44.636-78.244 76.144H85.858C56.451 999.319 30.458 970.7 0 947.069V86.384A2173.768 2173.768 0 0 0 91.11 0m187.733 249.173c-89.01 28.882-89.01 183.008 0.788 210.84 66.691 32.82 157.276-10.766 163.577-87.435 19.955-90.322-83.495-165.152-164.365-123.405m175.655 519.352c-47.261-56.714-93.472-114.478-139.159-172.504-65.903 87.696-137.583 170.929-200.336 260.726 266.24-5.777 533.005 1.575 799.245-3.676-89.534-111.327-174.867-225.805-257.838-341.859-67.741 85.334-132.332 173.293-201.912 257.313z" p-id="8984"></path></svg>
        } else if (['.installDisk'].indexOf(suffixName) !== -1) {
            return <svg t="1608518341098" className="icon" style={{width: 60, height: 60}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9117" width="200" height="200"><path d="M512 53.063111C258.929778 53.063111 53.048889 258.944 53.048889 512S258.929778 970.951111 512 970.951111c253.056 0 458.951111-205.895111 458.951111-458.951111S765.056 53.063111 512 53.063111zM512 914.062222C290.304 914.062222 109.937778 733.696 109.937778 512 109.937778 290.318222 290.304 109.952 512 109.952S914.062222 290.318222 914.062222 512C914.062222 733.696 733.696 914.062222 512 914.062222z" p-id="9118"></path><path d="M512 405.034667c-58.979556 0-106.951111 47.971556-106.951111 106.951111 0 58.979556 47.985778 106.965333 106.951111 106.965333 58.965333 0 106.951111-47.971556 106.951111-106.965333C618.951111 453.006222 570.965333 405.034667 512 405.034667zM512 562.062222c-27.619556 0-50.062222-22.442667-50.062222-50.062222 0-27.605333 22.456889-50.062222 50.062222-50.062222 27.576889 0 50.062222 22.456889 50.062222 50.062222C562.062222 539.605333 539.576889 562.062222 512 562.062222z" p-id="9119"></path><path d="M180.522667 544.597333c7.850667 0 13.895111-8.277333 13.539556-16.156444-0.227556-4.977778-0.341333-11.235556-0.341333-16.270222 0-7.850667-6.371556-14.051556-14.222222-14.051556-7.864889 0-14.222222 6.684444-14.222222 14.549333 0 5.475556 0.113778 11.605333 0.369778 17.024 0.355556 7.608889 6.641778 14.890667 14.193778 14.890667C180.053333 544.583111 180.280889 544.583111 180.522667 544.597333z" p-id="9120"></path><path d="M355.242667 789.105778c-83.512889-47.388444-140.714667-128.554667-156.942222-222.748444-1.322667-7.722667-8.604444-12.928-16.426667-11.576889-7.736889 1.336889-12.928 8.675556-11.591111 16.426667 17.692444 102.599111 79.985778 191.047111 170.951111 242.659556 2.218667 1.251556 4.622222 1.834667 6.997333 1.834667 4.963556 0 9.770667-2.588444 12.373333-7.196444C364.472889 801.664 362.069333 792.96 355.242667 789.105778z" p-id="9121"></path><path d="M327.822222 699.349333c3.598222 0 7.210667-1.351111 9.955556-4.067556 5.603556-5.518222 5.688889-14.506667 0.184889-20.110222-36.935111-37.603556-57.287111-87.324444-57.287111-140.017778 0-7.864889-6.371556-14.222222-14.222222-14.222222-7.864889 0-14.222222 6.357333-14.222222 14.222222 0 60.202667 23.239111 116.992 65.450667 159.943111C320.455111 697.912889 324.138667 699.349333 327.822222 699.349333z" p-id="9122"></path><path d="M382.094222 709.077333c-4.010667-2.304-7.936-4.693333-11.776-7.253333-6.556444-4.408889-15.36-2.602667-19.726222 3.953778-4.352 6.542222-2.574222 15.374222 3.953778 19.712 4.394667 2.944 8.903111 5.688889 13.496889 8.305778 2.204444 1.251556 4.622222 1.863111 6.997333 1.863111 4.963556 0 9.770667-2.588444 12.401778-7.196444C391.310222 721.635556 388.920889 712.945778 382.094222 709.077333z" p-id="9123"></path><path d="M401.251556 626.076444c-26.979556-15.274667-43.733333-44.032-43.733333-74.993778 0-7.864889-6.371556-14.222222-14.222222-14.222222-7.864889 0-14.222222 6.357333-14.222222 14.222222 0 41.187556 22.286222 79.416889 58.154667 99.783111 2.204444 1.251556 4.622222 1.834667 6.997333 1.834667 4.935111 0 9.756444-2.588444 12.373333-7.224889C410.467556 638.634667 408.078222 629.959111 401.251556 626.076444z" p-id="9124"></path><path d="M711.466667 217.073778c-6.314667-4.650667-15.232-3.271111-19.868444 3.043556-4.636444 6.328889-3.256889 15.232 3.057778 19.868444 92.188444 67.697778 141.155556 180.437333 127.744 294.229333-0.896 7.779556 4.650667 14.862222 12.472889 15.772444 0.554667 0.085333 1.123556 0.113778 1.678222 0.113778 7.111111 0 13.255111-5.333333 14.08-12.558222C865.251556 413.610667 811.918222 290.816 711.466667 217.073778z" p-id="9125"></path><path d="M678.670222 300.899556c-6.328889-4.650667-15.246222-3.256889-19.882667 3.043556-4.622222 6.328889-3.256889 15.232 3.072 19.868444 57.870222 42.481778 88.590222 113.251556 80.170667 184.661333-0.896 7.793778 4.650667 14.876444 12.458667 15.772444 0.568889 0.085333 1.123556 0.113778 1.678222 0.113778 7.111111 0 13.269333-5.319111 14.094222-12.544C779.861333 430.250667 744.775111 349.425778 678.670222 300.899556z" p-id="9126"></path><path d="M646.044444 372.238222c-6.314667-4.636444-15.232-3.271111-19.868444 3.043556-4.636444 6.328889-3.271111 15.232 3.057778 19.868444 24.96 18.332444 38.229333 48.853333 34.588444 79.658667-0.910222 7.793778 4.650667 14.876444 12.458667 15.786667 0.568889 0.071111 1.123556 0.099556 1.678222 0.099556 7.111111 0 13.255111-5.319111 14.094222-12.558222C696.860444 437.176889 679.239111 396.615111 646.044444 372.238222z" p-id="9127"></path></svg>
        } else if (['.mp4'].indexOf(suffixName) !== -1) {
            return <svg t="1608602269942" className="icon" style={{width: 60, height: 60}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4882" width="200" height="200"><path d="M63.465962 793.139052c0 55.038524 44.620243 99.708909 99.709933 99.708909l697.969529 0c55.04057 0 99.709933-44.669362 99.709933-99.708909L960.855356 194.878432c0-55.089689-44.669362-99.709933-99.709933-99.709933L163.174871 95.1685c-55.089689 0-99.709933 44.620243-99.709933 99.709933L63.464939 793.139052zM761.435491 494.00823 362.59576 743.283574 362.59576 244.732887 761.435491 494.00823z" p-id="4883"></path></svg>
        }
         else {
            return <svg t="1608518379369" className="icon" style={{width: 60, height: 60}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9260" width="200" height="200"><path d="M921.6 1024H102.4a102.4 102.4 0 0 1-102.4-102.4V102.4a102.4 102.4 0 0 1 102.4-102.4h819.2a102.4 102.4 0 0 1 102.4 102.4v819.2a102.4 102.4 0 0 1-102.4 102.4zM609.655467 228.1472l-3.959467 151.6544h159.4368zM785.066667 430.353067l-203.298134-3.8912-27.921066-23.3472L549.853867 204.8H238.933333v614.4h546.133334V430.353067z" p-id="9261"></path></svg>
        }
    }

class ItemList extends Component {

    constructor() {
        super();
        this.fetch = this.fetch.bind(this);
    }

    state = {
        list: [],
        cloudDiskInfo: {
            totalNumber: 0,
            totalSize: 0
        },
        scroll: {
            page: 1,
            pageSize: 30,
            hasMore: true,
            loading: false,
        },
        keywords: '',
        openSnackbar: false
    };

    componentWillMount() {
        that = this
        this.fetch();
    }

    /**
     * 节流函数
     * @param {*} fun 要执行的函数
     * @param {*} delay 延迟
     * @param {*} time 在time时间内必须执行一次
     */
    throttle(fun, delay, time) {
        var timeout,
            startTime = new Date();
        return function () {
            var context = this,
                args = arguments,
                curTime = new Date();
            clearTimeout(timeout);
            // 如果达到了规定的触发时间间隔，触发 handler
            if (curTime - startTime >= time) {
                fun.apply(context, args);
                startTime = curTime;
                // 没达到触发间隔，重新设定定时器
            } else {
                timeout = setTimeout(function () {
                    fun.apply(context, args);
                }, delay);
            }
        };
    };

    async fetch() {
        const { scroll, list, keywords, cloudDiskInfo } = this.state;
        scroll.loading = true;
        this.setState({
            scroll,
        });
        let infoList = []
        const result = await this.props.fetchList({
            page: scroll.page,
            pageSize: scroll.pageSize,
            keywords: keywords
        });
        scroll.loading = false;
        scroll.page++;
        try {
            if (result.data.data) {
                cloudDiskInfo.totalNumber = result.data.totalNum
                cloudDiskInfo.totalSize = parseFloat(result.data.totalSize/1024/1024).toFixed(2)
                infoList = result.data.data
            } else {
                infoList = result.data
            }
            infoList.map(item => {
                if (item.type === '图库') {
                    item.picList.forEach(pic => {
                        if (pic.album.split('.')[pic.album.split('.').length - 1] === 'mp4') {
                            item.suffixName = '.mp4';
                            item.type = '视频'
                            return
                        }
                    })
                }
                item.fileSuffixIcon = IconSuffixName(item.suffixName)
            })
        } catch (error) {
            //infoList = result.data
        }
        if (this.props.serviceType !== 'CloudDisk') {
            if (infoList.length === 0) scroll.hasMore = false; 
            this.setState({
                list: [...list, ...infoList],
                scroll,
            }, () => {
                if (scroll.page === 2 && infoList.length !== 0 && this.props.isPc) {
                    this.itemSelected(infoList[0], 0);
                }
            });
        } else {
            scroll.hasMore = false
            this.setState({
                list: [...infoList],
                scroll,
                cloudDiskInfo
            })
            if (infoList.length !== 0 && this.props.isPc) {
                this.itemSelected(infoList[0], 0);
            }
        }
        
    }

    itemSelected(item, index) {
        const len = document.getElementsByClassName('hoverItem').length;
        for (let i = 0; i < len; i++) {
            document.getElementsByClassName('hoverItem')[i].style.background = '#fff';
        }
        try {
            document.getElementsByClassName('hoverItem')[index].style.background = '#f5f5f9';
           // document.getElementsByClassName("hoverItem")[index].style.background = "#eee"
            this.props.backSelectedItem(item);
        } catch (e) {
            
        }
    }

    searchInput(param){
        that.searchFetch(param)   
    }
    resetSearchInput(){
        const type = that.props.serviceType
        
        if (type === 'CloudDisk') {
            that.setState({
                list: []
            }, () => {
                that.fetch()
            })
        } else {
            let { scroll, list } = that.state
            scroll.page = 1
            scroll.hasMore = true
            scroll.loading = false
            list = []
            that.setState({
                scroll: scroll,
                list: list,
                keywords: ''
            }, () => {
                that.fetch()
            })
        }
        
    }

    async searchFetch(param) {
        const type = this.props.serviceType
        if (type === 'CloudDisk') {
            let list = this.state.list
            list = list.filter(item => item.type === param)
            this.setState({
                list
            })
        } else {
            const { scroll } = this.state;
            scroll.loading = true;
            scroll.page = 1
            this.setState({
                scroll,
                keywords: param
            });
            const searchResult = await this.props.fetchList({
                page: scroll.page,
                pageSize: scroll.pageSize,
                keywords: param
            })
            scroll.loading = false;
            scroll.page++;
            if (searchResult.data.length === 0) scroll.hasMore = false;
            this.setState({
                list: [...searchResult.data],
                scroll,
            }, () => {
                if (scroll.page === 2 && searchResult.data.length !== 0 && this.props.isPc) {
                    this.itemSelected(searchResult.data[0], 0);
                }
            });
        }
        
    }

    renderListStar = items => {
        const openSnackbar = this.state.openSnackbar
        const handleChangeStar = async () => {
            const list = this.state.list
            
            const result = await apiService.changeCloudDiskStar({
                id: items._id,
                star: !items.isStar
            })
            if (result.code === 200) {
                list.map(item => {
                    if (item._id === items._id) {
                        item.isStar = !items.isStar
                    }
                })
                this.setState({
                    list,
                    openSnackbar: true
                })
                setTimeout(() => {
                    this.setState({
                        openSnackbar: false
                    })
                }, 2000)
            }
        }
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div onClick={() => handleChangeStar()} style={{margin: 10, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {items.isStar === true ?
                        <svg t="1608520080739" className="icon" style={{width: 20, height: 20}} viewBox="0 0 1102 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12942" width="200" height="200"><path d="M1038.099692 455.128615l-193.772307 163.052308a50.254769 50.254769 0 0 0-14.966154 44.977231l45.764923 261.907692c3.623385 20.716308 0 35.603692-17.329231 48.049231a57.107692 57.107692 0 0 1-59.392 4.174769L553.747692 847.793231a52.617846 52.617846 0 0 0-48.128 0L270.966154 977.289846a57.265231 57.265231 0 0 1-59.392-4.174769c-17.329231-12.445538-31.192615-27.254154-27.569231-48.049231L240.246154 657.723077a50.254769 50.254769 0 0 0-14.887385-44.977231L21.267692 455.128615a54.587077 54.587077 0 0 1-14.336-56.713846 56.162462 56.162462 0 0 1 45.528616-37.651692L317.833846 315.076923c16.935385-2.441846 31.507692-12.839385 38.990769-27.884308L479.074462 33.949538A56.398769 56.398769 0 0 1 529.644308 3.150769c21.504 0 40.96 11.972923 50.569846 30.798769l117.366154 253.243077c7.561846 14.966154 22.134154 25.442462 38.990769 27.805539l270.336 45.686154c21.267692 3.150769 38.833231 17.723077 45.449846 37.730461a54.744615 54.744615 0 0 1-14.257231 56.713846z" fill="#FDD700" p-id="12943"></path></svg>
                        : <svg t="1608520160468" className="icon" style={{width: 20, height: 20}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13076" width="200" height="200"><path d="M569.498552 94.591355l110.452601 223.834928 273.26778 40.687678c49.603745 7.397481 65.189721 42.312688 28.735461 80.583317l-199.268416 195.119933 48.854685 284.620339c6.563486 41.200354-33.247218 65.146743-68.225871 41.200354l-249.727645-130.273019L259.392772 963.953416c-34.038234 17.381879-69.038376 6.200212-62.688761-41.458227l47.764863-287.656489L39.10667 435.399391c-39.661302-36.582173-19.049868-69.979818 26.982538-76.094072l281.199427-40.85857c0 0 57.706283-117.0386 110.324688-223.64357C495.927953 23.221888 537.940812 24.269753 569.498552 94.591355z" p-id="13077"></path></svg>
                    }
                </div>
                <Snackbar anchorOrigin={{vertical: 'top',horizontal: 'center',}} open={openSnackbar} autoHideDuration={2}>
                    <Alert severity="success">操作成功</Alert>
                </Snackbar>
            </div>
        )
    }

    render() {
        const { list, scroll, cloudDiskInfo } = this.state;
        const renderAlbum = this.props.renderAlbum ? true : false;
        const renderStar = this.props.serviceType === 'CloudDisk' ? true : false
        const renderCloudDiskInfo = this.props.serviceType === 'CloudDisk' ? true : false
        return (
            <InfiniteScroll
                initialLoad={false}
                pageStart={scroll.page}
                isReverse={false}
                loadMore={this.throttle(this.fetch, 500, 1000)}
                hasMore={scroll.hasMore}
                useWindow={false}
                threshold={1}
            >
                <div style={{position: 'sticky'}}><SearchBarComponent children={this.props} searchInput={this.searchInput} resetSearchInput={this.resetSearchInput}/></div>
                <div style={{background: "#eee", color: "#333"}}>
                    { renderCloudDiskInfo && <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <p>占用空间：{cloudDiskInfo.totalSize}MB</p>
                        <p>文件总数：{cloudDiskInfo.totalNumber}</p>
                    </div> }
                    {
                        list.map((items, index) => (
                            <div key={items.id + '_' + index} style={{display: 'flex'}} className={"hoverItem"}>
                                { renderStar && this.renderListStar(items) }
                                <div style={{ display: 'flex', padding: 8, marginBottom: 4, width: '100%' }} onClick={() => this.itemSelected(items, index)}>
                                    { renderAlbum && items.album === undefined ? <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>{items.fileSuffixIcon}<p>{items.type}</p></div> : <div style={{ width: 112, backgroundImage: 'url(' + items.album + ')', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }}></div>}
                                    { this.props.renderList(items) }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </InfiniteScroll>
        )
    }
    
}

export default ItemList;