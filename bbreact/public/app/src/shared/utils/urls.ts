/*********************************************************
 * URL
 *********************************************************/

const domainRegex =
  /^(www|www2|my|test|.+?app|app)?(\.\w+)?(\.configura\.com|\.cetexperience\.com|\.delaval\.com|\.configuracloud\.com)?(.cn)?$/;
export function checkDomain(domain: string) {
  return domain.match(domainRegex);
}

export function checkMyDomain(domain: string) {
  const match = checkDomain(domain);
  return match !== null && match[1] === "my";
}

export function checkWWWDomain(domain: string) {
  const match = checkDomain(domain);
  return match !== null && match[1] === "www";
}

export function checkDevDomain(domain: string) {
  const match = checkDomain(domain);
  return match !== null && match[2] !== undefined;
}

export function isDevDomain() {
  return checkDevDomain(window.location.hostname);
}

export function apiURL(endpoint: string) {
  if (process.env.REACT_APP_MYCONFIGURA_PERL_API_URL) {
    return `${process.env.REACT_APP_MYCONFIGURA_PERL_API_URL}/api/v3/${endpoint}`;
  } else {
    // Handles calls to my.configura.com
    // Used for the menu
    return `/api/v3/${endpoint}`;
  }
}

export interface MyURLProps {
  page?: string;
  section?: string;
  subsection?: string;
  anchor?: string;
  [key: string]: Option<string>;
}

export function generateQueryString(parameters: MyURLProps) {
  return Object.keys(parameters)
    .map((key) => key + "=" + parameters[key])
    .join("&");
}

export function myURL(props: MyURLProps) {
  const origin = getMyConfiguraOrigin();

  let anchor = "";
  if (props.anchor) {
    anchor = "#" + props.anchor;
    delete props.anchor;
  }

  const query = generateQueryString(props);
  return `${origin}/index.pl?${query}${anchor}`;
}

export interface MyConfiguraURLProps {
  path?: string;
  anchor?: string;
  [key: string]: Option<string>;
}

export function myConfiguraURL(props: MyConfiguraURLProps) {
  const origin = getMyConfiguraOrigin();
  let anchor = "";
  if (props.anchor) {
    anchor = "#" + props.anchor;
    delete props.anchor;
  }

  let path = props.path;
  delete props.path;

  let query = generateQueryString(props);
  if (query !== "") {
    query = `?${query}`;
  }

  return `${origin}${path}${query}${anchor}`;
}

export interface AppURLProps {
  page?: string;
  anchor?: string;
  [key: string]: Option<string>;
}

export function appURL(props: AppURLProps) {
  let anchor = "";
  if (props.anchor) {
    anchor = "#" + props.anchor;
    delete props.anchor;
  }

  let page = props.page;
  delete props.page;

  const query = generateQueryString(props);
  if (query !== "") {
    page = `${page}?`;
  }

  return `${APP_URL}/${page}${query}${anchor}`;
}

export function getMyConfiguraOrigin() {
  const hostname = window.location.hostname.replace(
    /^(app|.+-app|www\d?)(?=\.)/,
    "my"
  );

  if (hostname === "") {
    return hostname;
  }
  return `https://${hostname}`;
}

export function getConfiguraOrigin() {
  const hostname = window.location.hostname
    .replace(/^(my|app|.+-app)/, "www")
    .replace(/\.cn/, "");
  if (hostname === "") {
    return hostname;
  }
  return `https://${hostname}`;
}

export function getCookieDomain() {
  return window.location.hostname
    .replace(/^my./, "")
    .replace(/(www\d?)./, "")
    .replace(/^(app|.+-app|www\d?)(?=\.)/, "");
}

export function getChinaOrigin() {
  if (process.env.NODE_ENV !== "production") {
    return `${getConfiguraOrigin()}/china`;
  } else {
    return `${getConfiguraOrigin()}.cn`;
  }
}

export function getPath(domain: string, url: string) {
  return url.replace(domain, "");
}

export function isValidHttpUrl(url: string | undefined) {
  if (!url) {
    return false;
  }

  var rgHttpUrl = new RegExp(
    "^(http|https):\\/\\/(([a-zA-Z0-9$\\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\\-\\u00C0-\\u017F]+\\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\\/(([a-zA-Z0-9$\\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\\/([a-zA-Z0-9$\\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\\?([a-zA-Z0-9$\\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?(\\#([a-zA-Z0-9$\\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?)?$"
  );

  if (rgHttpUrl.test(url)) {
    return true;
  } else {
    return false;
  }
}

/*********************************************************
 * Static variables
 *********************************************************/

export const STATIC_URL = "https://downloads.configura.com";
export const SUPPORT_URL = "https://support.configura.com";
export const SUPPORT_AGREEMENT_URL = `${STATIC_URL}/marketing/resources/Configura%20Support%20Agreement.pdf`;
export const LICENSE_AGREEMENT_URL = `${STATIC_URL}/marketing/resources/Configura%20License%20Agreement.pdf`;
export const LICENSE_AGREEMENT_URL_ZH = `${STATIC_URL}/marketing/resources/Configura%20License%20Agreement%20CN.pdf`;
export const WWW_URL =
  process.env.REACT_APP_WWW_URL ||
  `https://${process.env.MYCONFIGURA_DOMAIN_WWW}`;
export const APP_URL =
  process.env.REACT_APP_APP_URL ||
  `https://${process.env.MYCONFIGURA_DOMAIN_APP}`;
