# Album Reviews

Click here to visit the deployed page: (https://final-project-ten-alpha.vercel.app/)

## Names of the team members

- Danny Brien
- Artur Ciecierski
- Riley Ward
- Myles Billington

_n.b. Throughout the project we both pair programmed and mob programmed, so the commits made to this project may not necessarily represent what code we have worked on i.e. sometimes we may have been a driver, sometimes a navigator and sometimes a solo programmer._

## A description of the project

An Album Review app, suitable for users who are interested not only music, but the forgotten art of the entire album. Users can access the main app and view profiles without signing up/logging on, however, upon logging in they can make a profile (if they havent already signed up), edit their profile name or bio, create reviews and save them to their profile and view other profiles reviews/comment on them.

## The overall problem domain and how the project solves those problems

Individuals who are interested in music/albums and other peoples opinions need an easy to use, approachable app where they can:

- Create a profile and save album reviews to it
- View other users profiles and reviews, allowing them to comment on them
- Have access to an about page that explains how to use the app, should it not be clear

We solved these problems by:

- Having a ‘Create Profile’ page upon signing in with clerk authorisation where users can create a profile with a username and bio
- Having a 'My Profile' link in the navbar upon sign in where a user can edit their profile username/bio and add album reviews to their page via a form. Existing reviews are then listed, allowing to click on them and see the content of the review in full
- Having a 'Profiles' page available to view, with all current users displayed by a call to the database. You can click on specific profile to view its existing reviews
- Having a comment form below each specific review, which allows you to add comments to it
- Having an 'About' page that explains the functionality of the app, including links embedded so a user can interact with it

## A list of any libraries, frameworks, or packages that your application requires in order to properly function

- Clerk Authorization and Authentication: (https://clerk.com/)
- Framer Motion: (https://www.framer.com/motion/)
- Next.js: (https://nextjs.org/)
- Spotify Web Api: (https://developer.spotify.com/)
- Vercel: (https://vercel.com/)
- Vercel Postgres: (https://vercel.com/docs/storage/vercel-postgres)

## Instructions that the user may need to follow in order to get your application up and running on their own computer

We would recommend that you open this app on your PC as this is how it was originally designed. You can also access the app via a phone, media queries have made it possible for the app to scale for modern use.

## Accessibility

Please contact one of the project contributors if you would like a screenshot of our lighthouse report

## Clearly defined database schemas

These can be found in the file ‘seed.sql’

## References

-Animal emojis - (https://www.w3schools.com/charsets/ref_emoji_animals.asp)

# We’d like to thank:

- The lecturers and helpers at Tech Educators (https://techeducators.co.uk/), who went above and beyond to help us. Special shout to Joe, aswell as Tim and Jez. The goats
- Google and ChatGPT for the plethora of information that helped guide our project
