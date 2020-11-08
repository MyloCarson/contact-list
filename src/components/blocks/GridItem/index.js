import {useContext} from 'react';
import styles from './GridItem.module.scss';
import {EditIcon, TrashIcon} from 'src/components/vectors';
import { CONTACT_CONTEXT } from 'src/constants';
import PropTypes from 'prop-types';


const GridItem = ({position, first_name, last_name, email, avatar}) => {
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
        <div className={`card card--sm ${styles['grid-item-card']}`}>
    
            <div className={styles['grid-item']}>
                <div className={styles['grid-item__head']}>
                    <div className={styles['grid-item__image-wrapper']}>
                        <img src={avatar} className={styles['grid-item__image']}  alt={first_name}/>
                    </div>
                </div>
    
                <div className={styles['grid-item__content']}>
                    <p className={styles['grid-item__content-name']}>{first_name} {last_name}</p>
        
                    <a href={`mailto:${email}`} className={styles['grid-item__content-email']}> <span className={styles['grid-item__content-highlight']}>{email}</span></a>
                </div>
    
    
            </div>
            <div className={`icon-edit ${styles['grid-item__icon']}`} onClick={edit}>
                <EditIcon/>
            </div>

            <div className={`icon-edit ${styles['grid-item__icon']}`} onClick={handleDelete}>
                <TrashIcon/>
            </div>
    
        </div>
    )
    
}

GridItem.propTypes = {
    position: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
}

export default GridItem;