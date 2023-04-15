import { IPersonService } from "../service/IPersonService";
import { Person } from "../service/Person";

export interface IAnniversariesState {
  items: Array<Person>;
  isLoaded: boolean;
}