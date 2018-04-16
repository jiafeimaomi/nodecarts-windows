module.exports = function ( app, dbHelper ) {
  require('./register')(app, dbHelper);
  require('./login')(app, dbHelper);
  require('./home')(app, dbHelper);
  require('./addCommodity')(app, dbHelper);
  require('./cart')(app, dbHelper);
};