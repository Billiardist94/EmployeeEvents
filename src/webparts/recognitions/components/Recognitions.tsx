import * as React from 'react';
import styles from './Recognitions.module.scss';
import { IRecognitionsProps } from './IRecognitionsProps';
import { IRecognitionsState } from './IRecognitionsState';
import { Person } from '../service/Person';
import { LivePersona } from '@pnp/spfx-controls-react';
import { Persona } from 'office-ui-fabric-react';
import { personType } from '../Constants';
import PersonItemElement from './elements/personItemElements/PersonItemElement';

export default class Recognitions extends React.Component<IRecognitionsProps, IRecognitionsState> {
  constructor(props?: IRecognitionsProps) {
    super(props);

    this.state = {
      items: [],
      isLoaded: false,
      photo: null
    };

    this.loadData.bind(this);
  }

  public componentDidMount(): void {
    this.loadData().then(data => {
      this.setState({
        items: data,
        isLoaded: true
      });
    }).catch(error => { console.error(error); });
  }

  public render(): React.ReactElement<IRecognitionsProps> {
    const { description, context, service, profilePageUrl } = this.props;
    const { items } = this.state;
  
    const usersList = items
      .map((item: Person) => {
        return <PersonItemElement key={item.id} person={item} service={service} profilePageUrl={profilePageUrl} context={context} />
      });

    return (
      <section className={styles.recognitions}>
        <h2 className={styles.webPartHeader}>{description}</h2>
        {usersList}
      </section>
    );
  }

  private loadData(): Promise<Array<Person>> {
    return this.props.service.get().then((result: Array<Person>) => {
      return result;
    });
  }
}
