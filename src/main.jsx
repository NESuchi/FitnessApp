import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from "./pages/Home";
import FoodTracker from './pages/FoodTracker.jsx'
import Exercises from './pages/Exercises.jsx'
import Profile from './pages/Profile.jsx'
import Kalender from './pages/Kalender.jsx'
import Datenschutz from './pages/Datenschutz.jsx'
import Impressum from './pages/Impressum.jsx'
import UeberUns from './pages/UeberUns.jsx'
import NotFound from './pages/NotFound.jsx'
import Login from './pages/Login.jsx'

import { Provider } from 'react-redux'
import store from './reducer/store.js'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
      {
        index: true,
        element:<Home />
      },
      {
        path:"/food-tracker",
        element:<FoodTracker />
      },
      {
        path:"/exercises",
        element:<Exercises />
      },
      {
        path:"/profile",
        element:<Profile />
      },
      {
        path:"/kalender",
        element:<Kalender />
      },
      {
        path:"/datenschutz",
        element:<Datenschutz />
      },
      {
        path:"/impressum",
        element:<Impressum />
      },
      {
        path:"/ueber-uns",
        element:<UeberUns />
      },
    ]
  },
  {
    path:"/login",
    element:<Login />
  },
  {
    path:"*",
    element:<NotFound />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
