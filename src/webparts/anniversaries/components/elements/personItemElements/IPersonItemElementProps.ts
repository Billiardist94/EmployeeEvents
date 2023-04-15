import { Person } from '../../../service/Person';
import { IPersonService } from '../../../service/IPersonService';

export interface IPersonItemElementProps {
  person: Person;
  service: IPersonService;
  profilePageUrl: string;
  context: any;
}
