import _ from "lodash";
//return the object with picked fields
const getPickedData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};
const getUnpickedData = ({ fields = [], object = {} }) => {
  return _.omit(object, fields);
};
export {getPickedData,getUnpickedData}