User = class User extends Model {
  constructor ( plainJSONObject ) {
    super( plainJSONObject );
    this.data = plainJSONObject;
  }

  static getCollection () {
    return Meteor.users;
  }  

  ensureDefault () {
    // Idempotently makes sure this user has at least the most basic default team of the whole social network.
    if ( !this.data.teams ) { this.data.teams = []; }
    var  found = this.getClass().fromId( Meteor.classes.Team.defaultTeamId() );
    if ( found ) { this.data.teams = _( this.data.teams ).union( [ found.data ] ); }
  }

  hasJoinedPublicChannel ( aPublicChannel, aTeamId ) {
    // Answers true if this user had joined aPublicChannel.
    var joined = _( this.teams ).find( function (each) { return each.teamId === aTeamId });
    if ( !joined ) { return false; }
    return -1 != _( joined.publicChannels ).indexOf( aPublicChannel._id );
  }

  getUnjoinedPublicChannelsOnTeamId ( aTeamId ) {
    // Answers the channels that have not been joined by this user.
    var self = this;
    // console.log('about to log self hasJoinedPublicChannel ------>');
    // console.log(self.constructor.name);
    // console.log(self);
    var allPublicChannelsOnTeam = PublicChannels.find( { teamId: aTeamId } );

    var result = _(allPublicChannelsOnTeam).filter( function ( each ) {
      return !self.hasJoinedPublicChannel( each, aTeamId ); });
    console.log('------------> after filtering with hasJoinedPublicChannel');
    console.log(result);
    return [];
  }

  chatsOnTeamId ( aTeamId ) {
    // Answer the object that has the collections of chats where this user is subscribed.
    var team = _( this.teams ).filter( function (each) {
      return each.teamId === aTeamId });
    if( !team ) { return {}; }
    return team;
  }

  onSignUp () {
    console.log( 'This user has signed up: ');
    console.log(this);
  }

  onSignIn () {
    console.log( 'This user has signed in: ');
    console.log(this);
  }
}

this.User = User;