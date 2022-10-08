const regexDate = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+/i;

module.exports = {
  regexDate,
  regexEmail,
};