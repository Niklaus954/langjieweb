import React, { Component } from 'react';
import ItemList from '../Common/ItemList';
import apiService from '../../api/apiService';

class Contract extends Component {
    constructor() {
        super();
        this.backSelectedItem = this.backSelectedItem.bind(this);
    }

    state = {
        selectedItem: [],
    };

    backSelectedItem(data) {
        console.log(data);
        this.setState({
            selectedItem: data,
        });
    }

    renderList(items) {
        return (
            <div style={{ flex: 1, padding: 4, marginLeft: 4 }}>
                <p>合同号：{items.serialNo}</p>
                <p>型号：{items.model}</p>
            </div>
        )
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%', display: 'flex' }}>
                <div style={{ width: 400, overflow: 'auto' }}>
                    <ItemList fetchList={apiService.fetchVirCard} fetchItem={apiService.fetchVirCardInfo} backSelectedItem={this.backSelectedItem} renderList={this.renderList}></ItemList>
                </div>
                <div style={{ flex: 1 }}>

                </div>
            </div>
        )
    }
}

export default Contract;