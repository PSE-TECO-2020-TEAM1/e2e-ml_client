# client - react based web client for the application

This repository contains the react based mobile and desktop web clients for "An Interactive End-To-End Machine Learning Platform" (Name subject to change). The clients are distributed as a single docker image (see Dockerfile).

## Configuration
### build and deployment time environment variables (deployment time takes priority)

- REACT_APP_BASE_URL: base url of the application, by default `window.location.origin`
- REACT_APP_UPDATE_INTERVAL: configures the polling interval of most dynamic components in ms, setting too high of a value here may cause inconsistent state between different devices for a while and may result in unnecessary error messages being shown to the user

In order to configure these variables during build time, you can simply pass the environment variables to `npm run build`. For deployment variables simply pass them as environment variables to `docker run` with the `-e` flag or list them in the compose file.

## Building

As a single prerequisite, you need to have `npm` and a recent version of `node` (the application was developed using v15) installed. Then:

- `npm run build` to build the production build.
- `npm run start` to start the development version.

## Testing
`npm run test`

## Future Outlook

- There'll be automated and mandatory testing on master branch for every commit using Github Actions CI when/if I can find time to learn it. Till then, please make sure to run the tests before pushing/merging to master after v1.0.0.

## Contributing

Before contributing please file an issue first.
