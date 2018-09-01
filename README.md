[](I know my commenting on this particular project has been overly verbose, but since this is an study project i wont cleanup.)

# Dashapi
## Minimal DashBoard API


### Endpoints are :
  #### GET /Users/
    Returns an array of all `users`.

  #### POST /Users/
    Creates a New `User`
    Requires `{name}` property set on Request Body.

  #### GET /Users/:id?
    Returns the detailed info on the `User` with the corresponding `{id}`.
  
  #### POST /User/Application/
    Creates a new `Application`,
    Needs an `{userId}` a `{ListingID}` and a{coverLetter}` properties set on body.

  #### DELETE /Users/:id?
    Deletes the user with the corresponding `{id}`.

  #### GET /Listings
    Returns all `listings` from all Users.

  #### POST /Listings
    Creates a new Listing on the DB. Requires `{name}` and `{description}` properties set on body.

  #### DELETE /Listings/:id?
    Deletes the Listing with the corresponding `{id}`.

  #### GET /Applications
    Returns all `Apllications` from all Users.
    
  #### GET /Users/:id?
    Returns the info on the Application with the corresponding `{id}`.

  #### GET /topActiveUsers
    Returns the Users list, ordered by most listings applied to, containing only the last 3 listings for each user.