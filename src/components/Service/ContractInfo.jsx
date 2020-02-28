import React, { useState, useEffect } from 'react';
import {
    withRouter,
} from 'react-router-dom'
import apiService from '../../api/apiService';
import FadeTransitions from '../Common/FadeTransitions'
import { List } from 'antd-mobile';
import ParagraphStyles from "../Common/ParagraphStyles";
import { Paper } from "@material-ui/core"
const Item = List.Item;

const ContractInfo = props => {
    const [infoList, setInfoList] = useState([]);
    const [album, setAlbum] = useState([])
    useEffect(() => {
        const contract_no = props.location.pathname.split('/contractInfo/')[1];
        fetch(contract_no);
    }, [ props.location.pathname ]);

    const fetch = async contract_no => {
        const result = await apiService.getContractInfo({contract_no});
        const resAlbum = result.data.comment.filter(item => item.column_name === "album");
        setAlbum(resAlbum)
        const labelObj = {
            contract_no: {
                name: '合同编号',
            },
            cus_abb: {
                name: '购方',
            },
            purchase: {
                name: '购方采购',
            },
            contract_state: {
                name: '合同状态',
            },
            sale_person: {
                name: '销售员',
            },
            sign_time: {
                name: '签订日期',
            },
            total_amount: {
                name: '总金额',
            },
            payable: {
                name: '应付金额',
            },
            paid: {
                name: '已付金额',
            },
            install: {
                name: '需要安装',
            },
            isDirectSale: {
                name: '是否直销',
            },
            delivery_state: {
                name: '发货状态',
            },
            delivery_time: {
                name: '发货时间',
            },
            take_person: {
                name: '收货确认人',
            },
            take_time: {
                name: '收货确认时间',
            },
            isFreeze: {
                name: '是否冻结',
            },
            freeze_reason: {
                name: '冻结原因',
            },
            freeze_start_time: {
                name: '冻结开始时间',
            },
            freeze_time: {
                name: '冻结截止日期',
            },
            close_reason: {
                name: '关闭原因',
            },
            close_time: {
                name: '关闭日期',
            },
            other: {
                name: '其他约定',
            },
        };
        for (let i = 0; i < result.data.comment.length; i++) {
            const key = result.data.comment[i].column_name;
            if (labelObj[key]) labelObj[key].val = result.data.comment[i].val;
            if(key === 'isFreeze' && result.data.comment[i].val == 0) {
                delete labelObj.freeze_reason;
                delete labelObj.freeze_start_time;
                delete labelObj.freeze_time;
            }
            if(key === 'contract_state' && result.data.comment[i].val !== '关闭') {
                delete labelObj.close_reason;
                delete labelObj.close_time;
            }
            if (key === 'install' || key === 'isFreeze' || key === 'isDirectSale') {
                if(labelObj[key].val==0){
                    labelObj[key].val = '否';
                }else{
                    labelObj[key].val = '是';
                }
            }else if(key==='take_time'){
                if(labelObj[key].val==='0000-00-00'||labelObj[key].val==null) labelObj[key].val = '';
            }
        };
        const renderList = [];
        for (const key in labelObj) {
            renderList.push({
                column_name: key,
                column_comment: labelObj[key].name,
                val: labelObj[key].val,
            });
        }
        setInfoList(renderList);
    }

    return (
        <FadeTransitions>
            <div style={{ width: '96%', height: '100%', display: 'flex', borderRight: '1px solid #eee', margin: "auto" }}>
                <div style={{ flex: 1, overflow: 'auto' }} id="grid">
                    <div>{ParagraphStyles.RenderServiceCarousel(album)}</div>
                    <div style={{ margin: 5}}>
                        <Paper elevation={3}>
                            <List renderHeader={() => '明细'}>
                                {
                                    infoList.map((items, index) => <Item key={items.column_name + index} extra={items.val} wrap={true}>{items.column_comment}</Item>)
                                }
                            </List>
                        </Paper>
                    </div>
                </div>
            </div>
        </FadeTransitions>
    )
}

export default withRouter(ContractInfo);