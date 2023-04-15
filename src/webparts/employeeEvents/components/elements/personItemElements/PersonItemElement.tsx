import * as React from 'react';
import { IPersonItemElementProps } from './IPersonItemElementProps';
import { IPersonItemElementState } from './IPersonItemElementState';
import styles from '../../EmployeeEvents.module.scss';
import { Persona } from 'office-ui-fabric-react';
import { personType } from '../../../Constants';
import { LivePersona } from '@pnp/spfx-controls-react';

export default class PersonItemElement extends React.Component<IPersonItemElementProps, IPersonItemElementState> {
  constructor(props?: IPersonItemElementProps) {
    super(props);

    this.state = {
      photo: null
    };
  }

  public componentDidMount(): void {
    const { service, person } = this.props;

    service.getUserPicture(person.email).then((blob: Blob) => {
      if (blob !== null && blob !== undefined) {
        const groupPhotoUrl = window.URL;
        const photo = groupPhotoUrl.createObjectURL(blob);

        this.setState({ photo });
      }
    }).catch(error => { console.error(error); });
  }

  public render(): React.ReactElement<IPersonItemElementProps> {
    const { person, context } = this.props;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const icon: string = require(`./../../../assets/team icons/${person.type}.svg`);

    return <div className={`${styles.item} ms-Grid-row`}>
      <LivePersona
        upn={person.email}
        template={
          <>
            <Persona imageUrl={this.state.photo} text={`${person.firstName} ${person.lastName}`} coinSize={64} />
          </>
        }
        serviceScope={context.serviceScope}
        disableHover={false}
      />
      <div className={`${styles.type} ${person.type === personType.Anniversary ? styles.anniversaryType : ''} ms-Grid-col ms-sm4 ms-md4 ms-lg4`}>
        <img src={icon} width={"24px"} height={"24px"} className={`${person.type === personType.Anniversary ? styles.anniversary : ''}`} />
        {person.type === personType.Anniversary ? <p className={styles.number}>{person.eventType.split(' ')[0]}</p> : ''}
        <p className={styles.years}>{person.type === personType.Anniversary ? person.eventType.split(' ')[1] : person.eventType}</p>
      </div>
    </div>;
  }
}
