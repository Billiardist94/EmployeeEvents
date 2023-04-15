import { Person } from "../service/Person";

export interface INewComersState {
    items: Array<Person>;
    isLoaded: boolean;
  }