import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import MainPage from './MainPage/MainPage';
import NewsPage from './NewsPage/NewsPage';

const Container = styled.div`
  background: #081827;
  min-height: 100vh;
  color: white;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 960px;
  min-height: 100vh;
  background-color: #001e3a;
  padding: 15px;
`;

const App = () => (
  <Container>
    <Wrapper>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/news/:id" component={NewsPage} />
      </Switch>
    </Wrapper>
  </Container>
);

export default App;
