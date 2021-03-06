import axios from 'axios'
import { Toast } from 'antd-mobile'
import CONFIG from '../config'
import Common from '../components/Common/Common'

axios.defaults.withCredentials = true;

const api = async params => {
    const method = params.method ? params.method : 'get';
    const { url, queryData, formData, reloadUrl, header } = params;
    const lj_token = Common.getAuthToken();
    try {
        const result = await axios({
            method,
            url: reloadUrl ? url : CONFIG.url(url),
            data: formData,
            params: queryData,
            headers: header ? header : { lj_token },
        });
        if (result.data.code !== 200) Toast.info(result.data.msg);
        return result.data;
    } catch (error) {
        Toast.info(error.message);
        return false;
    }
}

export default api;