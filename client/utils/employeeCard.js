import { SELECT_GENDERS } from '../constants';
import { find } from 'lodash';

export function getFullName(firstName, lastName) {
    return firstName + " " + lastName
}

export function getGender(genderType) {
    return find(SELECT_GENDERS, { value: genderType }).label;
}