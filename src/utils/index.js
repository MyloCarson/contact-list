/* eslint-disable no-useless-escape */
import { GRID, LIST_LAYOUT_TYPE } from 'src/constants';
import { v4 as uuidv4 } from 'uuid';

export const getUniqueKey = () => uuidv4().match(/(\w?\d)/g).join('').substring(0, 16);

export const getListLayoutType = () => {
    if(localStorage.getItem(LIST_LAYOUT_TYPE)){
        return localStorage.getItem(LIST_LAYOUT_TYPE)
    } else {
        storeListLayoutType(GRID);
        return localStorage.getItem(LIST_LAYOUT_TYPE)
    }
};
export const storeListLayoutType = (type) => localStorage.setItem(LIST_LAYOUT_TYPE, type);

export const validateObject = (object, ...args) => {
    const _object = Object.assign({}, object);
    return args.every((arg) => _object.hasOwnProperty(arg) && _object[arg])

}

export const range = (from, to, step = 1) => {
    let i = from;
    const range = [];
    while (i <= to) {
        range.push(i)
        i += step;
    }
    return range;
}

export const isValidEmail = (emailAddress) =>  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(emailAddress);