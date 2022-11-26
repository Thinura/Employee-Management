import { getFullName, getGender } from '@/utils/employeeCard';

describe("Employee Card GetFullName Util", ()=>{
    it("should return correct full name", ()=>{
        const firstName = "John";
        const lastName = "Joe";
        const correctFullName = firstName  + " " + lastName;
        expect(getFullName(firstName, lastName)).toEqual(correctFullName);
    })

    it("should return empty string if first name empty", ()=>{
        const firstName = "";
        const lastName = "Joe";
        const correctFullName = "";
        expect(getFullName(firstName, lastName)).toEqual(correctFullName);
    })

    it("should return empty string if last name empty", ()=>{
        const firstName = "John";
        const lastName = "";
        const correctFullName = "";
        expect(getFullName(firstName, lastName)).toEqual(correctFullName);
    })
})

describe("Employee Card GetGender Util", ()=>{
    it("should return correct gender label for 'MALE' ",()=>{
        const genderType = "MALE";
        const correctLabel = "Male";
        expect(getGender(genderType)).toEqual(correctLabel)
    })

    it("should return correct gender label for 'FEMALE' ",()=>{
        const genderType = "FEMALE";
        const correctLabel = "Female";
        expect(getGender(genderType)).toEqual(correctLabel)
    })

    it("should return empty string for incorrect type",()=>{
        const genderType = "incorrect";
        const correctLabel = "";
        expect(getGender(genderType)).toEqual(correctLabel)
    })
})
