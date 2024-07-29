import { HashRouter, Route, Routes } from 'react-router-dom'
import StreamPage from './features/stream/StreamPage'
import AuthProvider from './features/stream-auth/StreamAuthProvider'
import StreamAuthPage from './features/stream-auth/StreamAuthPage'
import RequireStreamAuth from './features/stream-auth/RequireStreamAuth'
import PublisherList from './features/publishers/PublisherList'
import NotificationsProvider from './features/notifications/NotificationsProvider'
import './features/common/i18n'
import PublisherSave from './features/publishers/PublisherSave'
import NotFound from './features/common/NotFound'
import ModalProvider from './features/modal/ModalProvider'

function App() {

  return (
      <ModalProvider>
        <AuthProvider>
          <NotificationsProvider>
            <HashRouter>
              <Routes>
                <Route path='/admin/publicadores' element={<PublisherList />} />
                <Route path='/admin/publicadores/crear' element={<PublisherSave />} />
                <Route path='/admin/publicadores/editar/:id' element={<PublisherSave />} />


                <Route path='/streaming/login' element={<StreamAuthPage />} />
                <Route path='/streaming' element={<RequireStreamAuth><StreamPage /></RequireStreamAuth>} />
                <Route path='/' element={<RequireStreamAuth><StreamPage /></RequireStreamAuth>} />

                <Route path='*' element={<NotFound />} />
              </Routes>
            </HashRouter>
          </NotificationsProvider>
        </AuthProvider>
      </ModalProvider>
  )
}

export default App
