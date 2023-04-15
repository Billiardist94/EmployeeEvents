import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { sp } from "@pnp/sp";
import { graph } from "@pnp/pnpjs";
import "@pnp/sp/webs";
import * as strings from 'RecognitionsWebPartStrings';
import Recognitions from './components/Recognitions';
import { IRecognitionsProps } from './components/IRecognitionsProps';
import { PersonService } from './service/PersonService';

export interface IRecognitionsWebPartProps {
  description: string;
  timeIntervalToDisplay: number;
  profilePageUrl: string;
}

export default class RecognitionsWebPart extends BaseClientSideWebPart<IRecognitionsWebPartProps> {
  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context as any
      });

      graph.setup({
        spfxContext: this.context as any
      });
    });
  }

  public render(): void {
    const service = new PersonService(this.properties.timeIntervalToDisplay);
    const element: React.ReactElement<IRecognitionsProps> = React.createElement(
      Recognitions,
      {
        description: this.properties.description,
        service: service,
        context: this.context,
        profilePageUrl: this.properties.profilePageUrl,
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
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneSlider("timeIntervalToDisplay", {
                  label: strings.TimeIntervalToDisplay,
                  min: 1,
                  max: 14,
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
