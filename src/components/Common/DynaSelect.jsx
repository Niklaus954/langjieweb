import React, { useState } from 'react'
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    selectList: {
        position: 'absolute',
        zIndex: 2,
        background: '#f5f5f9',
        minWidth: 298,
        maxHeight: 400,
        overflow: 'auto',
        borderLeft: '1px solid #999',
        borderRight: '1px solid #999',
        borderBottom: '1px solid #999',
    },
    selectListItem: {
        width: '100%',
        paddingTop: 8,
        paddingBottom: 8,
        textAlign: 'center',
        fontSize: 16,
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'rgba(0, 0, 0, 0.14)',
        }
    },
}));

const DynaSelect = props => {
    const { dataSource, cb } = props;
    const [ textValue, setTextValue ] = useState('');
    const [ isFocus, setIsFocus ] = useState(false);
    const [ filteredList, setFilteredList ] = useState([]);
    const classes = useStyles();

    const inputChange = e => {
        const v = e.target.value;
        setTextValue(v);
        const list = dataSource.filter(items => items.includes(v));
        setFilteredList(list);
    }

    const itemSelect = v => {
        setTextValue(v);
        cb(v);
    }

    return (
        <div>
            <TextField style={{minWidth: 300, position: 'relative'}} value={textValue} label="请输入关键字" onChange={inputChange} onFocus={() => setIsFocus(true)} onBlur={() => setTimeout(() => setIsFocus(false), 200)} />
            {
                isFocus && (
                    <div className={classes.selectList}>
                        {
                            filteredList.length === 0 && (
                                <div className={classes.selectListItem}>暂无数据</div>
                            )
                        }
                        {
                            filteredList.length !== 0 && (
                                filteredList.map(items => <div onClick={() => itemSelect(items)} key={items} className={classes.selectListItem}>{items}</div>)
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default DynaSelect;