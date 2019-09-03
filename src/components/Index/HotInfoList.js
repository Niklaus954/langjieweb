import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import CONFIG from '../../config'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types'

const HotInfoList = ({fetchHostInfoList, hotInfoList, history}) => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    
    useEffect(() => {
        fetchHostInfoList();
    });

    const renderItem = (items, index) => {
        return (
            <div key={index} style={{display: 'flex', width: '100%'}} >
                {
                    !isPc && <div>
                        <Paper>
                            <img style={{width: '100%'}} src={CONFIG.url(`/img/${items.img}`)} alt={items.img}/>
                        </Paper>
                        <Paper>
                            <p style={{fontSize: 16, textAlign: 'left', lineHeight: '32px', textIndent: 32, whiteSpace: 'initial', color: '#999', paddingLeft: 16, paddingRight: 16}}>{items.text}</p>
                        </Paper>
                    </div>
                }
                {
                    isPc && <div style={{width: '100%', marginBottom: 30}}>
                        {
                            index % 2 === 0 && (
                                <div style={{display: 'flex', width: '100%'}}>
                                    <Paper>
                                        <img style={{height: 200}} src={CONFIG.url(`/img/${items.img}`)} alt={items.img}/>
                                    </Paper>
                                    <Paper style={{flex: 1, marginLeft: 24}}>
                                        <p style={{fontSize: 16, textAlign: 'left', lineHeight: '32px', textIndent: 32, whiteSpace: 'initial', color: '#999', paddingLeft: 16, paddingRight: 16}}>{items.text}</p>
                                    </Paper>
                                </div>
                            )
                        }
                        {
                            index % 2 !== 0 && (
                                <div style={{display: 'flex', width: '100%'}}>
                                    <Paper style={{flex: 1, marginRight: 24}}>
                                        <p style={{fontSize: 16, textAlign: 'left', lineHeight: '32px', textIndent: 32, whiteSpace: 'initial', color: '#999', paddingLeft: 16, paddingRight: 16}}>{items.text}</p>
                                    </Paper>
                                    <Paper>
                                        <img style={{height: 200}} src={CONFIG.url(`/img/${items.img}`)} alt={items.img}/>
                                    </Paper>
                                </div>
                            )
                        }
                    </div>
                }
            </div>
        )
    }

    return (
        <div>
            {
                hotInfoList.map((items,index) => renderItem(items, index))
            }
        </div>
    );
}

HotInfoList.propTypes = {
    fetchHostInfoList: PropTypes.func.isRequired,
    hotInfoList: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(HotInfoList);