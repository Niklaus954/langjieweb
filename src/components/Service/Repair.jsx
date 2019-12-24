import React, { Component } from 'react';
import ItemList from '../Common/ItemList';
import apiService from '../../api/apiService';

class Repair extends Component {
    constructor() {
        super();
        this.backSelectedItem = this.backSelectedItem.bind(this);
    }

    state = {
        selectedItem: [],
    };

    backSelectedItem(data) {
        console.log(data.res_arr);
        this.setState({
            selectedItem: data.res_arr,
        });
    }

    renderList(items) {
        return (
            <div style={{ flex: 1, padding: 4, marginLeft: 4 }}>
                <p>维修单号：{items.repair_contractno}</p>
                <p>维修物品：{items.goods}</p>
                <p>问题描述：{items.problem}</p>
            </div>
        )
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%', display: 'flex' }}>
                <div style={{ width: 400, overflow: 'auto' }}>
                    <ItemList fetchList={apiService.fetchRepair} fetchItem={apiService.fetchRepairInfo} backSelectedItem={this.backSelectedItem} renderList={this.renderList}></ItemList>
                </div>
                <div style={{ flex: 1 }}>

                </div>
            </div>
        )
    }
}

export default Repair;