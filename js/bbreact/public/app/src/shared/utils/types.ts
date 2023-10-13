/*********************************************************
 * All interfaces here should have a corresponding
 * function in perl/API/Types
 *
 * xxxLW - xxx Light Weight: minimal version of Type xxx
 *********************************************************/

/*********************************************************
 * Customer
 *********************************************************/

/*********************************************************
 * Licenses
 *********************************************************/

export type LicenseType = 'payable' | 'trial' | 'free' | 'sponsored' | 'education' | 'internal';
export type LicenseValidity = 'year' | 'month' | 'halfyear' | 'infinite' | 'custom';

export default {};
