import Loadable from 'react-loadable';
import LoadingComponent from './LoadingComponent'

const LazyHome = Loadable({
    loader: () => import('../../containers/Home'),
    loading: LoadingComponent
});

export default LazyHome;