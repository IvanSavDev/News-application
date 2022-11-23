import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import MainPage from './Components/MainPage/MainPage';
import NewsPage from './Components/NewsPage/NewsPage';

const Container = styled.div`
  background: #081827;
  min-height: 100vh;
  color: white;
`;

const Wrapper = styled.div`
  display: flex;
  /* flex-direction: column;
  align-items: center; */
  justify-content: center;
  margin: 0 auto;
  max-width: 960px;
  min-height: 100vh;
  background-color: #001e3a;
  padding: 15px;
  gap: 10px;
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
