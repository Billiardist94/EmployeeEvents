import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneCheckbox
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'EmployeeEventsWebPartStrings';
import EmployeeEvents from './components/EmployeeEvents';
import { IEmployeeEventsProps } from './components/IEmployeeEventsProps';
import { sp } from '@pnp/pnpjs';
import { PersonService } from './service/PersonService';
import { Person } from './service/Person';

export interface IEmployeeEventsWebPartProps {
  description: string;
  profilePageUrl: string;
  person: Person;
  title: string;
  showAllLink: string;
  numberOfItemsToDisplay: number;
  showAll: boolean;
  shouldOpenNewTab: boolean;
  timeIntervalToDisplay: number;
}

export default class EmployeeEventsWebPart extends BaseClientSideWebPart<IEmployeeEventsWebPartProps> {
  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context as any
      });
    });
  }

  public render(): void {
    const service = new PersonService(this.properties.timeIntervalToDisplay);
    
    const element: React.ReactElement<IEmployeeEventsProps> = React.createElement(
      EmployeeEvents,
      {
        description: this.properties.description,
        context: this.context,
        service: service,
        profilePageUrl: this.properties.profilePageUrl,
        person: this.properties.person,
        title: this.properties.title,
        seeAllLink: this.properties.showAllLink,
        showAll: this.properties.showAll,
        isOpenInNewTab: this.properties.shouldOpenNewTab,
        displayNumber: this.properties.numberOfItemsToDisplay
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: 'Title',
                }),
                PropertyPaneCheckbox("showAll", {
                  text: "Display All Items"
                }),
                PropertyPaneSlider("numberOfItemsToDisplay", {
                  label: strings.NumberOfItemsToDisplayLabel,
                  min: 1,
                  max: 12,
                  value: 3,
                  showValue: true,
                  step: 1,
                  disabled: this.properties.showAll
                }),
                PropertyPaneSlider("timeIntervalToDisplay", {
                  label: strings.TimeIntervalToDisplay,
                  min: 1,
                  max: 30,
                  value: 1,
                  showValue: true,
                  step: 1,
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
