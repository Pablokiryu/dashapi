# dashapi
## Minimal DashBoard API



### Endpoints are :
  #### GET /Users/

    Returns an array of all `users`.

  #### POST /Users/?name=NewName
    Creates a New `User` Named `{NewName}`.

  #### GET /Users/:id?
  
    Returns the detailed info on the `User` with the corresponding `{id}`.
  
  #### PATCH /Users/:id?
    Adds info to the `User` with the corresponding `{id}`

  
  #### GET /Listings
    Returns all `listings`.

  #### POST /Listings
    Creates a new `Listing`,
    Needs a `{Name}` and a `{Description}`.

  #### GET /Applications
    Returns all `Apllications`.

  #### POST /Applications/?ListingId=
    Creates a new `Application`,
    Needs a `{ListingID`} and a `{coverLetter}`.
