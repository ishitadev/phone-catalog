import { Switch, Route, withRouter } from 'react-router'

import MobileList from './Components/MobileCatalog/MobileList';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={MobileList} />
      </Switch>
    </>
  );
}


export default withRouter(App);