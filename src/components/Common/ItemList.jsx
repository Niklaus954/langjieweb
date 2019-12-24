import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import '../../public/css/hoverStyle.css';

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
    };

    componentWillMount() {
        this.fetch();
    }

    async fetch() {
        const { scroll, list } = this.state;
        scroll.loading = true;
        this.setState({
            scroll,
        });
        const result = await this.props.fetchList({
            page: scroll.page,
            pageSize: scroll.pageSize,
        });
        scroll.loading = false;
        scroll.page++;
        if (result.data.length === 0) scroll.hasMore = false;
        this.setState({
            list: [...list, ...result.data],
            scroll,
        }, () => {
            if (scroll.page === 2 && result.data.length !== 0) {
                this.itemSelected(result.data[0], 0);
            }
        });
    }

    async fetchInfo(item) {
        const result = await this.props.fetchItem(item);
        this.props.backSelectedItem(result.data);
    }

    itemSelected(item, index) {
        const len = document.getElementsByClassName('hoverItem').length;
        for (let i = 0; i < len; i++) {
            document.getElementsByClassName('hoverItem')[i].style.background = '#f5f5f9';
        }
        try {
            document.getElementsByClassName('hoverItem')[index].style.background = '#eee';
            this.fetchInfo(item);
        } catch (e) {
            
        }
    }

    render() {
        const { list, scroll } = this.state;
        const notAlbum = this.props.notAlbum ? true : false;
        return (
            <InfiniteScroll
                initialLoad={false}
                pageStart={scroll.page}
                isReverse={false}
                loadMore={this.fetch}
                hasMore={scroll.hasMore}
                useWindow={false}
                threshold={1}
            >
                {
                    list.map((items, index) => (
                        <div key={items.id} className={"hoverItem"} onClick={() => this.itemSelected(items, index)}>
                            <div style={{ display: 'flex', padding: 8 }}>
                                { notAlbum && <div style={{ width: 112, backgroundImage: 'url(' + items.album + ')', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}></div> }
                                { this.props.renderList(items) }
                            </div>
                        </div>
                    ))
                }
            </InfiniteScroll>
        )
    }
}

export default ItemList;