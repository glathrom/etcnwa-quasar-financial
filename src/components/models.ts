export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface UserIfce {
  last_login: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  id: number;
  is_active: boolean;
  date_joined: string;
}

export interface ChildIfce {
  id: number;
  first_name: string;
  last_name: string;
  health: string;
  neurodiversity: string;
  gender: string;
  dob: string;
  current: boolean;
  checkedin: boolean;
  family: number;
}

export interface FamilyIfce {
  id: number;
  primary_first_name: string;
  primary_last_name: string;
  primary_phone: string;
  primary_email: string;
  secondary_first_name: string;
  secondary_last_name: string;
  secondary_phone: string;
  secondary_email: string;
  emergency_contact: string;
  pickup: string;
  hold_checkin: boolean;
  kids?: ChildIfce[];
}
