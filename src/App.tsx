import { HashRouter, Route, Routes } from 'react-router-dom'
import StreamPage from './modules/stream/StreamPage'
import AuthProvider from './modules/stream-auth/StreamAuthProvider'
import StreamAuthPage from './modules/stream-auth/StreamAuthPage'
import RequireStreamAuth from './modules/stream-auth/RequireStreamAuth'

function App() {

  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path='/streaming/login' element={<StreamAuthPage />} />
          <Route path='/streaming' element={<RequireStreamAuth><StreamPage /></RequireStreamAuth>} />
          <Route path='/' element={<RequireStreamAuth><StreamPage /></RequireStreamAuth>} />

        </Routes>
      </HashRouter>
    </AuthProvider>
  )
}

export default App
