import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd-mobile';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CONFIG from '../../config';
import Button from '@material-ui/core/Button';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"

export default class CarouselA extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            dataSource:["perch01.png","perch02.png","perch03.png","perch04.png"]
        }
    }
    render(){
        const data = this.state.dataSource
        const settings = {
            customPaging: function(i){
                return(
                    <div style={{width: 300}}>
                        <a>
                            <img src={`http://localhost:7090/images/perch0${i + 1}.png`} width="100px" height="100px"></img>
                        </a>
                    </div>
                );
            },
            dots: true,
            dotsClass: "slick-dots slick-thumb",
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            useCss: true
        };
        return(
           <div >
                <Slider {...settings} style={{height: 333}}>
                    {
                        data.map(val => (
                            <div key={val}>
                                {/* <div style={{background: "#444"}}></div> */}
                                <div>
                                    <img src={`http://localhost:7090/images/${val}`} width="50%"></img>
                                </div>
                            </div>
                        ))
                    }
                </Slider>
                
           </div>
        )
    }
}

// const CarouselA = () => {
//     const isPc = useMediaQuery(CONFIG.minDeviceWidth);
// 	const [ data, setData ] = useState([]);
//     useEffect(() => {
//         setTimeout(() => {
// 			setData(['1800.jpg', '1801.jpg', '1802.jpg']);
// 		}, 500);
// 	}, []);
//     const settings = {
//         customPaging: function(i){
//             return(
//                 <a>
//                     <img src={`https://os.langjie.com/img/1800.jpg`} width="100px" height="100px"></img>
//                 </a>
//             );
//         },
//         dot: true,
//         dotsClass: "slick-dots slick-thumb",
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1
//     };

//     return(
//         <div style={{height: 300}}>
//         <Slider {...settings}>
//             <div>
//                 <img src="https://os.langjie.com/img/1800.jpg" width="50%"></img>
//             </div>
//             <div>
//                 <img src="https://os.langjie.com/img/1801.jpg" width="50%"></img>
//             </div>
//             <div>
//                 <img src="https://os.langjie.com/img/1802.jpg" width="50%"></img>
//             </div>
//         </Slider>
//         </div>
//     )
// }



