import { useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { setupStore } from "@infra/redux/store";
import { Amplify } from "aws-amplify";

import { ErrorNotFound } from "@component/ErrorNotFound";
import { AuthService } from "@infra/services/AuthService";
import Layout from "@layout/Layout";
import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import amplifyConfig from "./config/aws-exports";
import routes from "./routes";

Amplify.configure(amplifyConfig);

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorNotFound />,
    children: routes,
  },
]);

export interface CognitoProps {
  signOut?: () => void;
}

function App() {
  setupStore();

  const { user } = useAuthenticator();

  useEffect(() => {
    if (user) {
      AuthService.setUserTokens(user);
    }
  }, [user]);

  return <RouterProvider router={router} />;
}

export default App;
