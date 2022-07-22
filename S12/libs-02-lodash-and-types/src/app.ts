import _ from 'lodash';

console.log(_.shuffle([1, 2, 3]));

// what happens when we have library that we can't install types like lodash?

//most, but not all libraries have types packages.

// declare command. Will allow typescript file to read global variables.

declare var GLOBAL: string;

console.log(GLOBAL);
