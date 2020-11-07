import React from 'react';

export const GRID = 'grid';
export const LIST = 'list';
export const LIST_LAYOUT_TYPE = "list_layout_type";

export const BASE_API_ENDPOINT = 'https://reqres.in/api/';
//statuses
export const IDLE = 'IDLE'
export const PENDING = 'PENDING'
export const RESOLVED = 'RESOLVED'
export const REJECTED = 'REJECTED'
export const STARTED = 'STARTED'

//context
export const CONTACT_CONTEXT = React.createContext();


//form states
export const ADD_CONTACT = 'ADD_CONTACT';
export const EDIT_CONTACT = 'EDIT_CONTACT';

//
export const EMPTY_FORM_DATA = {
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
};