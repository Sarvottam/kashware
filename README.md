# kashware
A backend microservice   for auth and image resizing

## Steps to run the application 
1. git clone [link](https://github.com/Sarvottam/kashware.git)
2. cd kashware && npm install
3. npm start


## Steps to run test cases 
> npm run test

## Run through Dockerfile
Create a docker image by running
>docker build --tag authmicroservice:1.0 .

Run Docker image by command
> sudo docker run --publish 5555:5555 --name auth authmicroservice:1.0
