import { Person } from "./Person";
import { IPersonService } from "./IPersonService";
import moment from "moment";
import { graph } from '@pnp/pnpjs';

export class PersonService implements IPersonService {
  private _daysInterval: number;

  constructor(daysInterval: number) {
    this._daysInterval = daysInterval;
  }

  public get(): Promise<Array<Person>> {
    let users = new Array<Person>();
    const processResultUsers = (items: Array<Person>): void => { users = users.concat(items); };

    const allUsers = this.getAllUsers();
    allUsers
      .then(processResultUsers)
      .catch(error => { console.error(error); });

    return Promise.all([allUsers]).then(() => {
      console.log('users New Arrival: ', users)
      return users.sort((a, b) => a.eventDate.valueOf() - b.eventDate.valueOf());
    });
  }

  public async getUserPicture(email: string): Promise<Blob> {
    return graph.users.getById(email).photo.getBlob()
      .catch(error => { console.error(error); return null; });
  }

  private getAllUsers(): Promise<Array<Person>> {
    const filterDate = moment().subtract(this._daysInterval ? this._daysInterval : 1, 'd');
    return graph
      .users
      .select("givenName", "surname", "employeeHireDate", "id", "userPrincipalName", "jobTitle", "companyName",  "createdDateTime")
      .filter(`companyName eq 'Globalgig' and createdDateTime ge ${filterDate.toISOString()}`)
      // .filter(`employeeHireDate ge ${filterDate.toISOString()}`)
      .count
      .top(200)
      .get({
        headers: { ConsistencyLevel: 'eventual' }
      })
      .then((usersList) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return usersList.map((item: any) => {
          return {
            id: item.id,
            firstName: item.givenName,
            lastName: item.surname,
            email: item.userPrincipalName,
            userId: Number(item.id),
            eventDate: moment(item.createdDateTime),
            eventType: 'New Arrival',
            type: 'newcomer',
            jobTitle: item.jobTitle
          };
        });
      });
  }
}