import React, { useEffect, useState } from 'react';
import {
    withRouter,
} from 'react-router-dom'
import { Carousel } from 'antd-mobile';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CONFIG from '../../config';
import Button from '@material-ui/core/Button';
import apiIndex from '../../api/apiIndex';
import Common from '../Common/Common';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// const CarouselArea = ({history}) => {
// 	const isPc = useMediaQuery(CONFIG.minDeviceWidth);
// 	const [data, setData] = useState([]);
// 	const [showIndex, setShowIndex] = useState(0);
// 	const [prevIndex, setPrevIndex] = useState(0);
// 	const [backArrowFill, setBackArrowFill] = useState('#108ee9');
// 	const [forArrowFill, setForwordArrowFill] = useState("#108ee9");
// 	useEffect(() => {
// 		apiIndex.fetchImage().then(result => {
// 			let resData = result.data[0].content.map(items => {
// 				return {
// 					tag: "产品推荐",
// 					title: items[2],
// 					content: items[3],
// 					img: items[0],
//
// 					href: items[4],
// 				};
// 			});
// 			resData.shift();
// 			resData.forEach((items, index) => {
// 				resData[index].img = '/gallery/' + Common.transToView(items.img).value;
// 			});
// 			setData(resData);
// 		});
// 		window.addEventListener('resize', resize);
// 		return window.removeEventListener('resize', resize);
// 	}, []);
//
// 	const resize = () => {
// 		if(document.getElementsByClassName('slider-list')[0] !== undefined){
//             document.getElementsByClassName('slider-list')[0].style.transform = 'translate3d(0px, 0px, 0px)';
// 		}
// 		setShowIndex(0);
// 		setPrevIndex(0);
// 	}
//
// 	const navImgClick = index => {
// 		const totalHeight = document.getElementsByClassName('slider-list')[0].style.width.split('px')[0];
// 		const singleImgWidth = totalHeight / data.length;
// 		const targetPosi = - index * singleImgWidth;
// 		let num = 0 - prevIndex * singleImgWidth;
// 		const diffWidth = Math.abs(index - prevIndex) * singleImgWidth;
// 		const widthS = diffWidth / 50;
// 		moveImg();
// 		function moveImg() {
// 			setTimeout(() => {
// 				if (index > prevIndex) {
// 					num -= widthS;
// 				} else {
// 					num += widthS;
// 				}
// 				document.getElementsByClassName('slider-list')[0].style.transform = 'translate3d('+num+'px, 0px, 0px)';
// 				const max = Math.max(Math.abs(num), Math.abs(targetPosi));
// 				const min = Math.min(Math.abs(num), Math.abs(targetPosi));
// 				if (max - min > 1) {
// 					moveImg();
// 				} else {
// 					setPrevIndex(index);
// 				}
// 			}, 10);
// 		}
// 		setShowIndex(index);
//
// 		if(index === data.length-1) {
// 			window.document.getElementById("nextArrow").style.display = "none"
//             window.document.getElementById("preArrow").style.display = "block";
// 		}else if(index === 0){
//             window.document.getElementById("preArrow").style.display = "none";
//             window.document.getElementById("nextArrow").style.display = "block"
// 		}else {
//             window.document.getElementById("preArrow").style.display = "block";
//             window.document.getElementById("nextArrow").style.display = "block"
// 		}
// 	}
// 	const slickCarouselItem = (e) => {
// 		console.log(e)
//         setShowIndex(e)
//         if(e === data.length-1) {
//             window.document.getElementById("nextArrow").style.display = "none"
//             window.document.getElementById("preArrow").style.display = "block";
//         }else if(e === 0){
//             window.document.getElementById("preArrow").style.display = "none";
//             window.document.getElementById("nextArrow").style.display = "block"
//         }else {
//             window.document.getElementById("preArrow").style.display = "block";
//             window.document.getElementById("nextArrow").style.display = "block"
//         }
// 	}
//
// 	const linkToInfo = href => {
// 		history.push({
//             pathname: href,
//         });
// 	}
//
// 	return (
// 		<div>
// 			<div style={{ background: '#444' }}>
// 				<div style={{ width: isPc ? "100%" : "", margin: "auto", maxWidth: CONFIG.indexPageMaxWidth }}>
// 					<Carousel
// 						infinite={false}
// 						autoplay={false}
// 						dots={!isPc}
// 						afterChange={e => slickCarouselItem(e)}
// 					>
// 						{data.map((val, index) => (
// 							<div key={index} style={{ display: "flex", flexDirection: isPc ? "row" : "column-reverse", margin: "auto" }}>
// 								<div style={{ width: isPc ? "50%" : "100%", height: isPc ? 350 : 330, maxHeight: 350 }}>
// 									<div className="" style={{ height: "15%", borderBottom: "#888 1px solid", margin: "0 40px 0 40px" }}>
// 										<h3 style={{ color: "#fff" }}>{val.tag}</h3>
// 									</div>
// 									<div style={{ margin: "0 40px 0 40px" }}>
// 										<h2 style={{ color: "#fff" }}>{val.title}</h2>
// 										<p style={{ color: "#fff", fontSize : isPc ? "16px" : "14px", fontWeight: 400, lineHeight: 1.4 }}>{val.content}</p>
// 										<Button variant="outlined" color="inherit" style={{ color: "#fff" }} onClick={() => linkToInfo(val.href)}>查看产品详情</Button>
// 									</div>
// 								</div>
// 								<img src={CONFIG.url(`/img/${val.img}`)} alt={val.img} style={{ height: isPc ? 350 : 200, width: isPc ? "50%" : "" }} onLoad={() => { window.dispatchEvent(new Event('resize')) }} />
// 							</div>
// 						))}
// 					</Carousel>
// 				</div>
// 			</div>
// 			<div style={{ display: isPc ? "flex" : "none", flexDirection: "row", flexWrap: "nowrap", justifyContent: "center", alignItems: "center", background: "#fff", height: 150 }}>
// 				<div style={{width: 50}}>
//                     <svg id="preArrow" style={{display: "none", cursor: "pointer"}} onMouseEnter={() =>
//                     {setBackArrowFill("#065fa3")}}
//                          onMouseLeave={() =>
//                          {setBackArrowFill("#108ee9")}
//                          }
//                          onClick={() => {navImgClick(showIndex-1)}}
//                          t="1577072722766" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11354" width="40" height="40">
//                         <path d="M309.30914569 506.66666666L774.19175777 971.5206952 733.77463938 1011.96639714 268.57760843 546.76936616 228.47490891 506.66666666 733.77463938 1.36693618 774.19175777 41.8126381Z" fill={backArrowFill} p-id="11355"></path>
//                     </svg>
// 				</div>
// 				{
// 					data.map((item, index) => {
// 						if (showIndex === index) {
// 							return (
// 								<div key={index} style={{ border: "#065fa3 2px solid", width: 120, height: 80, margin: 20, cursor: 'pointer', overflow: 'hidden' }}>
// 									<div>
// 										<img src={CONFIG.url(`/img/${item.img}`)} alt="" width='100%' height="80px" />
// 									</div>
// 								</div>
// 							)
// 						} else {
// 							return (
// 								<div id={index} key={index} style={{ border: "#ccc 2px solid", width: 120, height: 80, margin: 20, cursor: 'pointer', overflow: 'hidden' }} onClick={() => { navImgClick(index) }} onMouseEnter={() => {document.getElementById(index).style.border="#065fa3 2px solid"}} onMouseLeave={() => {document.getElementById(index).style.border="#ccc 2px solid"}}>
// 									<div>
// 										<img src={CONFIG.url(`/img/${item.img}`)} alt="" width='100%' height="80px" />
// 									</div>
// 								</div>
// 							)
// 						}
// 					})
// 				}
// 				<div style={{width: 50}}>
// 					<svg id="nextArrow" style={{display: "block", cursor: "pointer"}} t="1577072358360" onMouseEnter={() => {
// 						setForwordArrowFill("#065fa3")
// 					}} onMouseLeave={() => {
// 						setForwordArrowFill("#108ee9")
// 					}}
// 						 onClick={() => {navImgClick(showIndex+1)}}
// 						 className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
// 						 p-id="11203" width="40" height="40">
// 						<path
// 							d="M707.67593244 512L233.95259734 38.305792 275.13833245-2.90907022 749.18206578 471.13466311 790.04740267 512 275.13833245 1026.90907022 233.95259734 985.694208Z"
// 							p-id="11204" fill={forArrowFill}></path>
// 					</svg>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }



const  CarouselArea = ({history}) => {
	const _this = window;
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
	const [data, setData] = useState([]);
	const [sliderIndex, setSliderIndex] = useState(0);
    const [navIndex, setNavIndex] = useState(0);
    const [backArrowFill, setBackArrowFill] = useState('#108ee9');
    const [forArrowFill, setForwordArrowFill] = useState("#108ee9");
	useEffect(() => {
		apiIndex.fetchImage().then(result => {
			let resData = result.data[0].content.map(items => {
				return{
					tag: '产品推荐',
					title: items[2],
					content: items[3],
					img: items[0],
					href: items[4]
				}
			});
			resData.shift();
			resData.forEach((items, index) => {
				resData[index].img = '/gallery/' + Common.transToView(items.img).value
			});
			setData(resData)
		})
	},[])

	const sliderSettings = {
        dots: isPc ? false : true,
        dotsClass: "slick-dots slick-thumb",
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
		arrows: false,
        afterChange: (e) => {
           // setNavIndex(e)
        },
        beforeChange: (current, next) => {
            setSliderIndex(next)
            setNavIndex(next)
            if(next === data.length-1) {
                window.document.getElementById("nextArrow").style.display = "none"
                window.document.getElementById("preArrow").style.display = "block";
            }else if(next === 0){
                window.document.getElementById("preArrow").style.display = "none";
                window.document.getElementById("nextArrow").style.display = "block"
            }else {
                window.document.getElementById("preArrow").style.display = "block";
                window.document.getElementById("nextArrow").style.display = "block"
            }
        }
	}
    const linkToInfo = href => {
		history.push({
            pathname: href,
        });
	}
	const RenderCarouselImg = () => {
    	if(data.length === 0) return
		const resArr = []
		data.forEach((item, index) => {
			resArr.push(<div key={index}>
				<div style={{ display: "flex", flexDirection: isPc ? "row" : "column-reverse", margin: "auto" }}>
                    <div style={{ width: isPc ? "50%" : "100%", height: isPc ? 350 : 330, maxHeight: 350 }}>
                        <div className="" style={{ height: "15%", borderBottom: "#888 1px solid", margin: "0 40px 0 40px" }}>
                            <h3 style={{ color: "#fff" }}>{item.tag}</h3>
                        </div>
                        <div style={{ margin: "0 40px 0 40px" }}>
                            <h2 style={{ color: "#fff" }}>{item.title}</h2>
                            <p style={{ color: "#fff", fontSize : isPc ? "16px" : "14px", fontWeight: 400, lineHeight: 1.4 }}>{item.content}</p>
                            <Button variant="outlined" color="inherit" style={{ color: "#fff" }} onClick={() => linkToInfo(item.href)}>查看产品详情</Button>
                        </div>
                    </div>
                    <div style={{backgroundImage: `url(${CONFIG.url(`/img/${item.img}`)})`, height: isPc ? 350 : 200, width: isPc ? "50%" : "", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}></div>
                    {/*<div style={{  height: isPc ? 350 : 200, width: isPc ? "50%" : "",}}><img src={CONFIG.url(`/img/${item.img}`)} height="100%" width="100%"/></div>*/}
				</div>
			</div>)
		})
		return resArr
	}


	const SlickNavImg = () => {
    	const handleClickNav = (index) => {
            _this.slider.slickGoTo(index)
            setNavIndex(index)
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
		const resArr = []
        resArr.push(<div key="preArrow" style={{width: 50, height: 60, display: "flex", alignItems: "center"}}>
            <svg id="preArrow" style={{display: "none", cursor: "pointer"}} onMouseEnter={() =>
            {setBackArrowFill("#065fa3")}}
                 onMouseLeave={() =>
                 {setBackArrowFill("#108ee9")}
                 }
                 onClick={() => {handleClickNav(navIndex - 1)}}
                 t="1577072722766" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11354" width="40" height="40">
                <path d="M309.30914569 506.66666666L774.19175777 971.5206952 733.77463938 1011.96639714 268.57760843 546.76936616 228.47490891 506.66666666 733.77463938 1.36693618 774.19175777 41.8126381Z" fill={backArrowFill} p-id="11355"></path>
            </svg>
        </div>)
        data.forEach((item, index) =>{
            sliderIndex === index
                ? resArr.push(<div key={index} style={{padding: "0 20px"}}><div style={{border: `2px solid #3498db`, cursor: "pointer"}}><div style={{backgroundImage: `url(${CONFIG.url(`/img/${item.img}`)})`, backgroundSize: "cover", backgroundPosition: "center", width: 110, height: 70, backgroundRepeat: "no-repeat"}}></div></div></div>)
                : resArr.push(<div key={index} style={{padding: "0 20px"}}><div id={index} style={{border: `2px solid #ccc`, cursor: "pointer"}} onClick={() => {handleClickNav(index)}} onMouseEnter={() => {document.getElementById(index).style.border = "2px solid #3498db"}} onMouseLeave={() =>{document.getElementById(index).style.border = "2px solid #ccc"}}><div style={{backgroundImage: `url(${CONFIG.url(`/img/${item.img}`)})`, backgroundSize: "cover", backgroundPosition: "center", width: 110, height: 70, backgroundRepeat: "no-repeat"}}></div></div></div>)
        })
        resArr.push(<div key="nextArrow" style={{width: 50, display: "flex", alignItems: "center"}}>
            <svg id="nextArrow" style={{display: "block", cursor: "pointer"}} t="1577072358360" onMouseEnter={() => {
                setForwordArrowFill("#065fa3")
            }} onMouseLeave={() => {
                setForwordArrowFill("#108ee9")
            }}
                 onClick={() => {handleClickNav(navIndex + 1)}}
                 className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="11203" width="40" height="40">
                <path
                    d="M707.67593244 512L233.95259734 38.305792 275.13833245-2.90907022 749.18206578 471.13466311 790.04740267 512 275.13833245 1026.90907022 233.95259734 985.694208Z"
                    p-id="11204" fill={forArrowFill}></path>
            </svg>
        </div>)
		return resArr
	}

	return(
		<div style={{background: "#fff"}}>
            <div style={{background: "#444"}}>
                <div style={{ width: isPc ? "100%" : "", margin: "auto", maxWidth: CONFIG.indexPageMaxWidth }}>
                    <Slider ref={slider => (_this.slider = slider)} {...sliderSettings}>
                        {RenderCarouselImg()}
                    </Slider>
                </div>
            </div>
            <div style={{display: isPc ? "flex" : "none", flexDirection: "row", flexWrap: "nowrap", justifyContent: "center", alignItems: "center", height: 150}}>{SlickNavImg()}</div>
		</div>
	)
}

export default withRouter(CarouselArea)