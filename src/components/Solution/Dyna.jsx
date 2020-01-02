import React, { Component, useEffect, useState } from 'react';
import apiSolution from '../../api/apiSolution';
import ParagraphStyles from '../Common/ParagraphStyles'
import Common from '../Common/Common';
import FadeTransitions from '../Common/FadeTransitions'

const Dyna = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetch = async() => {
            const result = await apiSolution.fetchDyna()
            if(result.code === 200) setData(result.data)
        }
        fetch()
    },[])

    const renderContent = () => {
        const resArr = []
        if(data.length === 0) return
        const content = data[0].content
        const transContent = Common.transToViewAll(content)
        transContent.forEach((item, index) => {
            if(item.type == 'text'){
                item.valueArr.forEach((ite, ind) => {
                    resArr.push(<div key={ index+''+ind }>{ite}</div>)
                })
            }
        })
        return resArr
    }
    const title = () => {
        if(data.length === 0) return
        const name = data[0].name
        return(<h3>{name}</h3>)
    }
    return(
        <FadeTransitions>
            <div>
                <div>{title()}</div>
                <div>{ParagraphStyles.ContentStyles(renderContent())}</div>
            </div>
        </FadeTransitions>
    )
}

export default Dyna;