import { Person } from "../service/Person";

export interface IRecognitionsState {
  items: Array<Person>;
  isLoaded: boolean;
  photo: string;
}
