import React, {useState, useEffect, useMemo} from 'react';
import "./style.scss"

interface Iprops {
    message?: string
}

const NoPermission = (props: Iprops) => {
    return (
        <div className="no-permission d-flex">
            <div className='no-permission-main mx-auto'>
                <i className="fas fa-lock fa-4x text-danger"/>
                <h3 style={{color: "red"}}>{props.message}</h3>
            </div>
        </div>
    )
};
export default NoPermission;
