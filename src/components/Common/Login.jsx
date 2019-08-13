import React, { useEffect, useState } from 'react';
import {
    withRouter,
} from 'react-router-dom'
import PropTypes from 'prop-types'
import CONFIG from '../../config'
import Common from './Common'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid } from '@material-ui/core';
import { Toast } from 'antd-mobile';
import { AccountCircle, VerifiedUser } from '@material-ui/icons';
import apiLogin from '../../api/apiLogin'

const useStyles = makeStyles(theme => ({
    wrap: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 50,
        flexDirection: 'column',
        alignItems: 'center',
    },
    item: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

let clockTimer;

const Login = ({ location, history, updateSelectedSideName, updateMemberInfo }) => {
    const [ redirectUrl, setRedirectUrl ] = useState('');
    const [ phoneDisabled, setPhoneDisabled ] = useState(false);
    const [ verDisabled, setVerDisabled ] = useState(true);
    const [ loginDisabled, setLoginDisabled ] = useState(true);
    const [ phoneValue, setPhoneValue ] = useState('');
    const [ verCodeValue, setVerCodeValue ] = useState('');
    const [ btnName, setBtnName ] = useState('点击获取');
    const isPc = window.innerWidth < CONFIG.minDeviceWidthNum ? false : true;
    const classes = useStyles();
    
    useEffect(() => {
        const { search } = location;
        const hashMapper = Common.getLocationParamMapper(search);
        const pathname = hashMapper['path'];
        setRedirectUrl(pathname);
        updateSelectedSideName('会员登陆');
        // 组件移除的时候触发
        return () => clearTimeout(clockTimer);
    }, []);

    const sendBtnClick = async () => {
        setVerDisabled(true);
        // 验证手机号是否会员
        Toast.loading('发送中...', 30);
        const result = await apiLogin.fetchVerCode({
            formData: {
                phone: phoneValue,
            },
        });
        if (result.code === 200) {
            Toast.hide();
            const maxTime = '60s';
            setPhoneDisabled(true);
            setBtnName(maxTime);
            timer(maxTime);
            setLoginDisabled(false);
        }
    }

    const timer = btnName => {
        clockTimer = setTimeout(() => {
            let num = parseInt(btnName);
            if (num > 1) {
                num--;
                setBtnName(num + 's');
                timer(num + 's');
            } else {
                setBtnName('点击获取');
                setVerDisabled(false);
            }
        }, 1000);
    }

    const login = async (phone, verCode) => {
        const { search } = location;
        if (!verCode) {
            Toast.info('验证码不能为空');
            return;
        }
        Toast.loading('登陆中...', 30);
        const result = await apiLogin.checkVerCode({
            formData: {
                phone,
                verCode,
            },
        });
        if (result.code === 200) {
            const data = {
                lj_token: result.data.lj_token,
                endDate: result.data.endDate,
                unionid: result.data.unionid,
            };
            localStorage.setItem('lj_token', JSON.stringify(data));
            // 根据unionid获取会员基本信息
            const memberInfo = await apiLogin.fetchMemberInfo({ unionid: result.data.unionid });
            localStorage.setItem('lj_member_info', JSON.stringify(memberInfo.data));
            updateMemberInfo(memberInfo.data);
            Toast.hide();
            const hashMapper = Common.getLocationParamMapper(search);
            const redirectUrl = hashMapper['path'];
            history.push(redirectUrl);

        }
    }

    return (
        <div style={{width: '100%'}}>
            { isPc && <iframe 
                key={'loginIframe'}
                title={'loginIframe'}
                style={{width: '100%', height: 420, border: 'none', marginTop: 112}} 
                src={'https://open.weixin.qq.com/connect/qrconnect?appid='+CONFIG.wxLoginAppid+'&redirect_uri=' + encodeURIComponent('https://os.langjie.com/web/#checkLogin?redirectUrl=' + redirectUrl) + '&response_type=code&scope=snsapi_login#wechat_redirect'} 
            frameBorder="0" /> }
            { !isPc && <div className={classes.wrap}>
                <Grid className={classes.item} container alignItems="flex-end">
                    <Grid item>
                        <AccountCircle />
                    </Grid>
                    <Grid item style={{width: '60%', marginLeft: 10}}>
                        <TextField disabled={phoneDisabled} type={'tel'} fullWidth={true} label="手机号" value={phoneValue} onChange={e => {
                            setPhoneValue(e.target.value);
                            if (e.target.value.length === 11) {
                                setVerDisabled(false);
                            } else {
                                setVerDisabled(true);
                            }
                        }} />
                    </Grid>
                </Grid> 
                <Grid style={{marginTop: 20}} className={classes.item} container alignItems="flex-end">
                    <Grid item>
                        <VerifiedUser />
                    </Grid>
                    <Grid item style={{width: '60%', marginLeft: 10}}>
                        <Grid item style={{position: 'relative'}}>
                            <TextField type={'tel'} fullWidth={true} label="验证码" value={verCodeValue} onChange={e => {
                                if (e.target.value.length > 6) return;
                                setVerCodeValue(e.target.value);
                            }}/>
                            <Button onClick={sendBtnClick} disabled={verDisabled} size={'small'} variant="outlined" color="primary" style={{position: 'absolute', top: 12, right: 0}}>{btnName}</Button>
                        </Grid>
                    </Grid>
                </Grid> 
                <Button
                    disabled={loginDisabled}
                    variant="contained"
                    color="primary"
                    style={{marginTop: 60, width: '67%', marginLeft: 15}}
                    onClick={() => login(phoneValue, verCodeValue)}
                >
                    登陆
                </Button>
            </div> }
        </div>
    );
}

Login.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    updateSelectedSideName: PropTypes.func.isRequired,
}

export default withRouter(Login);
