import React from 'react'
import ListItem from 'src/components/blocks/ListItem';
import { getUniqueKey } from 'src/utils';
import PropTypes from 'prop-types';

import styles from './ContactList.module.scss'

const ContactList = ({contacts}) => (
    <div className={styles['list']}>
        <div className={styles['list-head']}>
            <div className={styles['list-head__left-pane']}>
                <p className={styles['list-head__title']}>Name</p>
            </div>

            <div>
                <p className={styles['list-head__title']}>Email</p>
            </div>

        </div>

        { contacts && contacts.map( (contact, index) => (
            <ListItem key={getUniqueKey()} {...contact} position={index} />
        ))}
        
    </div>
);

ContactList.prototype = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        first_name: PropTypes.string.isRequired,
        id: PropTypes.number,
        last_name: PropTypes.string.isRequired,
        position: PropTypes.number
    }))
}


export default ContactList;
