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
![/login](https://github.com/Bobslegend61/hackerbay_R1/blob/master/img/hackerbay_login.PNG)

_**/patch**_ - `PATCH REQUEST` Send along the authorization token in the header and a body containing the document and the patch operation. it returns an object containing the result of the applied patch to the document.

Patch body containing the document and the patch operation
![/patch](https://github.com/Bobslegend61/hackerbay_R1/blob/master/img/patch_body.PNG)

Setting the authorization header
![/patch_header](https://github.com/Bobslegend61/hackerbay_R1/blob/master/img/patch_header.PNG)

Response from the server
![patch_result](https://github.com/Bobslegend61/hackerbay_R1/blob/master/img/patch_result.PNG)

_**/thumbnail**_ - `POST REQUEST` Takes an image url, downloads it, resizes it to 50 x 50 and sends the resulting image.

**NOTE:** Don't forget to pass along the authorization token

Making a request to the server
![thumbnail_body](https://github.com/Bobslegend61/hackerbay_R1/blob/master/img/thumbnail_body.PNG)

Response from the server
![thumbnail_result](https://github.com/Bobslegend61/hackerbay_R1/blob/master/img/thmbnail_result.PNG)

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. 

## Author

[Alabi Emmanuel](https://github.com/Bobslegend61)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
