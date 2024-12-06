import React from 'react'
import ReactDOM from 'react-dom/client'

import { store } from './store'
import { Provider } from 'react-redux'

import './index.css'

import { RouterProvider } from 'react-router-dom'
import router from './pages/router'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider
				router={router}
				future={{
					v7_startTransition: true,
				}}
				fallbackElement={<div>Loading...</div>}
			/>
		</Provider>
	</React.StrictMode>,
)
