/* eslint-disable react/jsx-no-target-blank */
import * as React from 'react';
import styles from './EmployeeEvents.module.scss';
import { IEmployeeEventsProps } from './IEmployeeEventsProps';
import { Person } from '../service/Person';
import { IEmployeeEventsState } from './IEmployeeEventsState';
import { Spinner } from 'office-ui-fabric-react';
import PersonItemElement from './elements/personItemElements/PersonItemElement';


export default class EmployeesEvents extends React.Component<IEmployeeEventsProps, IEmployeeEventsState> {
  constructor(props?: IEmployeeEventsProps) {
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

  public render(): React.ReactElement<IEmployeeEventsProps> {
    const { items } = this.state;
    const { isOpenInNewTab, showAll, displayNumber, seeAllLink, context } = this.props;
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

        control = <div>
          <div className={styles.items + " ms-Grid"}>
            {usersList}
          </div>
        </div>;
      } else {
        control = <div className={styles.content}>
          <div className={styles.nodisplay}>
            <span>Nothing To Display</span>
          </div>
        </div>;
      }
    }

    return <div className={styles.content}>
      <div className={"ms-Grid"}>
        <div className={`ms-Grid-row ${styles.header}`}>
          <div className={`ms-Grid-col ms-sm8 ms-md8 ms-lg8 ${styles.hItem}`}>{this.props.title === undefined ? 'Anniversaries' : this.props.title}</div>
          <div className={`ms-Grid-col ms-sm4 ms-md4 ms-lg4 ${styles.hItem}`}>
            {!showAll && seeAllLink !== undefined && seeAllLink.length > 0 ? <a className={styles.allLink} target={isOpenInNewTab ? '_blank' : '_self'} href={seeAllLink}>See All</a> : ''}
          </div>
        </div>
      </div>
      {control}
    </div>;
  }

  private loadData(): Promise<Array<Person>> {
    return this.props.service.get().then((result: Array<Person>) => {
      return result;
    });
  }
}
