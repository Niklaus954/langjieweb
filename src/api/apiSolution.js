import api from './api'

const fetchActionPlat = async() => {
    const result = await api({
        url: '/open/knowledge/87'
    })
    return result
}

const fetchCtrlProducts = async() => {
    const result = await api({
        url: '/open/knowledge/88'
    })
    return result
}

const fetchApplication = async() => {
    const result = await api({
        url: '/open/knowledge/89'
    })
    return result
}

const fetchActionTool = async() => {
    const result = await api({
        url: '/open/knowledge/81'
    })
    return result
}

const fetchActionCloud = async() => {
    const result = await api({
        url: '/open/knowledge/79'
    })
    return result
}

const fetchActionTeam = async() => {
    const result = await api({
        url: '/open/knowledge/80'
    })
    return result
}

const fetchVir = async() => {
    const result = await api({
        url: '/open/knowledge/91'
    })
    return result
}

const fetchDyna = async() => {
    const result = await api({
        url: '/open/knowledge/92'
    })
    return result
}

const fetchVirInfo = async params => {
    const result = await api({
        url: `/open/knowledge/${params.virProId}`
    })
    return result
}

const fetchDynaInfo = async params => {
    const result = await api({
        url: `/open/knowledge/${params.dynaProId}`
    })
    return result
}
const fetchMaxTest = async() => {
    const result = await api({
        url: '/open/knowledge/85'
    })
    return result
}

const fetchDynaTest = async() => {
    const result = await api({
        url: '/open/knowledge/86'
    })
    return result
}

export default {
    fetchActionPlat,
    fetchApplication,
    fetchCtrlProducts,
    fetchActionTool,
    fetchActionCloud,
    fetchActionTeam,
    fetchDyna,
    fetchDynaInfo,
    fetchVir,
    fetchVirInfo,
    fetchDynaTest,
    fetchMaxTest
}