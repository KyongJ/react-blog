import React from 'react';
import Home from '@/pages/home';

import { RecoilRoot } from 'recoil';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

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
