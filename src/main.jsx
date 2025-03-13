import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/style/index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import {ChatButton} from './cmps/ChatButton.jsx'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
        <ChatButton />
    </Provider>
);
