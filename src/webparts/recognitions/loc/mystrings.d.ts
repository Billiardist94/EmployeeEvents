declare interface IRecognitionsWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  TimeIntervalToDisplay: string;
}

declare module 'RecognitionsWebPartStrings' {
  const strings: IRecognitionsWebPartStrings;
  export = strings;
}
