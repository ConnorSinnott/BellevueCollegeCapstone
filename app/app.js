const pug = require('pug');
const parse = require('xml-parser');
const fs = require('fs');
const inspect = require('util').inspect;

const xml = fs.readFileSync('input.xml', 'utf8');
const obj = parse(xml);
// console.log(inspect(obj, {colors: true, depth: Infinity}));

const body = obj.root.children;

const {
    ICS_Form_214_Activity_Log,
    Resources_Assigned_Entry,
    Activity_Log_Entry,
    Operational_Period,
    PreparedBy
} = require('./containers/ics_form_214_activity_log');

const incident_name = body[0].content;
const operational_period = new Operational_Period(
    body[1].children[0].content,
    body[1].children[1].content,
    body[1].children[2].content,
    body[1].children[3].content
);
const name = body[2].content;
const ics_position = body[3].content;
const home_agency = body[4].content;
const resources_assigned = body[5].children.map(c => {
    const _name = c.children[0].content;
    const _ics_position = c.children[1].content;
    const _home_agency = c.children[2].content;
    return new Resources_Assigned_Entry(_name, _ics_position, _home_agency)
});
const activity_log = body[6].children.map(c => {
    const _date_time = c.children[0].content;
    const _notable_activities = c.children[1].content;
    return new Activity_Log_Entry(_date_time, _notable_activities)
});
const prepared_by = new PreparedBy(
    body[7].children[0].content,
    body[7].children[1].content,
    body[7].children[2].content,
    body[7].children[3].content
);

const locals = new ICS_Form_214_Activity_Log(
    incident_name,
    operational_period,
    name,
    ics_position,
    home_agency,
    resources_assigned,
    activity_log,
    prepared_by
);

const html = pug.renderFile(
    __dirname + '/forms/ICS_Form_214_Activity_Log.pug',
    locals
);

fs.writeFile('out/test.html', html);