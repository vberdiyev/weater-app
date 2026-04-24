import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Page from './pages/Page'
import Settings from './pages/Settings'
function App(){
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Page/>} />
      <Route path="/settings" element={<Settings />} />   
      </Routes>
    </BrowserRouter>
    </>
  )
}
export default App