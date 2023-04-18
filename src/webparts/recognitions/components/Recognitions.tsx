import * as React from 'react';
import styles from './Recognitions.module.scss';
import { IRecognitionsProps } from './IRecognitionsProps';
import { IRecognitionsState } from './IRecognitionsState';
import { Person } from '../service/Person';
import { LivePersona } from '@pnp/spfx-controls-react';
import { Persona, Spinner } from 'office-ui-fabric-react';
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
    const { description, context, service, profilePageUrl, displayNumber, showAll } = this.props;
    const { items } = this.state;
    let control = <div>
      <Spinner label='Loading...' />
    </div>;

    if (this.state.isLoaded) {
      if (items.length > 0) {
        const resultItems = showAll ? items : items.slice(0, displayNumber ? displayNumber : 3);

        const usersList = resultItems
          .map((item: Person) => {
            return <PersonItemElement key={item.id} person={item} service={service} profilePageUrl={profilePageUrl} context={context} />
          });

        control = <>
          {usersList}
        </>
      } else {
        control = <div>
          <div>
            <span>Nothing To Display</span>
          </div>
        </div>;
      }
    }

    return (
      <section className={styles.recognitions}>
        <h2 className={styles.webPartHeader}>{description}</h2>
        {control}
      </section>
    );
  }

  private loadData(): Promise<Array<Person>> {
    return this.props.service.get().then((result: Array<Person>) => {
      return result;
    });
  }
}
