#To access the Fuzz testing as a parent image
FROM gcr.io/oss-fuzz-base/base-builder-javascript

#Create a clone of the reposotory
RUN git clone https://github.com/msegal347/COMS_4156_Project.git --branch 8-configure-project-for-googles-oss-fuzz-testing

#Switch the working directory to the test folder will all the tests are located
WORKDIR $SRC/COMS_4156_Project/test

#Install the dependencies
RUN npm install

#Install the Google OSS-Fuzz core
RUN npm install --save-dev @jazzer.js/core

#Install the Typescript Jest Compiler
RUN npm install --save-dev jest typescript ts-jest @types/jest

#Install the Jest Runner
RUN npm install --save-dev @jazzer.js/jest-runner

#Build the project
RUN npm run build

#Run the tests
CMD ["npm", "test"]