import { Person } from "./Person";

export interface IPersonService {
  get(): Promise<Array<Person>>;

  getUserPicture(email: string): Promise<Blob>;
}
