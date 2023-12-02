import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'
import { Provider } from 'react-redux'
import store from './redux/appSlice'

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path : "/",
      element : <Login/>
    },
    {
      path : "/admin",
      element : <AdminDashboard/>
    }
    
  ])
  return (
    <div>
      <Provider store={store}>
      <RouterProvider router={appRouter}/>
      </Provider>
    </div>
  )
}

export default App


// src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
// import Login from './components/Login';
// import AdminDashboard from './components/AdminDashboard';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route exact path="/" component={Login} />
//         <Route exact path="/admin-dashboard" component={AdminDashboard} />
     
//       </Routes>
//     </Router>
//   );
// };

// export default App;


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <h1 className='text-blue-600'>Hiiiiii</h1>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
