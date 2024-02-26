import React from 'react';

const LoadingComponent = () => {
    return (
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
};

export default LoadingComponent;
