import Loadable from 'react-loadable';
import LoadingComponent from './LoadingComponent'

const LazyShop = Loadable({
    loader: () => import('../../containers/Shop'),
    loading: LoadingComponent
});

export default LazyShop;