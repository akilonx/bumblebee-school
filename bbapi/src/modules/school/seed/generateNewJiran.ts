import {
  ResidenceRecord,
  UserApprovalRecord,
  UserRecord,
  UserRolesRecord,
} from "../application/model_adapters/dynamo";

import {
  residenceRecords,
  residenceUserRecords,
  userApprovalRecords,
  userRoles,
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
