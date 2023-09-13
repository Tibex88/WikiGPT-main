//router
import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'


//layout
import RootLayout from './layouts/RootLayout';


//pages
import Explore from "./pages/Explore"
import ChatPage from './pages/ChatPage';
import Settings from './pages/Settings';
import History from './pages/History';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Explore />} />

      <Route path="chat" >
        <Route path=":id" element={<ChatPage />} />
      </Route>

      <Route path="settings" element={<Settings />} />

      <Route path="explore" element={<Explore />} />

      <Route path="history" element={<History />} />

      <Route path="profile" element={<Profile />} />

      <Route path="*" element={<NotFound />} />

    </Route>
    )
)

function App() {
  return ( 
  // <RootLayout />/
  <RouterProvider router={router} />
  )
}

export default App