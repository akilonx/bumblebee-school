import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { setupStore } from "@infra/redux/store";
import { Amplify } from "aws-amplify";

import { ErrorNotFound } from "@component/ErrorNotFound";
import { AuthService } from "@infra/services/AuthService";
import { JWTTokenClaims } from "@infra/services/models/tokens";
import Layout from "@layout/DefaultLayout";
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

  return (
    <Authenticator>
      {({ signOut, user }) => {
        const authService = new AuthService();
        const accessToken =
          user?.getSignInUserSession()?.getAccessToken().getJwtToken() || "";
        const refreshToken =
          user?.getSignInUserSession()?.getRefreshToken().getToken() || "";

        const claims: JWTTokenClaims = {
          userId: user?.username || "",
          email: user?.attributes?.email || "",
        };

        authService.setToken("access-token", accessToken);
        authService.setToken("refresh-token", refreshToken);
        authService.setClaims(claims);

        return <RouterProvider router={router} />;
      }}
    </Authenticator>
  );
}

export default App;
