import '@aws-amplify/ui-react/styles.css';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { ErrorNotFound } from '@component/ErrorNotFound';
import { setupStore } from '@infra/redux/store';
import { AuthService } from '@infra/services/AuthService';
import Layout from '@layout/Layout';
import { Amplify } from 'aws-amplify';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import amplifyConfig from './config/aws-exports';
import routes from './routes';

Amplify.configure(amplifyConfig);

const router = createBrowserRouter([
	{
		element: <Layout />,
		errorElement: <ErrorNotFound />,
		children: routes,
	},
]);

function App() {
	setupStore();
	const { user } = useAuthenticator();

	useEffect(() => {
		if (user != null) {
			AuthService.setUserTokens(user);
		}
	}, [user]);

	return <RouterProvider router={router} />;
}

export default App;
