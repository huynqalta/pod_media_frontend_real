import React from 'react';
import './style.scss'

const PageNotFound = (props) => {
    return (
        <>
            <div className="page-404">


                <h1>404 Page Not Found</h1>
                <section className="error-container">
                    <span className="four"><span className="screen-reader-text">4</span></span>
                    <span className="zero"><span className="screen-reader-text">0</span></span>
                    <span className="four"><span className="screen-reader-text">4</span></span>
                </section>
            </div>

        </>
    )
};
export default PageNotFound
