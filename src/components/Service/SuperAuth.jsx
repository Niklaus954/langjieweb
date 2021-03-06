import React, { useEffect, useState } from 'react'
import {
    withRouter,
} from 'react-router-dom'
import Common from '../Common/Common'
import apiLogin from '../../api/apiLogin'
import { FormControl, InputLabel, Select, MenuItem, Button, useMediaQuery, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { Toast } from 'antd-mobile'
import CONFIG from '../../config'
import DynaSelect from '../Common/DynaSelect'

const SuperAuth = props => {
    const [companyList, setCompanyList] = useState([]);
    const [memberList, setMemberList] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedMember, setSelectedMember] = useState('');
    const [showType, setShowType] = useState('default');

    const isPc = useMediaQuery(CONFIG.minDeviceWidth);

    useEffect(() => {
        if (!Common.showSuperAuth()) {
            props.history.push({
                pathname: '/index',
            });
            return;
        }
        fetchCompanyList();
    }, []);

    const fetchCompanyList = async () => {
        const result = await apiLogin.fetchCompanyList();
        setCompanyList(result.data);
        setSelectedMember('');
    }

    const fetchMemberList = async company => {
        const result = await apiLogin.fetchSuperAuthMember({ company });
        setMemberList(result.data);
    }

    const companyChange = e => {
        setSelectedCompany(e.target.value);
        fetchMemberList(e.target.value);
    }

    const memberChange = e => {
        setSelectedMember(e.target.value);
    }

    const renderMemberInfo = info => {
        const { check_company, check_job, name, job } = info;
        let str = name;
        str += ' （' + job + '，';
        if (check_company) {
            str += '公司审核通过，';
        } else {
            str += '公司未审核通过，';
        }
        if (check_job) {
            str += '职位审核通过）';
        } else {
            str += '职位未审核通过）';
        }
        return str;
    }

    const postSuperAuth = async () => {
        const hashMapper = Common.getLocationParamMapper(props.location.search);
        const redirectUrl = hashMapper['path'];
        if (!selectedMember) {
            Toast.info('请选择会员');
            return;
        }
        const result = await apiLogin.postSuperAuthMember({
            open_id: selectedMember,
        });
        const { updateMemberInfo, history } = props;
        Common.loginCallBack(result, {
            apiLogin,
            updateMemberInfo,
            history,
            redirectUrl,
        });
    }

    const showListTypeChange = e => {
        const v = e.target.value;
        setShowType(v);
        if (v === 'diy') {
            setSelectedMember('');
            setMemberList([]);
        }
    }

    const dynaSelectCb = v => {
        setSelectedCompany(v);
        fetchMemberList(v);
    }

    return (
        <div style={{paddingLeft: isPc ? 50 : 20, paddingTop: 20}}>
            <div>
                <RadioGroup row aria-label="company" name="company" value={showType} onChange={showListTypeChange}>
                    <FormControlLabel value="default" control={<Radio />} label="列表" />
                    <FormControlLabel value="diy" control={<Radio />} label="自定义" />
                </RadioGroup>
                {
                    showType === 'default' && (
                        <FormControl>
                            <InputLabel id="super-company">请选择公司</InputLabel>
                            <Select labelId="super-company" value={selectedCompany} onChange={companyChange} style={{ minWidth: 300 }}>
                                {
                                    companyList.map(items => <MenuItem key={items} value={items}>{items}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    )
                }
                {
                    showType === 'diy' && (
                        <FormControl>
                            <DynaSelect dataSource={companyList} cb={dynaSelectCb}></DynaSelect>
                        </FormControl>
                    )
                }
            </div>
            <div style={{marginTop: 20}}>
                <FormControl>
                    <InputLabel id="super-member">请选择会员</InputLabel>
                    <Select labelId="super-member" value={selectedMember} onChange={memberChange} style={{ minWidth: 300 }}>
                        {
                            memberList.map(items => <MenuItem key={items.open_id} value={items.open_id}>{renderMemberInfo(items)}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </div>
            <Button onClick={postSuperAuth} variant="contained" color="primary" style={{marginTop: 32, width: 300}}>
                提交
            </Button>
        </div>
    )
}

export default withRouter(SuperAuth);