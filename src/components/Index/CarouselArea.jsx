import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd-mobile';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CONFIG from '../../config'

const CarouselArea = () => {
	const isPc = useMediaQuery(CONFIG.minDeviceWidth);
	const [ data, setData ] = useState([]);
    
    useEffect(() => {
        setTimeout(() => {
			setData(['1800.jpg', '1801.jpg', '1802.jpg']);
		}, 500);
	}, []);
	
	return (
		<Carousel
			style={{ height: isPc ? 400 : 150, margin: 'auto' }}
			autoplay={true}
			infinite
		>
			{data.map(val => (
				<img
					key={val}
					src={CONFIG.url(`/img/${val}`)}
					alt={val}
					style={{ height: isPc ? 400 : 150, verticalAlign: 'middle' }}
					onLoad={() => {
						window.dispatchEvent(new Event('resize'));
					}}
				/>
			))}
		</Carousel>
	);
}


export default CarouselArea