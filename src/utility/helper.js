//validation function to check input string
const isValidString = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && isNaN(Number(value)) === false) return false;
  if (typeof value === "string" && value.trim().length > 0) return true;
  return false;
};

//validation function to check inoput email
const isValidEmail = function (email) {
  const regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regexForEmail.test(email);
};

//validation function to check inoput phone number
const isValidPhone = function (phone) {
  const regexForMobile = /^[6-9]\d{9}$/;
  return regexForMobile.test(phone);
};

module.exports = { isValidString, isValidEmail, isValidPhone };
