describe('User', function() {
  var model;
  var sampleData = { _id: 'testing', email: 'guy@example.com', stuff: [1, 2, 3] };

  beforeEach( function () {
    model = new Model;
    model.data = sampleData;
  });

  // afterEach( function () {
  //   Meteor.users.remove( { _id: 'testing' } );
  // });

  it( 'Creating .fromData, must return instance with the given data', function () {
    var created = Model.fromData( sampleData );
    expect(created).not.toBeNull();
    expect(created.data).not.toBeNull();
    expect(created.data).toBeEqualTo( sampleData );
  });

});
