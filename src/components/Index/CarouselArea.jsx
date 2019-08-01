import React from 'react'
import { Carousel } from 'antd-mobile';
import CONFIG from '../../config'

class CarouselArea extends React.Component {
	state = {
		data: [],
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({
				data: ['1800.jpg', '1801.jpg', '1802.jpg'],
			});
		}, 100);
	}
	render() {
		return (
			<Carousel
				style={{ maxHeight: 400, overflow: 'hidden', margin: 'auto' }}
				autoplay={true}
				infinite
			>
				{this.state.data.map(val => (
					<img
						key={val}
						src={CONFIG.url(`/img/${val}`)}
						alt={val}
						style={{ maxHeight: 400, verticalAlign: 'middle' }}
						onLoad={() => {
							window.dispatchEvent(new Event('resize'));
						}}
					/>
				))}
			</Carousel>
		);
	}
}




export default CarouselArea