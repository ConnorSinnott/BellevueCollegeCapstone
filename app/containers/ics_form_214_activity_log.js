class ICS_Form_214_Activity_Log {

    constructor(Incident_Name, OperationalPeriod, Name, ICS_Position, Home_Agency, Resources_Assigned, Activity_Log, Prepared_By) {
        this.Incident_Name = Incident_Name;
        this.Operational_Period = OperationalPeriod;
        this.Name = Name;
        this.ICS_Position = ICS_Position;
        this.Home_Agency = Home_Agency;
        this.Resources_Assigned = Resources_Assigned;
        this.Activity_Log = Activity_Log;
        this.Prepared_By = Prepared_By;
    }

}

class Resources_Assigned_Entry {

    constructor(name, ics_position, home_agency) {
        this.name = name;
        this.ics_position = ics_position;
        this.home_agency = home_agency;
    }

}

class Activity_Log_Entry {

    constructor(date_time, notable_activities) {
        this.date_time = date_time;
        this.notable_activities = notable_activities;
    }

}

class Operational_Period {

    constructor(date_from, date_to, time_from, time_to) {
        this.date_from = date_from;
        this.date_to = date_to;
        this.time_from = time_from;
        this.time_to = time_to;
    }

}

class PreparedBy {

    constructor(name, position_title, signature, date_time) {
        this.name = name;
        this.position_title = position_title;
        this.signature = signature;
        this.date_time = date_time;
    }

}

function fromXML(xml) {

    const body = xml.root.children;

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

    return new ICS_Form_214_Activity_Log(
        incident_name,
        operational_period,
        name,
        ics_position,
        home_agency,
        resources_assigned,
        activity_log,
        prepared_by
    );

}

module.exports = {
    fromXML,
    ICS_Form_214_Activity_Log,
    Resources_Assigned_Entry,
    Activity_Log_Entry,
    Operational_Period,
    PreparedBy
};