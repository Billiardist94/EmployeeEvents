import * as React from 'react';
import styles from './NewComers.module.scss';
import { Person } from '../service/Person';
import { Spinner } from 'office-ui-fabric-react';
import PersonItemElement from './elements/personItemElements/PersonItemElement';
import { INewComersProps } from './INewComersProps';
import { INewComersState } from './INewComersState';

export default class NewComers extends React.Component<INewComersProps, INewComersState> {
  constructor(props?: INewComersProps) {
    super(props);

    this.state = {
      items: [],
      isLoaded: false
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

  public render(): React.ReactElement<INewComersProps> {
    const { items } = this.state;
    const { showAll, displayNumber, context, description } = this.props;

    let control = <div>
      <Spinner label='Loading...' />
    </div>;

    if (this.state.isLoaded) {
      if (items.length > 0) {
        const resultItems = showAll ? items : items.slice(0, displayNumber ? displayNumber : 3);

        const usersList = resultItems
          .map((item: Person) => {
            return <PersonItemElement key={item.id} person={item} service={this.props.service} profilePageUrl={this.props.profilePageUrl} context={context} />;
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

    return <section className={styles.recognitions}>
      <h2 className={styles.webPartHeader}>{description}</h2>
      {control}
    </section>
  }

  private loadData(): Promise<Array<Person>> {
    return this.props.service.get().then((result: Array<Person>) => {
      return result;
    });
  }
}
