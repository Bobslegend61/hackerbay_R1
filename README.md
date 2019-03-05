# HackerBay Task - [Backend](https://github.com/hackerbay/interview-backend-task)

## Set up
Install Dependencies
```sh
$ npm install
```
Start server
```sh
$ npm start
```
Start server in dev mode using nodemon
```sh
$ npm run dev
```
Run test
```sh
$ npm test
```

## API Endpoint
_**/login**_ - `POST REQUEST` Logs in the user. Accepts any username and password and returns an object containing the authorization token.
#### Example
Using postman
![/login](/img/hackerbay_login.png)

_**/patch**_ - `PATCH REQUEST` Send along the authorization token in the header and a body containing the document and the patch operation. it returns an object containing the result of the applied patch to the document.

Patch body containing the document and the patch operation
![/patch](/img/patch_body.png)

Setting the authorization header
![/patch_header](/img/patch_header.png)

Response from the server
![patch_result](/img/patch_result.png)

_**/thumbnail**_ - `POST REQUEST` Takes an image url, downloads it, resizes it to 50 x 50 and sends the resulting image.

**NOTE:** Don't forget to pass along the authorization token

Making a request to the server
![thumbnail_body](/img/thumbnail_body.png)

Response from the server
![thumbnail_result](/img/thmbnail_result.png)

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. 

## Author

[Alabi Emmanuel](https://github.com/Bobslegend61)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.