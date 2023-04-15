/* eslint-disable @typescript-eslint/no-explicit-any */
import { Person } from "./Person";
import { IPersonService } from "./IPersonService";
import { personType } from "../Constants";
import moment from "moment";

export class PersonServiceMock implements IPersonService {
    public getUPNById(id: number): Promise<string> {
      throw new Error("Method not implemented.");
    }

    public get(): Promise<Array<Person>> {
      return new Promise<Array<Person>>((resolve:any) => {
        const followPersons = new Array<string>();
        followPersons.push('follow person 1');
        followPersons.push('follow person 2');
        followPersons.push('follow person 3');

        const fakeData: Array<Person> = [
            {
              id: '1',
              userId: 1,
              firstName: 'firstname1',
              lastName: 'lastname1',
              email: 'user1@company.com',
              eventDate: moment(),
              eventType: '',
              type: personType.Birthdays
            },
            {
              id: '2',
              userId: 2,
              firstName: 'firstname2',
              lastName: 'lastname2',
              email: 'user2@company.com',
              eventDate: moment(),
              eventType: '',
              type: personType.Birthdays
            },
            {
              id: '3',
              userId: 3,
              firstName: 'firstname3',
              lastName: 'lastname3',
              email: 'user3@company.com',
              eventDate: moment(),
              eventType: '',
              type: personType.Newcomers
            },
            {
              id: '4',
              userId: 4,
              firstName: 'firstname1',
              lastName: 'lastname1',
              email: 'user1@company.com',
              eventDate: moment(),
              eventType: '',
              type: personType.Newcomers
            },
            {
              id: '5',
              userId: 5,
              firstName: 'firstname2',
              lastName: 'lastname2',
              email: 'user2@company.com',
              eventDate: moment(),
              eventType: '',
              type: personType.Anniversary
            },
            {
              id: '6',
              userId: 6,
              firstName: 'firstname3',
              lastName: 'lastname3',
              email: 'user3@company.com',
              eventDate: moment(),
              eventType: '',
              type: personType.Anniversary
            },
            {
              id: '7',
              userId: 7,
              firstName: 'firstname1',
              lastName: 'lastname1',
              email: 'user1@company.com',
              eventDate: moment(),
              eventType: '',
              type: personType.Birthdays
            },
            {
              id: '8',
              userId: 8,
              firstName: 'firstname2',
              lastName: 'lastname2',
              email: 'user2@company.com',
              eventDate: moment(),
              eventType: '',
              type: personType.Birthdays
            },
            {
              id: '9',
              userId: 9,
              firstName: 'firstname3',
              lastName: 'lastname3',
              email: 'user3@company.com',
              eventDate: moment(),
              eventType: '',
              type: personType.Newcomers
            },
            {
              id: '10',
              userId: 10,
              firstName: 'firstname1',
              lastName: 'lastname1',
              email: 'user1@company.com',
              eventDate: moment(),
              eventType: '',
              type: personType.Newcomers
            },
            {
              id: '12',
              userId: 12,
              firstName: 'firstname2',
              lastName: 'lastname2',
              email: 'user2@company.com',
              eventDate: moment(),
              eventType: '',
              type: personType.Anniversary
            },
            {
              id: '13',
              userId: 13,
              firstName: 'firstname3',
              lastName: 'lastname3',
              email: 'user3@company.com',
              eventDate: moment(),
              eventType: '',
              type: personType.Anniversary
            },
            {
              id: '14',
              userId: 14,
              firstName: 'firstname1',
              lastName: 'lastname1',
              email: 'user1@company.com',
              eventDate: moment(),
              eventType: '',
              type: personType.Birthdays
            },
            {
              id: '15',
              userId: 15,
              firstName: 'firstname2',
              lastName: 'lastname2',
              email: 'user2@company.com',
              eventDate: moment(),
              eventType: '',
              type: personType.Birthdays
            },
            {
              id: '16',
              userId: 16,
              firstName: 'firstname3',
              lastName: 'lastname3',
              email: 'user3@company.com',
              eventDate: moment(),
              eventType: '',
              type: personType.Birthdays
            }
        ];

        resolve(fakeData);
      });
    }

    public getUserPicture(email: string): Promise<Blob> {
      return new Promise<Blob>((resolve: any) => {
        switch (email.split("@")[0]) {
          case 'user1':
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            fetch(require("./../assets/user1.jpg"))
              .then(res => res.blob())
              .then(blob => resolve(blob))
              .catch(error => { console.error(error); });
            break;
          case 'user2':
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            fetch(require("./../assets/user2.png"))
              .then(res => res.blob())
              .then(blob => resolve(blob))
              .catch(error => { console.error(error); });
            break;
          case 'user3':
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            fetch(require("./../assets/user3.jpg"))
              .then(res => res.blob())
              .then(blob => resolve(blob))
              .catch(error => { console.error(error); });
            break;
        }
      });
    }
}
