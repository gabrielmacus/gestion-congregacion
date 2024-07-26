import { HashRouter, Route, Routes } from 'react-router-dom'
import StreamPage from './features/stream/StreamPage'
import AuthProvider from './features/stream-auth/StreamAuthProvider'
import StreamAuthPage from './features/stream-auth/StreamAuthPage'
import RequireStreamAuth from './features/stream-auth/RequireStreamAuth'
import PublisherList from './features/publishers/PublisherList'
import NotificationsProvider from './features/notifications/NotificationsProvider'
import './features/common/i18n'
import { ConfigProvider, theme } from 'antd'
import PublisherSave from './features/publishers/PublisherSave'
import NotFound from './features/common/NotFound'
import useModal from 'antd/es/modal/useModal'
import ModalProvider from './features/modal/ModalProvider'

function App() {

  return (
    <ConfigProvider
      theme={{
        cssVar: true,
        hashed: false,
         algorithm:theme.darkAlgorithm,
        token:{
          

        }
        /*token: {
          // Seed Token
          colorPrimary: '#00b96b',
          borderRadius: 0,
          

          // Alias Token
          colorBgContainer: '#f6ffed',
        }*/
      }}
    >
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
    </ConfigProvider>
  )
}

export default App
