declare interface IAnniversariesWebPartStrings {
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

declare module 'AnniversariesWebPartStrings' {
  const strings: IAnniversariesWebPartStrings;
  export = strings;
}
