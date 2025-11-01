import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/HomePage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />}>
          <Route path='checkout' element={<div>Test checkout Page</div>} />
        </Route>
      </Routes>
    </>
  )
}

export default App

