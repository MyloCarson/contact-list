import {useContext} from 'react';
import styles from './ListItem.module.scss';
import {EditIcon, TrashIcon} from 'src/components/vectors';
import { CONTACT_CONTEXT } from 'src/constants';
import PropTypes from 'prop-types';


const ListItem = ({position, first_name, last_name, email, avatar}) => {
    const contactContext = useContext(CONTACT_CONTEXT);

    const edit = () => {
        contactContext.editContact({
            position,
            contact: {
                first_name,
                last_name,
                email,
                avatar
            }
        })
    }

    const handleDelete = () => {
        contactContext.onDeleteContact(position);
    }

    return (
        <div className={styles['list-item']}>
            <div className={styles['list-item__left-pane']}>
                <div className={styles['list-item__image-wrapper']}>
                    <img src={avatar} className={styles['list-item__image']}  alt={first_name}/>
                </div>
                <h5 className={styles['list-item__title']}>{first_name} {last_name}</h5>
    
            </div>
            <div className={styles['list-item__right-pane']}>
                <h5 className={styles['list-item__title']}>{first_name} {last_name}</h5>
                <a href={`mailto:${email}`} className={styles['list-item__email']}>{email}</a>
                <div className={`icon-edit ${styles['list-item__edit-icon']}`} onClick={edit}>
                    <EditIcon />
                </div>
                <div className={`icon-edit ${styles['list-item__edit-icon']}`} onClick={handleDelete}>
                    <TrashIcon />
                </div>
            </div>
    
        </div>
    )
}


ListItem.propTypes = {
    position: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
}


export default ListItem;