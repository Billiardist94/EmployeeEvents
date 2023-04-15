import { Person } from "../service/Person";

export interface IEmployeeEventsState {
    items: Array<Person>;
    isLoaded: boolean;
  }