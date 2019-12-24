import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd-mobile';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CONFIG from '../../config';
import Button from '@material-ui/core/Button';

const CarouselArea = () => {
	const isPc = useMediaQuery(CONFIG.minDeviceWidth);
	const [data, setData] = useState([]);
	const [showIndex, setShowIndex] = useState(0);
	const [prevIndex, setPrevIndex] = useState(0);
	const [backArrowFill, setBackArrowFill] = useState('#108ee9');
	const [forArrowFill, setForwordArrowFill] = useState("#108ee9");
	useEffect(() => {
		setTimeout(() => {
			setData([
				{
					tag: "产品推荐",
					title: "威程884",
					content: "威程884是一款USB外置、应用广泛的旗舰型万能控制器，采用单一FPGA芯片同时实现PCI-E总线协议和数据信号处理。采用4路24位高精度的A/D转换器。多功能脉冲调制器能够适配伺服电机、比例伺服系统、变频器等工业作动器，数字颤振的DA信号改善了电液伺服系统的控制表现。",
					img: "1800.jpg"
				},
				{
					tag: "产品推荐",
					title: "威程884",
					content: "威程884是一款USB外置、应用广泛的旗舰型万能控制器，采用单一FPGA芯片同时实现PCI-E总线协议和数据信号处理。采用4路24位高精度的A/D转换器。多功能脉冲调制器能够适配伺服电机、比例伺服系统、变频器等工业作动器，数字颤振的DA信号改善了电液伺服系统的控制表现。",
					img: "1801.jpg"
				},
				{
					tag: "产品推荐",
					title: "威程884",
					content: "威程884是一款USB外置、应用广泛的旗舰型万能控制器，采用单一FPGA芯片同时实现PCI-E总线协议和数据信号处理。采用4路24位高精度的A/D转换器。多功能脉冲调制器能够适配伺服电机、比例伺服系统、变频器等工业作动器，数字颤振的DA信号改善了电液伺服系统的控制表现。",
					img: "1802.jpg"
				},
				{
					tag: "产品推荐",
					title: "威程884",
					content: "威程884是一款USB外置、应用广泛的旗舰型万能控制器，采用单一FPGA芯片同时实现PCI-E总线协议和数据信号处理。采用4路24位高精度的A/D转换器。多功能脉冲调制器能够适配伺服电机、比例伺服系统、变频器等工业作动器，数字颤振的DA信号改善了电液伺服系统的控制表现。",
					img: "1802.jpg"
				},
				{
					tag: "产品推荐",
					title: "威程884",
					content: "威程884是一款USB外置、应用广泛的旗舰型万能控制器，采用单一FPGA芯片同时实现PCI-E总线协议和数据信号处理。采用4路24位高精度的A/D转换器。多功能脉冲调制器能够适配伺服电机、比例伺服系统、变频器等工业作动器，数字颤振的DA信号改善了电液伺服系统的控制表现。",
					img: "1802.jpg"
				}
			])
			// setData(['1800.jpg', '1801.jpg', '1802.jpg']);
		}, 500);
		window.addEventListener('resize', resize);
	}, []);

	const resize = () => {
		if(document.getElementsByClassName('slider-list')[0] !== undefined){
            document.getElementsByClassName('slider-list')[0].style.transform = 'translate3d(0px, 0px, 0px)';
		}
		setShowIndex(0);
		setPrevIndex(0);
	}

	const navImgClick = index => {
		const totalHeight = document.getElementsByClassName('slider-list')[0].style.width.split('px')[0];
		const singleImgWidth = totalHeight / data.length;
		const targetPosi = - index * singleImgWidth;
		let num = 0 - prevIndex * singleImgWidth;
		const diffWidth = Math.abs(index - prevIndex) * singleImgWidth;
		const widthS = diffWidth / 50;
		moveImg();
		function moveImg() {
			setTimeout(() => {
				if (index > prevIndex) {
					num -= widthS;
				} else {
					num += widthS;
				}
				document.getElementsByClassName('slider-list')[0].style.transform = 'translate3d('+num+'px, 0px, 0px)';
				const max = Math.max(Math.abs(num), Math.abs(targetPosi));
				const min = Math.min(Math.abs(num), Math.abs(targetPosi));
				if (max - min > 1) {
					moveImg();
				} else {
					setPrevIndex(index);
				}
			}, 10);
		}
		setShowIndex(index);

		if(index === data.length-1) {
			window.document.getElementById("nextArrow").style.display = "none"
            window.document.getElementById("preArrow").style.display = "block";
		}else if(index === 0){
            window.document.getElementById("preArrow").style.display = "none";
            window.document.getElementById("nextArrow").style.display = "block"
		}else {
            window.document.getElementById("preArrow").style.display = "block";
            window.document.getElementById("nextArrow").style.display = "block"
		}
	}
	const slickCarouselItem = (e) => {
        setShowIndex(e)
        if(e === data.length-1) {
            window.document.getElementById("nextArrow").style.display = "none"
            window.document.getElementById("preArrow").style.display = "block";
        }else if(e === 0){
            window.document.getElementById("preArrow").style.display = "none";
            window.document.getElementById("nextArrow").style.display = "block"
        }else {
            window.document.getElementById("preArrow").style.display = "block";
            window.document.getElementById("nextArrow").style.display = "block"
        }
	}
	return (
		<div>
			<div style={{ background: '#444' }}>
				<div style={{ width: isPc ? "100%" : "", margin: "auto", maxWidth: CONFIG.indexPageMaxWidth }}>
					<Carousel
						infinite={false}
						autoplay={false}
						dots={!isPc}
						afterChange={e => slickCarouselItem(e)}
					>
						{data.map((val, index) => (
							<div key={index} style={{ display: "flex", flexDirection: isPc ? "row" : "column-reverse", margin: "auto" }}>
								<div style={{ width: isPc ? "50%" : "100%", height: isPc ? 350 : 330, maxHeight: 350 }}>
									<div className="" style={{ height: "15%", borderBottom: "#888 1px solid", margin: "0 40px 0 40px" }}>
										<h3 style={{ color: "#fff" }}>{val.tag}</h3>
									</div>
									<div style={{ margin: "0 40px 0 40px" }}>
										<h2 style={{ color: "#fff" }}>{val.title}</h2>
										<p style={{ color: "#fff", fontSize : isPc ? "16px" : "14px", fontWeight: 400, lineHeight: 1.4 }}>{val.content}</p>
										<Button variant="outlined" color="inherit" style={{ color: "#fff" }} href="">查看产品详情</Button>
									</div>
								</div>
								<img src={CONFIG.url(`/img/${val.img}`)} alt={val.img} style={{ height: isPc ? 350 : 200, width: isPc ? "50%" : "" }} onLoad={() => { window.dispatchEvent(new Event('resize')) }} />
							</div>
						))}
					</Carousel>
				</div>
			</div>
			<div style={{ display: isPc ? "flex" : "none", flexDirection: "row", flexWrap: "nowrap", justifyContent: "center", alignItems: "center", background: "#fff", height: 150 }}>
				<div style={{width: 50}}>
                    <svg id="preArrow" style={{display: "none", cursor: "pointer"}} onMouseEnter={() =>
                    {setBackArrowFill("#065fa3")}}
                         onMouseLeave={() =>
                         {setBackArrowFill("#108ee9")}
                         }
                         onClick={() => {navImgClick(showIndex-1)}}
                         t="1577072722766" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11354" width="40" height="40">
                        <path d="M309.30914569 506.66666666L774.19175777 971.5206952 733.77463938 1011.96639714 268.57760843 546.76936616 228.47490891 506.66666666 733.77463938 1.36693618 774.19175777 41.8126381Z" fill={backArrowFill} p-id="11355"></path>
                    </svg>
				</div>
				{
					data.map((item, index) => {
						if (showIndex === index) {
							return (
								<div key={index} style={{ border: "#065fa3 2px solid", width: 120, height: 80, margin: 20, cursor: 'pointer', overflow: 'hidden' }}>
									<div>
										<img src={CONFIG.url(`/img/${item.img}`)} alt="" width='100%' height="80px" />
									</div>
								</div>
							)
						} else {
							return (
								<div id={index} key={index} style={{ border: "#ccc 2px solid", width: 120, height: 80, margin: 20, cursor: 'pointer', overflow: 'hidden' }} onClick={() => { navImgClick(index) }} onMouseEnter={() => {document.getElementById(index).style.border="#065fa3 2px solid"}} onMouseLeave={() => {document.getElementById(index).style.border="#ccc 2px solid"}}>
									<div>
										<img src={CONFIG.url(`/img/${item.img}`)} alt="" width='100%' height="80px" />
									</div>
								</div>
							)
						}
					})
				}
				<div style={{width: 50}}>
					<svg id="nextArrow" style={{display: "block", cursor: "pointer"}} t="1577072358360" onMouseEnter={() => {
						setForwordArrowFill("#065fa3")
					}} onMouseLeave={() => {
						setForwordArrowFill("#108ee9")
					}}
						 onClick={() => {navImgClick(showIndex+1)}}
						 className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
						 p-id="11203" width="40" height="40">
						<path
							d="M707.67593244 512L233.95259734 38.305792 275.13833245-2.90907022 749.18206578 471.13466311 790.04740267 512 275.13833245 1026.90907022 233.95259734 985.694208Z"
							p-id="11204" fill={forArrowFill}></path>
					</svg>
				</div>
			</div>
		</div>
	);
}




export default CarouselArea