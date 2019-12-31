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

    async backSelectedItem(item) {
        const result = await apiService.fetchVirCardInfo(item);
        this.setState({
            selectedItem: result.data,
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
                    <ItemList
                        fetchList={apiService.fetchVirCard}
                        renderAlbum={false}
                        backSelectedItem={this.backSelectedItem}
                        renderList={this.renderList}
                    ></ItemList>
                </div>
                <div style={{ flex: 1 }}>

                </div>
            </div>
        )
    }
}

export default Contract;