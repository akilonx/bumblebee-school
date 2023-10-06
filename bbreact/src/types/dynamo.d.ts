import { UserRoles } from "./UserRoles";

// export interface UserConnectionRecord {
//   id: string;
//   pk: string;
//   sk: string;
//   domainName: string;
//   stage: string;
//   ttl: number;
// }

export interface ResidenceRecord {
  id: string; // residenceId
  pk: string; // residence
  sk: string; // ${timestamp}
  residenceName: string;
  ownerId: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  phone: string;
  email: string;
  website: string;
  facebook: string;
  twitter: string;
  instagram: string;
  longitude: string;
  latitude: string;
  createdAt: string;
  updatedAt: string;
}
export interface UserRolesRecord {
  id: string; // id
  pk: string; // roles#${residenceId}#${userId}
  sk: string; // roles#${role}
  role: UserRoles;
  createdAt: string;
  updatedAt: string;
}

export interface UserApprovalRecord {
  id: string; // id
  pk: string; // approval#(new|rejected|verified)#${residenceId}
  sk: string; // userId#${userId}
  residenceId: string;
  userId: string;
  rejectedAt: string;
  rejectedBy: string;
  verifiedAt: string;
  verrifiedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserRecord {
  id: string; // userId
  pk: string; // user#${residenceId}
  sk: string; // homeaddress#${streetName}#${houseNo}
  email: string;
  name: string;
  houseNo: string;
  streetName: string;
  mobile: string;
  mobileExtra: string;
  phone: string;
  avatar: string;
  active: string;
  createdAt: string;
  updatedAt: string;
  residenceId: string;
}

export interface S3UploadRecord {
  id: string; // uploadId
  pk: string; // upload#${residenceId}
  sk: string; // ${uploadType}#${userId}#${timestamp}
  uploadType: string;
  uploadName: string;
  uploadKey: string;
  uploadUrl: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  residenceId: string;
}

export interface PaymentRecord {
  id: string;
  pk: string; // payment#{residenceId}
  sk: string; // userId#{userId}
  userId: string;
  paymentDate: string;
  totalMonth: string;
  totalPayment: string;
  remarks: string;
  paymentType: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  residenceId: string;
}
