import { ObjectId } from 'mongodb'

export const isValidId = (id) => {
    return ObjectId.isValid(id);
};