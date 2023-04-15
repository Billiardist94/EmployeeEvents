import { Person } from "./Person";
import { IPersonService } from "./IPersonService";
import { Fields, personType, Settings } from '../Constants';
import moment from "moment";

import { sp } from "@pnp/sp/presets/all";
import { graph } from '@pnp/pnpjs';

export class PersonService implements IPersonService {
    private _daysInterval: number;

    constructor(daysInterval: number) {
        this._daysInterval = daysInterval;
    }

    public get(): Promise<Array<Person>> {
        let users = new Array<Person>();
        const processResultUsers = (items: Array<Person>): void => { users = users.concat(items); };
        const recognition = this.getRecognition();
        recognition
            .then(processResultUsers)
            .catch(error => { console.error(error); });

        return Promise.all([recognition]).then(() => {
            return users.sort((a, b) => a.eventDate.valueOf() - b.eventDate.valueOf());
        });
    }

    public getUserPicture(email: string): Promise<Blob> {
        return graph.users.getById(email).photo.getBlob()
            .catch(error => { console.error(error); return null; });
    }

    public getUPNById(id: number): Promise<string> {
        return sp.web.getUserById(id).get().then((user: any) => user.UserPrincipalName);
    }

    private async getRecognition(): Promise<Array<Person>> {
        const filterDateBefore = moment().subtract(this._daysInterval ? this._daysInterval : 1, 'd');
        const filterDateAfter = moment().add(this._daysInterval ? this._daysInterval : 1, 'd');
        return await sp.web.lists.getById(Settings.listRecognitions).items
            .select('*',
                `${Fields.Employee}/EMail`,
                `${Fields.Employee}/Id`,
                `${Fields.Employee}/FirstName`,
                `${Fields.Employee}/LastName`,
                `${Fields.Employee}/Department`,
                )
            .expand(Fields.Employee)
            .get().then((usersList: any) => {
                console.log('usersList: ', usersList)
                return usersList.map((item: any) => {
                    return {
                        id: personType.Recognition + item.Id,
                        firstName: item[Fields.Employee].FirstName,
                        lastName: item[Fields.Employee].LastName,
                        email: item[Fields.Employee].EMail,
                        userId: item[Fields.Employee].Id,
                        eventDate: moment(),
                        eventType: `Recognitions`,
                        eventTypeDescription: item[Fields.TypeOfRecognition],
                        type: personType.Recognition,
                        department: item[Fields.Employee].Department
                    };
                });
            });
    }
}