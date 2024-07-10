import { IconType } from 'react-icons';

export interface Menu {
  id: number;
  name: string;
  url: string;
}

export interface Social {
  id: number;
  icon: IconType;
  name: string;
  url: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  skills: Skill[];
  isBuilding?: boolean;
}

type Skill = {
  id: number;
  label: string;
};
