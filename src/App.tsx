import React, { lazy, Suspense } from 'react';

import { RecoilRoot } from 'recoil';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './pages/home';

function App() {
    return (
        <React.Fragment>
            <RecoilRoot>
                <Router>
                    <Switch>
                        <Route path="/" component={Home} />
                    </Switch>
                </Router>
            </RecoilRoot>
        </React.Fragment>
    );
}

export default App;
