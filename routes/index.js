module.exports = function ( app ) {
  require('./register')(app);
  require('./login')(app);
  require('./home')(app);
  require('./addCommodity')(app);
  require('./cart')(app);
};