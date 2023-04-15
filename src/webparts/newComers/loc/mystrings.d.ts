declare interface IEmployeeEventsWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  TimeIntervalToDisplay: string;
  NumberOfItemsToDisplayLabel: string;
}

declare module 'EmployeeEventsWebPartStrings' {
  const strings: IEmployeeEventsWebPartStrings;
  export = strings;
}
