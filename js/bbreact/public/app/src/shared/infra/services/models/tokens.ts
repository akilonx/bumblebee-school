export type JWTToken = string;

export type RefreshToken = string;

export type JWTTokenClaims = {
	userId: string;
	email: string;
	sessionId?: string;
	// isEmailVerified: boolean;
	// adminUser: boolean;
};
