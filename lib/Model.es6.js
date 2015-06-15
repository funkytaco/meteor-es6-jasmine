Model = class Model {
  constructor ( plainJSONObject ) {
    // Initializes this instance loading it with plainJSONObject.
    this.data = plainJSONObject;
  }

  static fromData (plainJSONObject) {
    // Returns this instance of the model loaded with plainJSONObject.
    // Answers null if plainJSONObject is null
    if ( !plainJSONObject ) { return null; }
    return new this( plainJSONObject );
  }

  static findId ( anId ) {
    var found = this.getCollection().findOne( { _id: anId } );
    if(found) { return this.fromData( found ) }
    else { return null }
  }

  static getCollection () {
    // Returns the class of this instance.
    throw new Error( 'subclass responsibility' );
  }

  getData () {
    return this.data;
  }
}

this.Model = Model;

