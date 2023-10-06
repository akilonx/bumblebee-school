import {
  ResidenceRecord,
  UserRecord,
  UserRolesRecord,
  UserApprovalRecord,
} from "../types/dynamo";

import {
  residenceRecords,
  residenceUserRecords,
  userRoles,
  userApprovalRecords,
} from "./rawData";

type Records =
  | ResidenceRecord
  | UserRecord
  | UserApprovalRecord
  | UserRolesRecord;

const seedDataGenerator = () => {
  const records: Records[] = [];

  records.push(...residenceRecords);
  records.push(...residenceUserRecords);
  records.push(...userRoles);
  records.push(...userApprovalRecords);

  return records;
};

export default seedDataGenerator;
