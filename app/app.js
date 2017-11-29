const pug = require('pug');
const parse = require('xml-parser');
const fs = require('fs');
const ics214fromXML = require('./containers/ics_form_214_activity_log').fromXML;
const opn = require('opn');

if (process.argv[2]) {

    const xml = fs.readFileSync(process.argv[2], 'utf8');
    const locals = ics214fromXML(parse(xml));

    fs.writeFile('out/output.html', pug.renderFile(
        __dirname + '/forms/ICS_Form_214_Activity_Log.pug',
        locals
    ), (err) => {
        if (!err)
            opn('out/output.html')
    });

} else {

    console.log('Missing target XML file');

}