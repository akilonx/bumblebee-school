import { JWTToken, JWTTokenClaims, RefreshToken } from "./models/tokens";

type TokenType = "access-token" | "refresh-token";

export interface IAuthService {
  isAuthenticated(): boolean;
  getToken(tokenType: TokenType): JWTToken | RefreshToken;
  setToken(tokenType: TokenType, token: JWTToken | RefreshToken): void;
  removeToken(tokenType: TokenType): void;
  setClaims(claims: JWTTokenClaims): void;
  getClaims(): JWTTokenClaims;
}

export class AuthService implements IAuthService {
  public static accessTokenName: string = "bumblebee-access-token";
  public static refreshTokenName: string = "bumblebee-refresh-token";
  public static tokenClaimsName: string = "bumblebee-token-claims";

  public accessToken: JWTToken;
  public refreshToken: RefreshToken;

  constructor() {
    this.accessToken = this.getToken("access-token");
    this.refreshToken = this.getToken("refresh-token");
  }

  private getTokenName(tokenType: TokenType): string {
    return tokenType === "access-token"
      ? AuthService.accessTokenName
      : AuthService.refreshTokenName;
  }

  public getToken(tokenType: TokenType): JWTToken | RefreshToken {
    const tokenName: string = this.getTokenName(tokenType);

    const token = localStorage.getItem(tokenName);
    return token ? JSON.parse(token).token : null;
  }

  public setToken(tokenType: TokenType, token: JWTToken | RefreshToken): void {
    var d = new Date();
    d.setTime(d.getTime() + 30 * 60 * 1000); // set cookie to last 30 mins

    const tokenName: string = this.getTokenName(tokenType);

    localStorage.setItem(
      tokenName,
      JSON.stringify({
        token: token,
        expires: d,
      })
    );
  }

  public removeToken(tokenType: TokenType): void {
    const tokenName: string = this.getTokenName(tokenType);
    localStorage.removeItem(tokenName);
  }

  isAuthenticated(): boolean {
    return this.getToken("access-token") !== null;
  }

  setClaims(claims: JWTTokenClaims): void {
    localStorage.setItem(AuthService.tokenClaimsName, JSON.stringify(claims));
  }

  getClaims(): JWTTokenClaims {
    const claims = localStorage.getItem(AuthService.tokenClaimsName);
    return claims ? JSON.parse(claims) : null;
  }

  static setUserTokens(user: any) {
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
  }
}
