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

module.exports = {
    ICS_Form_214_Activity_Log,
    Resources_Assigned_Entry,
    Activity_Log_Entry,
    Operational_Period,
    PreparedBy
};