'use strict';

/*Csv to json object for me to update the loaded csv*/

import csv from 'csvtojson';
import { writeFileSync } from 'fs';
const myCoffee = 'Coffee.csv';
csv()
    .fromFile(myCoffee)
    .then((json) => {
        writeFileSync("output.json", JSON.stringify(json), "utf-8", (err) => {
            if (err) {
                console.log(err);
            }
        });
    });