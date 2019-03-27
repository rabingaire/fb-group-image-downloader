# FB Group Image Downloader

Downloads Images from facebook group.

## Instruction

- Create `.env` file looking at `.env.example`
- Provide the required values
- `DIR_NAME` is the name of the directory that saves all the downloaded images. (If the directory does not exists script will create one for you and store all the images)
- `ACCESS_TOKEN` Access token provided from graph api explorer
- `FACEBOOK_GROUP_ID` group id of the facebook from where you want to download the images.
- [Facebook Graph Explorer](https://developers.facebook.com/tools/explorer/)
- Default access token provided by facebook are of shorter life follow following [documentation](https://developers.facebook.com/docs/facebook-login/access-tokens/expiration-and-extension) to convert your short term access token to long term access token (usually 60 days)
