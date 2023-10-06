import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { AlertTemplate } from "@component/NewAlert";
import { setupStore } from "@infra/redux/store";
import MainRoute from "@routes/MainRoute";
import { Amplify } from "aws-amplify";
import { Provider as AlertProvider, positions, transitions } from "react-alert";

import { AuthService } from "@infra/services/AuthService";
import { JWTTokenClaims } from "@infra/services/models/tokens";
import amplifyConfig from "./config/aws-exports";
import "./scss/common.scss";

Amplify.configure(amplifyConfig);

export interface CognitoProps {
  signOut?: () => void;
}

function App() {
  setupStore();
  const alertOptions = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: "53px",
    transition: transitions.SCALE,
  };

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

        return (
          <AlertProvider template={AlertTemplate} {...alertOptions}>
            <MainRoute signOut={signOut} />
          </AlertProvider>
        );
      }}
    </Authenticator>
  );
}

export default App;
