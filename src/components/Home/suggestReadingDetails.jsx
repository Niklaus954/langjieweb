import React, { useEffect, useState} from 'react';
import Common from '../Common/Common'
import ParagraphStyles from '../Common/ParagraphStyles'
import CONFIG from '../../config'
// class SuggestReadingDetails extends React.Component{
//     constructor(){
//         super()
//         this.state={
//             dataSource: {
//
//             }
//         }
//     }
//     render(){
//         console.log(this)
//         let data = this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length - 1]
//         let obj = JSON.parse(data)
//         let title = obj.title
//         let content = obj.content
//         let contentArr = []
//         for(let key in content){
//             contentArr.push(Common.transToView(content[key]))
//         }
//         //console.log(content)
//         return(
//             <div>
//                 <div><h3>{title}</h3></div>
//                 {contentArr.map((item, index) => {
//                     console.log(item)
//
//                     if(item.type == 'text'){
//                         return(
//                             <div key={index}>
//                                 <p style={{fontSize: 16, fontWeight: 400, textIndent: 32, lineHeight: 1.4}}>{item.value}</p>
//                             </div>
//                         )
//                     }else if(item.type == 'picture'){
//                         // return(
//                         //     <div style={{backgroundImage: `url(${CONFIG.url('/img/gallery/' + item.value)})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", width: 300, height: 240, backgroundPosition: "center"}}></div>
//                         // )
//                         console.log(item.valueArr)
//                         item.valueArr.forEach((ite, ind) => (
//                             <div>
//                                 <div style={{backgroundImage: `url(${CONFIG.url('/img/gallery/' + ite)})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", width: 300, height: 240, backgroundPosition: "center"}}></div>
//                             </div>
//                         ))
//                     }else if(item.type == 'video') {
//                         item.valueArr.forEach((ite, ind) => {
//                             return(
//                                 <div key={ind}>
//                                     <video controls={true} src={CONFIG.url('/img/gallery/'+ite)} width="100%"></video>
//                                 </div>
//                             )
//                         })
//                         // console.log(item)
//                         // return(
//                         //     <div key={index}>
//                         //         <video controls={true} src={CONFIG.url('/img/gallery/'+item.value)} width="100%"></video>
//                         //     </div>
//                         // )
//                     }
//                 })}
//             </div>
//         )
//     }
// }


const SuggestReadingDetails = state => {
    console.log()
    return(
        <div>111</div>
    )
}

export default SuggestReadingDetails