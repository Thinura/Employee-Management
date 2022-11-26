import { SELECT_GENDERS } from '../constants';
import { find, isEmpty } from 'lodash';

export function getFullName(firstName, lastName) {
    if(isEmpty(firstName) || isEmpty(lastName)) return "";
    return firstName + " " + lastName
}

export function getGender(genderType) {
    return find(SELECT_GENDERS, { value: genderType })?.label || "";
}