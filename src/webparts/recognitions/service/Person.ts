import moment from "moment";
import { personType } from "../Constants";

export class Person {
  public id: string;
  public userId: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public eventDate: moment.Moment;
  public eventType: string;
  public type: personType;
  public department?: string;
  public eventTypeDescription?: string;
}