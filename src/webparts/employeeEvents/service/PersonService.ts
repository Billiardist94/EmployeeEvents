/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Person } from "./Person";
import { IPersonService } from "./IPersonService";
import moment from "moment";
import { graph } from "@pnp/pnpjs";

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
      return users.sort((a, b) => a.eventDate.valueOf() - b.eventDate.valueOf());
    });
  }

  public getUserPicture(email: string): Promise<Blob> {
    return graph.users.getById(email).photo.getBlob()
      .catch(error => { console.error(error); return null; });
  }

  private getAllUsers(): Promise<Array<Person>> {
    const filterDateAfter = moment().add(this._daysInterval, 'd');
    const filterDateBefore = moment().subtract(this._daysInterval, 'd');
    const getEndOfNumber = (years: number) => {
      switch (years) {
        case 1:
          return "Year";
          break;
        default:
          return "Years"
          break;
      }
    }
    return graph.users
      .select("givenName", "surname", "employeeHireDate", "id", "userPrincipalName")
      .get()
      .then((results) => {
        const usersList = results
          .filter((item: any) => (moment().year() - moment(item.employeeHireDate).year()) !== 0)
          // .filter((item: any) => {
          //   const anniversaryDate = moment(item.employeeHireDate).year(moment().year());
          //   return anniversaryDate >= filterDateBefore &&
          //     anniversaryDate <= filterDateAfter;
          // });

        return usersList.map((item: any) => {
          return {
            id: item.id,
            firstName: item.givenName,
            lastName: item.surname,
            email: item.userPrincipalName,
            userId: Number(item.id),
            eventDate: moment(item.employeeHireDate).year(moment().year()),
            eventType: `${(moment().year() - moment(item.employeeHireDate).year())} ${getEndOfNumber((moment().year() - moment(item.employeeHireDate).year()))}`,
            type: 'anniversary'
          };
        });
      });
  }
}