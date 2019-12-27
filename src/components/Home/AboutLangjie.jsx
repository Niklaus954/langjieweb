import React, { useEffect, useState } from 'react';
import apiAboutLangjie from '../../api/apiAboutLangjie';
import  ParagraphStyles from '../Common/ParagraphStyles';
import CONFIG from '../../config';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Common from '../Common/Common';


const AboutLangjie = () => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth)
    const [data, setData] = useState([])
    useEffect(() =>{
        const fetch = async () => {
            const result = await apiAboutLangjie.fetchBasicInfo()
            if(result.code == 200) setData(result.data)
        }
        fetch()
    },[])

    const renderParagraph = () => {
        if(data.length === 0) return
        const obj = data[0].content
        let resArr = [];
        const transArr = Common.transToViewAll(obj);
        transArr.forEach((items, index) => {
            if (items.type === 'text') {
                items.valueArr.forEach((it, ind) => {
                    resArr.push(<p key={index + '-' + ind}>{it}</p>);
                });
            }
        });
        return resArr
    }
    return(
        <div style={{ margin: isPc ? 40 : 20 }}>
            <div><h3>公司简介</h3></div>
            <div>
                {ParagraphStyles(renderParagraph())}
            </div>
        </div>
    )
}

//
// class AboutLangjie1 extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             dataSource:{},
//         }
//         const useStyles = makeStyles(theme => ({
//
//         }))
//     }
//     async componentWillMount() {
//
//         const result = await apiAboutLangjie.fetchBasicInfo();
//         if(result.code == 200) {
//             this.setState({
//                 dataSource: result.data[0]
//             })
//         }
//     }
//
//      Render = () => {
//          const { dataSource } = this.state;
//          if(Object.keys(dataSource).length === 0) return;
//          const resArr = [];
//          let rendItem = [];
//          for(let i in dataSource.content) {
//              resArr.push({
//                  contentItem: dataSource.content[i],
//
//              })
//          }
//          resArr.forEach((item, index) => {
//              rendItem.push(
//                  <div key={index}>
//                      <div style={{display: "flex", flexDirection: index%2 == 0 ? "row": "row-reverse"}}>
//                          <div style={{display: "flex", alignItems: "flex-end"}}>{ParagraphStyles(item.contentItem)}</div>
//                          <div><img src={item.imgSrc} alt=""/></div>
//                      </div>
//                  </div>
//              )
//          })
//          return rendItem
//     }
//
//     render() {
//         return(
//             <div>
//                 {
//                     this.Render()
//                 }
//             </div>
//         )
//     }
// }

export default AboutLangjie;