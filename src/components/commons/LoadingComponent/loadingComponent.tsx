import * as React from 'react';
import './loading.scss'
const LoadingComponent = () => {
    return (

            <div className="vertical-centered-box d-flex align-items-center justify-content-center">
                <div className="content-wrapper-loading">
                    <div className="loader-circle"/>
                    <div className="loader-line-mask">
                        <div className="loader-line"/>
                    </div>
                    <span className="icon-Unilever-Converted icon-loading-font"/>
                </div>
            </div>


    );

}
export default LoadingComponent;
