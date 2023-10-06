export interface AnnouncementRecord {
  id: string;
  pk: string; //annnouncement#<announcementType>
  sk: string; //timestamp
  title: string;
  shortDescription: string;
  description: string;
  scheduleTime: string;
  logo: string;
  detailLogo: string;
  videoUrl: string;
  allowRegistration: boolean;
  contactEmail: string;
  location: string;
}

export interface AnnouncementTypeRecord {
  id: string; // annoucementTypeId
  pk: string; //announcementType
  sk: string; //timestamp
  title: string;
  shortDesc: string;
  description: string;
}
