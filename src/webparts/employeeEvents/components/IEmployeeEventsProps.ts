/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPersonService } from "../service/IPersonService";
import { Person } from "../service/Person";

export interface IEmployeeEventsProps {
  description: string;
  context: any;
  service: IPersonService;
  profilePageUrl: string;
  person: Person;
  title: string;
  seeAllLink: string;
  showAll: boolean;
  isOpenInNewTab: boolean;
  displayNumber: number;
}
