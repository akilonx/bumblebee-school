import { v4 as uuid } from "uuid";

import {
  ResidenceRecord,
  UserApprovalRecord,
  UserRecord,
  UserRolesRecord,
} from "../types/dynamo";

const residenceId = uuid();
const adminUserId = "34d8f4c8-f011-709f-ce29-96cc8f1f02a0";

const residenceUserEmail = "cynyen@gmail.com";

const residenceName = "Bandar Rimbayu";
const residenceOwnerId = adminUserId;
const residenceAddress =
  "Bandar Rimbayu, Teluk Panglima Garang, 42500, Selangor";
const residenceCity = "Teluk Panglima Garang";
const residenceState = "Selangor";
const residenceCountry = "Malaysia";
const residenceZip = "42500";
const residencePhone = "03-12345678";
const residenceEmail = "management.bandarrimbayu@gmail.com";
const residenceWebsite = "https://www.bandarrimbayu.com/";
const residenceFacebook = "https://www.facebook.com/bandarrimbayu/";
const residenceTwitter = "https://twitter.com/bandarrimbayu";
const residenceInstagram = "https://www.instagram.com/bandarrimbayu/";
const residenceLongitude = "101.5083";
const residenceLatitude = "2.9671";
const residenceCreatedAt = new Date().toISOString();
const residenceUpdatedAt = new Date().toISOString();

//5, Jalan Flora 3G/3 Bandar Rimbayu, Teluk Panglima Garang, 42500, Selangor.

const residenceRecords: ResidenceRecord[] = [
  {
    id: residenceId,
    pk: `residence`,
    sk: `zip#${residenceZip}#city#${residenceCity}#state#${residenceState}#country#${residenceCountry}`,
    residenceName: residenceName,
    ownerId: residenceOwnerId,
    address: residenceAddress,
    city: residenceCity,
    state: residenceState,
    country: residenceCountry,
    zip: residenceZip,
    phone: residencePhone,
    email: residenceEmail,
    website: residenceWebsite,
    facebook: residenceFacebook,
    twitter: residenceTwitter,
    instagram: residenceInstagram,
    longitude: residenceLongitude,
    latitude: residenceLatitude,
    createdAt: residenceCreatedAt,
    updatedAt: residenceUpdatedAt,
  },
];

const userRecord: UserRecord[] = [
  {
    id: uuid(),
    pk: `user#${residenceId}`, // user#0cdbbcf0-7aec-422b-a591-766fcf12f316
    sk: `new#`, //homeaddress#JALANPIPIT2211#38 // new# for first time user
    name: "Cynthia Yen",
    houseNo: "5",
    streetName: "Jalan Flora 3G/3",
    mobile: "012-3456789",
    mobileExtra: "012-3456789",
    phone: "03-12345678",
    email: residenceUserEmail,
    createdAt: residenceCreatedAt,
    active: "true",
    avatar: "",
    updatedAt: "",
    residenceId: residenceId,
  },
];

const userRoles: UserRolesRecord[] = [
  {
    id: uuid(),
    pk: `roles#${residenceId}#${adminUserId}`,
    sk: `roles#admin`,
    role: "admin",
    createdAt: residenceCreatedAt,
    updatedAt: residenceUpdatedAt,
  },
];

const userApprovalRecords: UserApprovalRecord[] = [
  {
    id: uuid(),
    pk: `approval#new#${residenceId}`,
    sk: `userId#${adminUserId}`,
    residenceId: residenceId,
    userId: adminUserId,
    verifiedAt: residenceCreatedAt,
    verrifiedBy: adminUserId,
    rejectedAt: "",
    rejectedBy: "",
    createdAt: residenceCreatedAt,
    updatedAt: residenceUpdatedAt,
  },
];

export {
  residenceRecords,
  userRecord as residenceUserRecords,
  userApprovalRecords,
  userRoles,
};
