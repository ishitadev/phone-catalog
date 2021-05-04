import { Switch, Route, withRouter } from 'react-router'

import AddLanguage from './Components/Language/AddLanguage';
import LanguageList from './Components/Language/LanguageList';
import EditLanguage from './Components/Language/EditLanguage';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={LanguageList} />
        <Route path="/addlanguage" exact component={AddLanguage} />
        <Route path="/editlanguage/:id" exact component={EditLanguage} />
      </Switch>
    </>
  );
}


export default withRouter(App);