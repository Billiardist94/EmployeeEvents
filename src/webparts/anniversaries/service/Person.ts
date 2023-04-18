import moment from "moment";

export class Person {
  public id: string;
  public userId: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public eventDate: moment.Moment;
  public eventType: string;
  public type: string;
  public eventTypeDescription?: string;
}