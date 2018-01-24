'use strict';

const fs = require('fs');
const path = require('path');
const lodash = require('lodash');
const tpl = lodash.template(fs.readFileSync(path.join(__dirname, 'tpl.html')));
const sources = {};

module.exports = {
   book: {
     assets: './assets',
     css: [
       'swagger-ui.css'
     ]
   },
  hooks: {
    page: function(page) {
      let regex = /\<swagger\>(.*?)\<\/swagger\>/gmi;
      let match = regex.exec(page.content);

      if (match !== null) {
        page.content = sources[match[1]];
      }
      return page;
    },
    'page:before': function(page) {
      //console.log(page);
      let regex = /\<swagger\>(.*?)\<\/swagger\>/gmi;
      let match = regex.exec(page.content);
      if (match !== null) {
        const fileName = match[1];
        sources[fileName] = tpl({'url': fileName});
      }
      return page;
    }
  }
};
