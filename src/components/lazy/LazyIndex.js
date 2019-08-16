import Loadable from 'react-loadable';
import LoadingComponent from './LoadingComponent'

const LazyIndex = Loadable({
    loader: () => import('../Index.jsx'),
    loading: LoadingComponent
});

export default LazyIndex;