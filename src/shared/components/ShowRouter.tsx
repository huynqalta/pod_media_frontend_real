import React from 'react';
import {Route, Switch} from 'react-router-dom';

const ShowRouter = ({routers}) => {
    const result = routers.map((router: any, index: number) => {
        return (
            <Route
                key={router.path}
                path={router.path}
                exact={router.exact}
                component={router.main}
            />
        );
    });

    return <Switch>{result}</Switch>;
};

export default ShowRouter;
