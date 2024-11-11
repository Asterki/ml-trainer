import { createBrowserRouter } from 'react-router-dom'

import IndexPage from './index'

const router = createBrowserRouter([
	{
		path: '/',
		element: <IndexPage />,
	},
])

export default router
