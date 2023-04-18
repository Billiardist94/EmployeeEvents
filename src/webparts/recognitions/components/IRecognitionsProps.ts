import { IPersonService } from "../service/IPersonService";

export interface IRecognitionsProps {
  description: string;
  service: IPersonService;
  context: any;
  profilePageUrl: string;
  displayNumber: number;
  showAll: boolean;
}
