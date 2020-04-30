import React, { useState, useEffect } from 'react';
import {
    withRouter,
} from 'react-router-dom'
import CONFIG from '../../config'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FadeTransitions from '../Common/FadeTransitions'
import { Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import apiShop from '../../api/apiShop'
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import { Toast, Stepper } from 'antd-mobile';
import Common from '../Common/Common';

const useStyles = makeStyles(theme => ({
    typeDefault: {
        background: '#F8F8F8',
        color: '#333',
    },
    typeSelected: {
        background: '#3f51b5',
        color: '#fff',
    },
    typeDisabled: {
        background: '#F8F8F8',
        color: '#999',
    },
    typeItem: {
        borderRadius: 20,
        marginLeft: 6,
        padding: '3px 20px',
        fontSize: 12,
        marginBottom: 6,
    },
    typeBlock: {
        width: '100%',
        display: 'flex',
    },
    typeLabel: {
        width: 70,
    },
    typeItemBlock: {
        flex: 1,
        display: 'flex',
        flexWrap: 'wrap',
    },
}));

const GoodsInfo = props => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const classes = useStyles();
    const [data, setdata] = useState({});
    const [open, setOpen] = useState(false);
    const [seriesArr, setSeriesArr] = useState([]);
    const [structureArr, setStructureArr] = useState([]);
    const [loadRangeArr, setLoadRangeArr] = useState([]);
    const [sizeArr, setSizeArr] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [buyNum, setBuyNum] = useState(1);
    const [price, setPrice] = useState(0);

    const [currentCombination, setCurrentCombination] = useState([]);
    const model = props.match.params.model;

    useEffect(() => {
        fetch();
    }, []);

    async function fetch() {
        const result = await apiShop.fetchGoodsInfo(model);
        setdata(result.data);
        reset(result.data.goodsList);
    }

    const reset = data => {
        let seriesArr = [], structureArr = [], loadRangeArr = [], sizeArr = [];
        data.forEach(items => {
            if (!seriesArr.includes(items.series)) {
                seriesArr.push(items.series);
            }
            if (!structureArr.includes(items.structure)) {
                structureArr.push(items.structure);
            }
            if (!loadRangeArr.includes(items.load_range)) {
                loadRangeArr.push(items.load_range);
            }
            if (!sizeArr.includes(items.size)) {
                sizeArr.push(items.size);
            }
        });
        seriesArr = seriesArr.map(items => { return { name: items, selected: false, disabled: false } });
        structureArr = structureArr.map(items => { return { name: items, selected: false, disabled: false } });
        loadRangeArr = loadRangeArr.map(items => { return { name: items, selected: false, disabled: false } });
        sizeArr = sizeArr.map(items => { return { name: items, selected: false, disabled: false } });
        setSeriesArr(seriesArr);
        setStructureArr(structureArr);
        setLoadRangeArr(loadRangeArr);
        setSizeArr(sizeArr);
        setCurrentCombination(data);
    }

    const typeClick = (type, obj) => {
        if (obj.disabled || obj.selected) {
            return;
        }
        const filterRes = currentCombination.filter(items => items[type] === obj.name);
        const dealer = (arr, type) => {
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < filterRes.length; j++) {
                    if (arr[i].name === obj.name) {
                        arr[i].selected = true;
                    }
                    if (arr[i].name === filterRes[j][type]) {
                        break;
                    } else if (arr[i].name !== filterRes[j][type] && j === filterRes.length - 1) {
                        arr[i].disabled = true;
                    }
                }
            }
        }
        dealer(seriesArr, 'series');
        dealer(structureArr, 'structure');
        dealer(loadRangeArr, 'load_range');
        dealer(sizeArr, 'size');
        setSeriesArr(seriesArr);
        setStructureArr(structureArr);
        setLoadRangeArr(loadRangeArr);
        setSizeArr(sizeArr);
        setCurrentCombination(filterRes);

        const series = getSelectedItem(seriesArr);
        const structure = getSelectedItem(structureArr);
        const load_range = getSelectedItem(loadRangeArr);
        const size = getSelectedItem(sizeArr);
        if (series && structure && load_range && size) {
            const it = data.goodsList.filter(items => items.series === series && items.structure === structure &&items.load_range === load_range &&items.size === size);
            const { price } = it[0];
            setPrice(price);
        }
    }

    const renderCartType = () => {
        const renderItem = (type, arr) => {
            return arr.map(items => {
                let cls;
                if (items.selected) {
                    cls = classes.typeSelected;
                } else if (items.disabled) {
                    cls = classes.typeDisabled;
                } else {
                    cls = classes.typeDefault;
                }
                return (
                    <span onClick={() => typeClick(type, items)} className={`${classes.typeItem} ${cls}`} key={items.name}>{items.name}</span>
                )
            })
        }

        return (
            <div>
                <div style={{marginLeft: 6}}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span style={{fontSize: 22, color: '#ff5000', marginTop: 10}}>
                            <span>￥</span>
                            <span>{price}</span>
                        </span>
                        <span style={{ fontSize: 12, marginRight: 6, marginTop: 6, color: '#3f51b5'}} onClick={() => reset(data.goodsList)}>清除选择</span>
                    </div>
                    <div className={classes.typeBlock}>
                        <p className={classes.typeLabel}>主机风格：</p>
                        <p className={classes.typeItemBlock}>{ renderItem('series', seriesArr) }</p>
                    </div>
                    <div className={classes.typeBlock}>
                        <p className={classes.typeLabel}>主机结构：</p>
                        <p className={classes.typeItemBlock}>{ renderItem('structure', structureArr) }</p>
                    </div>
                    <div className={classes.typeBlock}>
                        <p className={classes.typeLabel}>最大量程：</p>
                        <p className={classes.typeItemBlock}>{ renderItem('load_range', loadRangeArr) }</p>
                    </div>
                    <div className={classes.typeBlock}>
                        <p className={classes.typeLabel}>尺寸大小：</p>
                        <p className={classes.typeItemBlock}>{ renderItem('size', sizeArr) }</p>
                    </div>
                    <div className={classes.typeBlock}>
                        <p className={classes.typeLabel}>购买数量：</p>
                        <div className={classes.typeItemBlock} style={{flexDirection: 'row-reverse', marginRight: 20}}>
                            <Stepper
                                style={{ width: 100 }}
                                showNumber
                                max={10}
                                min={1}
                                value={buyNum}
                                onChange={v => setBuyNum(v)}
                            />
                            </div>
                    </div>
                </div>
                <Button style={{width: '100%', marginTop: 6}}
                    variant="contained" 
                    color="primary"
                    onClick={() => addCart()}
                    >
                    确定
                </Button>
            </div>
        )
    }

    const getSelectedItem = arr => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].selected) {
                return arr[i].name;
            }
        }
    }

    const addCart = async () => {
        const series = getSelectedItem(seriesArr);
        const structure = getSelectedItem(structureArr);
        const load_range = getSelectedItem(loadRangeArr);
        const size = getSelectedItem(sizeArr);
        if (!series) {
            Toast.info('请选择主机风格');
            return;
        }
        if (!structure) {
            Toast.info('请选择主机结构');
            return;
        }
        if (!load_range) {
            Toast.info('请选择最大量程');
            return;
        }
        if (!size) {
            Toast.info('请选择尺寸大小');
            return;
        }
        const it = data.goodsList.filter(items => items.series === series && items.structure === structure &&items.load_range === load_range &&items.size === size);
        if (it.length === 0) {
            Toast.info('异常，请刷新重试');
            return;
        }
        const goodsId = it[0].id;
        const result = await apiShop.addCart({
            num: buyNum,
            goodsId,
        });
        if (result.code === 200) {
            // Toast.info(result.msg);
            setOpen(false);
            setDialogOpen(true);
        }
    }

    const openTypeSelect = async () => {
        const token = localStorage.getItem('shop_access_token');
        if (!token) {
            const pathname = props.history.location.pathname;
            props.history.push('/login?path=' + pathname);
            return;
        }
        setOpen(true);
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
    }

    const gotoCart = () => {
        props.history.push('/shop/cart');
    }

    return (
        <FadeTransitions>
            <div style={{display: 'flex', padding: 10, flexDirection: isPc ? 'row' :'column'}}>
                <div>
                    <Typography variant="h6" gutterBottom>
                        { data.chinese_name }
                    </Typography>
                    <img style={{width: '100%'}} src={data.img} alt=""/>
                    <Typography variant="body2" gutterBottom style={{lineHeight: 2, textIndent: 28}}>
                        { data.description }
                    </Typography>
                </div>
                <Button style={{position: 'fixed', width: '100%', bottom: 0, left: 0}} 
                    variant="contained" 
                    color="primary"
                    onClick={() => openTypeSelect()}
                    >
                    加入购物车
                </Button>
                <Drawer anchor={'bottom'} open={open} onClose={() => setOpen(false)}>
                    { renderCartType() }
                </Drawer>
                <Dialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"提示"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            加入购物车成功，是否去结算？
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="primary">
                            否
                        </Button>
                        <Button onClick={gotoCart} color="primary">
                            是
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </FadeTransitions>
    );
}

export default withRouter(GoodsInfo);