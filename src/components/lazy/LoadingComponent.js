import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div style={{width: '100%', textAlign: 'center', padding: 20}}>
            <CircularProgress />
        </div>;
    } else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    } else {
        return null;
    }
};

export default LoadingComponent;