FROM gcr.io/oss-fuzz-base/base-builder-javascript

#ADD docker/fuzz/build.sh $SRC/

RUN git clone https://github.com/msegal347/COMS_4156_Project.git

#RUN mkdir -p $SRC/COMS_4156_Project/test/example/

#ADD docker/fuzz/fuzz_explore_me.ts docker/fuzz/target.ts docker/fuzz/project.yaml $SRC/COMS_4156_Project/test/example/

#ADD docker/fuzz/math.ts docker/fuzz/math.test.ts $SRC/COMS_4156_Project/test/example/

#ADD package.json docker/fuzz/tsconfig.json $SRC/COMS_4156_Project/test/example/

#RUN mkdir -p $SRC/COMS_4156_Project/test/fuzz/algorithms/

#ADD docker/fuzz/resourceAllocation.fuzz.ts $SRC/COMS_4156_Project/test/fuzz/algorithms/

WORKDIR $SRC/COMS_4156_Project/test

RUN npm install

RUN npm install --save-dev @jazzer.js/core

RUN npm install --save-dev jest typescript ts-jest @types/jest

RUN npm install --save-dev @jazzer.js/jest-runner

RUN npm run build

CMD ["npm", "test"]