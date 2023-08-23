import { Routes, Route } from 'react-router-dom';
import { AppContainer } from './style/App.styled';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import MyPage from './pages/MyPage/MyPage';
import AddQuestion from './pages/AddQuestion/AddQuestion';
import DetailQuestion from './pages/DetailQuestion/DetailQuestion';

function App() {
  return (
    <AppContainer>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Main />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/add-question" element={<AddQuestion />} />
        <Route path="/questions/:id" element={<DetailQuestion />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
