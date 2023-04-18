declare interface INewComersWebPartStrings {
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

declare module 'NewComersWebPartStrings' {
  const strings: INewComersWebPartStrings;
  export = strings;
}
