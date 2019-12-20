import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd-mobile';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CONFIG from '../../config';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Slider from 'react-slick';
const useStyles = makeStyles(theme =>({}))


const CarouselArea = () => {
	const isPc = useMediaQuery(CONFIG.minDeviceWidth);
	const [ data, setData ] = useState([]);
	const [showIndex, setShowIndex] = useState(0)
    useEffect(() => {
        setTimeout(() => {
			setData(['1800.jpg', '1801.jpg', '1802.jpg']);
		}, 500);
	}, []);
	const classes = useStyles()
	return (
		<div>
			<div style={{background: '#444'}}>
				<div style={{width: isPc ? "100%" : "", margin: "auto", maxWidth:  CONFIG.indexPageMaxWidth}}>
				<Carousel
					infinite
					autoplay={false}
					dots={!isPc}
					afterChange={e => {setShowIndex(e)}}
					selectedIndex={showIndex}
					>
						{data.map(val => (
							<div key={val} style={{ display: "flex", flexDirection: isPc ? "row" : "column-reverse", margin: "auto" }} className={classes.animation}>
								<div style={{width: isPc ? "50%" : "100%", height: isPc ? 350 : 300}}>
									<div className="" style={{height: "15%", borderBottom: "#888 1px solid", margin: "0 40px 0 40px"}}>
										<h3 style={{color: "#fff"}}>产品推荐</h3>
									</div>
									<div style={{margin: "0 40px 0 40px"}}>
										<h2 style={{color: "#fff"}}>威程884</h2>
										<p style={{color: "#fff"}}>威程884是一款USB外置、应用广泛的旗舰型万能控制器，采用单一FPGA芯片同时实现PCI-E总线协议和数据信号处理。采用4路24位高精度的A/D转换器。多功能脉冲调制器能够适配伺服电机、比例伺服系统、变频器等工业作动器，数字颤振的DA信号改善了电液伺服系统的控制表现。</p>
										<Button variant="outlined" color="inherit" style={{color: "#fff"}} href="">查看产品详情</Button>
									</div>
								</div>
								<img src={CONFIG.url(`/img/${val}`)} alt={val} style={{height: isPc ? 350 : 200, width: isPc ? "50%" : ""}} onLoad={() => {window.dispatchEvent(new Event('resize'))}}/>
							</div>
						))}
					</Carousel>
				</div>
			</div>
			<div style={{display: isPc ? "flex" : "none", flexDirection: "row", justifyContent: "center", background: "#fff"}}>
			{
				data.map((item, index) => {
					if(showIndex === index) {
						return(
							<div key={index} style={{border: "#065fa3 2px solid", width: 120, height: 80, margin: 30}}>
								<div>
									<img src={CONFIG.url(`/img/${item}`)} alt="" width='120px' height="80px"/>
								</div>
							</div>
						)
					}else{
						return(
							<div key={item} style={{border: "#fff 2px solid", width: 120, height: 80, margin: 30}} onClick={() => {setShowIndex(index)}}>
								<div>
									<img src={CONFIG.url(`/img/${item}`)} alt="" width='120px' height="80px"/>
								</div>
							</div>
						)
					}
				})
			}
			</div>
		</div>
	);
}




export default CarouselArea