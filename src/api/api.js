import axios from 'axios'
import { Toast } from 'antd-mobile'
import CONFIG from '../config'
import Common from '../components/Common/Common'

const api = async params => {
    const method = params.method ? params.method : 'get';
    const { url, queryData, formData, reloadUrl } = params;
    const lj_token = Common.getAuthToken();
    try {
        const result = await axios({
            method,
            url: reloadUrl ? url : CONFIG.url(url),
            data: formData,
            params: queryData,
            headers: { lj_token },
        });
        if (result.data.code !== 200) Toast.info(result.data.msg);
        return result.data;
    } catch (error) {
        Toast.info(error.message);
        return false;
    }
}

export default api;