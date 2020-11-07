import {useState, useEffect, useContext} from 'react';
import DefaultLayout from 'src/components/layout/DefaultLayout';
import styles from './ContactsPage.module.scss';
import {TileIcon,ListIcon} from 'src/components/vectors';
import {Progress, ErrorBoundary, ContactGrid, ContactList, ContactForm, Pagination} from 'src/components/blocks';
import { ADD_CONTACT, BASE_API_ENDPOINT, CONTACT_CONTEXT, GRID, LIST, } from 'src/constants';
import { getListLayoutType, storeListLayoutType } from 'src/utils';
import { useFetch } from 'src/components/helper/hooks/useFetch';

const ContactsPage = () => {
    let INITIAL_META_DATA = {
        'page': 1,
        'per_page': 0,
        'total': 0,
        'total_pages': 0
    }
    const contactContext = useContext(CONTACT_CONTEXT);

    const [listViewType, setListViewType] = useState(getListLayoutType());
    const [showForm, setShowForm] = useState(false);
    const [metaData, setMetaData] = useState(INITIAL_META_DATA)

    const [page, setPage] = useState(1);
    const url = page && `${BASE_API_ENDPOINT}users?page=${page}`;

    const { status, data, error } = useFetch(url);
    const [contacts, setContacts] = useState([])
    

    const isGrid = listViewType === GRID;


    const Icon = isGrid ? ListIcon : TileIcon;

    const ContactLayout = isGrid ? ContactGrid : ContactList;


    const toggleListViewLayout = () => {
        if(isGrid) {
            setListViewType(LIST)
            storeListLayoutType(LIST);
        } else {
            setListViewType(GRID)
            storeListLayoutType(GRID)
        }
    }

    const toggleShowForm = () => {
        contactContext.updateShowForm(!showForm);
    }

    const contactEvent = (contact) => {
        if(contactContext.state.formAction === ADD_CONTACT){
            setContacts([...contacts, contact])
        } else {
            const _contact = contacts;
            _contact[contactContext.state.position] = contact;
            setContacts(_contact);
        }
    }

    const onPageChanged = (pageNumber) => {
        setPage(pageNumber)
    }

    useEffect(() => {
        setShowForm(contactContext.state.showForm);
    }, [contactContext.state.showForm])

    useEffect(() => {
        if(data.data){
            setContacts(data.data)
            setMetaData({
                page: data.page,
                per_page: data.per_page,
                total: data.total,
                total_pages: data.total_pages
            })
        }
    }, [data])

    return (
        <DefaultLayout>
            <div className={styles['contacts-page']}>
                <section className={styles['contacts-page__form-panel']}>
                    <div className="button button--primary--with-border" onClick={toggleShowForm}>Add New Contact</div>
                </section>
    
                <section className={styles['contacts-page__content-section']}>
                    <div className={`circle circle--primary circle--sm ${styles['contacts-page__content-section__control']}`} onClick={toggleListViewLayout}>
                        <Icon />
                    </div>
                    {error && <ErrorBoundary message='Sorry, we can get contacts now.' />}
                    {
                        status === 'fetching' && (<Progress />)
                    }
                    {
                        status === 'fetched' && (
                            <ContactLayout contacts={contacts} />
                        )
                    }                    
                </section>
                <section className={`${styles['contacts-page__pagination-wrapper']}`}>
                    <Pagination totalPages={metaData.total_pages} currentPage={metaData.page} onPageChanged={onPageChanged} />
                </section>
            </div>
            {showForm && <ContactForm onClose={toggleShowForm} contactEvent={contactEvent} />}
        </DefaultLayout>
    )
}

export default ContactsPage;