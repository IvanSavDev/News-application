import { Box, Container } from '@mui/material';
import { Route, Switch } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import NewsPage from './NewsPage';

const App = () => (
  <Box
    sx={{
      background: '#081827',
      minHeight: '100vh',
      color: 'white',
    }}
  >
    <Container
      maxWidth="sm"
      sx={{ background: '#001e3a', minHeight: '100vh', padding: '15px' }}
    >
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/news" component={NewsPage} />
      </Switch>
    </Container>
  </Box>
);

export default App;
