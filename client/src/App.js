import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Landing,Error,ProtectedRoute,Home,UploadPin,CurrentUserVedios,SingleUserPins,SingleVedio} from  "./components/index.js"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/Home" element={
            <ProtectedRoute>
                <Home/>
            </ProtectedRoute>
          }/>
          <Route path="/uploadPin" element={<UploadPin/>}/>
          <Route path="/currentUserVedios" element={<CurrentUserVedios/>}/>
          <Route path="/singleUserPins/:id" element={<SingleUserPins/>}/>
          <Route path="/singleVedio/:pinId" element={<SingleVedio/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
