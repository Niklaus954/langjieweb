import React, { Component, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import '../../public/css/hoverStyle.css';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, IconButton, useMediaQuery, Button, Divider } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import CONFIG from '../../config';
import { ListView } from 'antd-mobile';
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


class ItemList extends Component {

    constructor() {
        super();
        this.fetch = this.fetch.bind(this);
    }

    state = {
        list: [],
        scroll: {
            page: 1,
            pageSize: 30,
            hasMore: true,
            loading: false,
        },
        keywords: ''
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
        const { scroll, list, keywords } = this.state;
        scroll.loading = true;
        this.setState({
            scroll,
        });
        const result = await this.props.fetchList({
            page: scroll.page,
            pageSize: scroll.pageSize,
            keywords: keywords
        });
        scroll.loading = false;
        scroll.page++;
        if (result.data.length === 0) scroll.hasMore = false;
        this.setState({
            list: [...list, ...result.data],
            scroll,
        }, () => {
            if (scroll.page === 2 && result.data.length !== 0 && this.props.isPc) {
                this.itemSelected(result.data[0], 0);
            }
            console.log(result)
        });
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

    searchInput(serialNo){
        that.searchFetch(serialNo)   
    }
    resetSearchInput(){
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

    async searchFetch(serialNo) {
        const { scroll } = this.state;
        scroll.loading = true;
        scroll.page = 1
        this.setState({
            scroll,
            keywords: serialNo
        });
        const searchResult = await this.props.fetchList({
            page: scroll.page,
            pageSize: scroll.pageSize,
            keywords: serialNo
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

    render() {
        const { list, scroll } = this.state;
        const renderAlbum = this.props.renderAlbum ? true : false;
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
                    {
                        list.map((items, index) => (
                            <div key={items.id + '_' + index} >
                                <div style={{ display: 'flex', padding: 8, marginBottom: 4, background: "#fff" }} className={"hoverItem"}
                                     onClick={() => this.itemSelected(items, index)}
                                >
                                    { renderAlbum && <div style={{ width: 112, backgroundImage: 'url(' + items.album + ')', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }}></div> }
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