import React from 'react'
import GridItem from 'src/components/blocks/GridItem';
import PropTypes from 'prop-types';

import {getUniqueKey} from 'src/utils';

import styles from './ContactGrid.module.scss';

const ContactGrid = ({contacts}) => (
    <div className={styles['grid']}>
        {contacts && contacts.map( (contact, index) => (
            <GridItem key={getUniqueKey()} {...contact} position={index} />
        ))}
    </div>
);

ContactGrid.prototype = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        first_name: PropTypes.string.isRequired,
        id: PropTypes.number,
        last_name: PropTypes.string.isRequired,
        position: PropTypes.number
    }))
}

export default ContactGrid;