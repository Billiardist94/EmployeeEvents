import * as React from 'react';
import { IPersonItemElementProps } from './IPersonItemElementProps';
import { IPersonItemElementState } from './IPersonItemElementState';
import styles from '../../NewComers.module.scss';
import { Persona } from 'office-ui-fabric-react';
import { personType } from '../../../Constants';
import { LivePersona } from "@pnp/spfx-controls-react/lib/LivePersona";

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

    return (
      <>
        <div className={styles.personItem}>
          <LivePersona
            upn={person.email}
            template={
              <>
                <Persona imageUrl={this.state.photo} text={`${person.firstName} ${person.lastName}`} secondaryText={person.jobTitle} coinSize={64} />
              </>
            }
            serviceScope={context.serviceScope}
            disableHover={false}
          />
          <div className={styles.personContent}>
            <img src={icon} width={"30px"} height={"30px"} alt="icon" className={styles.personImg} />
            <p className={styles.years}>{person.eventType}</p>
          </div>
        </div>
      </>
    );
  }
}
