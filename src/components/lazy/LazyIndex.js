import Loadable from 'react-loadable';
import LoadingComponent from './LoadingComponent'

const LazyIndex = Loadable({
    loader: () => import('../../containers/Index'),
    loading: LoadingComponent
});

export default LazyIndex;