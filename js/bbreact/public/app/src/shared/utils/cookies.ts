import * as urls from "./urls";

export const NAMES = {
	USER: "myconfigura-user",
	DIGEST: "myconfigura-digest",
	SESSION: "myconfigura-session",

	ADMIN_USER: "myconfigura-admin-user",
	ADMIN_DIGEST: "myconfigura-admin-digest",
	ADMIN_SESSION: "myconfigura-admin-session",

	CSRF_TOKEN: "myconfigura-csrf-token",

	LANGUAGE: "myconfigura-language",

	TIMEZONE: "myconfigura-timezone",
	TIMEZONE_OFFSET: "myconfigura-timezoneOffset",

	MYCONFIGURA_TEST_MODE_PASSCODE: "myconfigura-test-mode-passcode",
	MYCONFIGURA_TEST_MODE_EMAIL: "myconfigura-test-mode-email",

	CLEAR_REACT_MENU_DATA: "myconfigura-clear-react-menu-data",

	WHATS_NEW: "myconfigura-whats-new",

	ZENDESK_LOGIN: "zendesk-login",
};

export function set(cname: string, cvalue: any, daysToExpiry: number, domain?: string) {
	const d = new Date();
	d.setTime(d.getTime() + daysToExpiry * 24 * 60 * 60 * 1000);
	const expires = "expires=" + d.toUTCString();
	let setDomain = "";
	if (domain) {
		setDomain = "; domain=" + domain;
	}

	document.cookie = `${cname}=${cvalue}; ${expires}; path=/ ${setDomain}`;
}

export function get(cname: string): Option<string> {
	const cookies = document.cookie.split(";");
	for (const cookie of cookies) {
		const attributes = cookie.split("=");
		if (attributes.length < 2) {
			continue;
		}
		const name = attributes[0].trim();
		const value = attributes[1].trim();
		if (name === `${cname}`) {
			return value;
		}
	}
}

// "delete" is a reserved keyword
export function remove(name: string, domain?: string) {
	set(`${name}`, "", -1, domain);
}

export function setMyConfiguraCookie(name: string, value: any, daysValid: number, domain?: string) {
	const cookieName = urls.isDevDomain() ? name + "-dev" : name;
	set(cookieName, value, daysValid, domain);
}

export function getMyConfiguraCookie(name: string) {
	const cookieName = urls.isDevDomain() ? name + "-dev" : name;
	return get(cookieName);
}

export function deleteMyConfiguraCookie(name: string, domain?: string) {
	const cookieName = urls.isDevDomain() ? name + "-dev" : name;
	remove(cookieName, domain);
}
