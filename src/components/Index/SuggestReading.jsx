import React,{useEffect, useState} from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CONFIG from '../../config';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const SuggestReading = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        setTimeout(() => {
            setData([{
                img: "http://localhost:7090/images/timg.png",
                content: "威程884是一款USB外置、应用广泛的旗舰型万能控制器，采用单一FPGA芯片同时实现PCI-E总线协议和数据信号处理。采用4路24位高精度的A/D转换器。多功能脉冲调制器能够适配伺服电机、比例伺服系统、变频器等工业作动器，数字颤振的DA信号改善了电液伺服系统的控制表现。"
            }])
        },500)
    })
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    if(isPc){
        return(
            <div style={{maxWidth: CONFIG.indexPageMaxWidth, width: isPc ? "100%" : "", margin: "auto"}}>
                <div style={{height: isPc ? 200 : 150, display: "flex", flexDirection: "row", padding: "40px"}}>
                    <div style={{ maxWidth: 500}}><img src="http://localhost:7090/images/timg.png" alt="" width="389px" ></img></div>
                    <div style={{paddingLeft: 40, width: "70%"}}>
                        <div><h3>推荐阅读文章标题</h3></div>
                        <Divider/>
                        <div>
                        <p>威程884是一款USB外置、应用广泛的旗舰型万能控制器，采用单一FPGA芯片同时实现PCI-E总线协议和数据信号处理。采用4路24位高精度的A/D转换器。多功能脉冲调制器能够适配伺服电机、比例伺服系统、变频器等工业作动器，数字颤振的DA信号改善了电液伺服系统的控制表现。</p>
                            <Button color="primary" variant="outlined" href="">了解详情</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div style={{maxWidth: 1200, width: isPc ? "100%" : "", margin: "auto"}}>
            <div style={{ display: "flex", flexDirection: "column"}}>
                <div style={{margin: "20px 40px 0 40px", maxWidth: "500px"}}><img src="http://localhost:7090/images/timg.png" alt="" width="100%" ></img></div>
                <div style={{padding: "20px 40px"}}>
                    <div><h3>推荐阅读文章标题</h3></div>
                    <Divider/>
                    <div>
                    <p>威程884是一款USB外置、应用广泛的旗舰型万能控制器，采用单一FPGA芯片同时实现PCI-E总线协议和数据信号处理。采用4路24位高精度的A/D转换器。多功能脉冲调制器能够适配伺服电机、比例伺服系统、变频器等工业作动器，数字颤振的DA信号改善了电液伺服系统的控制表现。</p>
                        <Button color="primary" variant="outlined" href="">了解详情</Button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default SuggestReading