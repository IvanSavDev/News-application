import { Route, Switch } from 'react-router-dom';
import MainPage from './MainPage';
import NewsPage from './NewsPage';

const App = () => (
  <Switch>
    <Route exact path="/" component={MainPage} />
    <Route path="/news" component={NewsPage} />
  </Switch>
);

export default App;
