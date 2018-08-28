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
  
  #### POST /Users/:id?/Listings
    Creates a new `Listing`,
    Needs a `{name}` and a `{Description}`.

  #### POST /User/Applications/
    Creates a new `Application`,
    Needs a `{ListingID`} and a `{coverLetter}`.

  #### GET /Listings
    Returns all `listings`.

  #### GET /Applications
    Returns all `Apllications`.
