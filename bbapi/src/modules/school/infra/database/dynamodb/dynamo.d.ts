export interface StudentRecord {
  id: string;
  pk: string; // payment#{residenceId}
  sk: string; // userId#{userId}
  fullName: string;
  email: string;
  mobile: string;
  guardianName: string;
  guardianMobile: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}
