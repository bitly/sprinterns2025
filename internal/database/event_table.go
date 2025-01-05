package eventsdb

import (
	"main.go/models"
)

func CreateEvent(event models.Event) (*models.Event, error) {
	hostrow, err := dbmap.Query(
		"SELECT host_id, first_name, last_name, email, image_url FROM host WHERE first_name =? LIMIT 1", event.HostName)
	var host models.Host

	for hostrow.Next() {
		err = hostrow.Scan(&host.HostID, &host.FirstName, &host.LastName, &host.Email, &host.ImageURL)
		if err != nil {
			return nil, err
		}
	}
	_, err = dbmap.Query(
		"INSERT INTO event (title, date, time, location, host_name, description, contact_info, public_private, num_of_RSVP, max_attendees, image_url, event_type, host_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
		event.EventTitle, event.Date, event.Time, event.Location, event.HostName, event.Description, event.ContactInfo, event.PublicPrivate, event.NumRSVP, event.MaxAttendees, event.ImageURL, event.EventType, host.HostID)

	if err != nil {
		return nil, err
	}

	eventrow, err := dbmap.Query(
		"SELECT event_id, title, date, time, location, host_name, description, contact_info, public_private, num_of_RSVP, max_attendees, image_url, event_type, host_id FROM event ORDER BY event_id DESC LIMIT 1")
	var events []models.Event

	for eventrow.Next() {
		var event models.Event
		// for each row, scan into the event struct
		err = eventrow.Scan(&event.EventID, &event.EventTitle, &event.Date, &event.Time, &event.Location, &event.HostName, &event.Description, &event.ContactInfo, &event.PublicPrivate, &event.NumRSVP, &event.MaxAttendees, &event.ImageURL, &event.EventType, &event.HostID)
		if err != nil {
			return nil, err
		}
		// append the event into events array
		events = append(events, event)
	}
	return &events[0], nil
}

func GetEvent(eventID int) (*models.Event, error) {
	var events []models.Event
	eventrow, err := dbmap.Query(
		"SELECT event_id, title, date, time, location, host_name, description, contact_info, public_private, num_of_RSVP, max_attendees, image_url, event_type, host_id FROM event WHERE event_id=?;",
		eventID)

	for eventrow.Next() {
		var event models.Event
		// for each row, scan into the event struct
		err = eventrow.Scan(&event.EventID, &event.EventTitle, &event.Date, &event.Time, &event.Location, &event.HostName, &event.Description, &event.ContactInfo, &event.PublicPrivate, &event.NumRSVP, &event.MaxAttendees, &event.ImageURL, &event.EventType, &event.HostID)
		if err != nil {
			return nil, err
		}
		// append the event into events array
		events = append(events, event)
	}
	if len(events) == 0 {
		return nil, nil
	}
	return &events[0], nil
}

// Creating the RSVP Function
// the rsvp struct created in the models is passed in as a parameter
// we want to return the data that is in our struct
func CreateRSVP(rsvp models.RSVP) (*models.RSVP, error) {
	_, err := dbmap.Query(
		// when the user types in the values in the RSVP form, this will be populated.
		"INSERT INTO rsvp (event_id, first_name, last_name, phone_number, email, rsvp_response) VALUES (?,?,?,?,?,?);",
		rsvp.EventID, rsvp.FirstName, rsvp.LastName, rsvp.PhoneNumber, rsvp.Email, rsvp.Response)

	if err != nil {
		return nil, err
	}

	// each row has a column that specifies what type of information needs to be inputed, determined by the DB schema.
	rsvprow, err := dbmap.Query(
		"SELECT rsvp_id, event_id, first_name, last_name, phone_number, email, rsvp_response FROM rsvp ORDER BY rsvp_id DESC LIMIT 1")
	var rsvps []models.RSVP

	// for each row inside of the rsvps array, we are appending an rsvp into it
	// iterating through each rsvprow and reading the data that is stored in the address, this is then stored inside of the rsvp variable
	for rsvprow.Next() {
		var rsvp models.RSVP
		err = rsvprow.Scan(&rsvp.RSVPID, &rsvp.EventID, &rsvp.FirstName, &rsvp.LastName, &rsvp.PhoneNumber, &rsvp.Email, &rsvp.Response)
		if err != nil {
			return nil, err
		}

		// appending the rsvp into the rsvps array
		rsvps = append(rsvps, rsvp)
	}

	return &rsvps[0], nil
}

// create a function for getting RSVPS by eventID
// we are passing in eventID in as a paramter
// we want an array of the RSVP model to be returned, as well as an error if we encounter one
func GetRSVPsByEventId(eventID int) ([]models.RSVP, error) {
	// an RSVPSs array
	var rsvps []models.RSVP

	// we want each row inside of the array to have the same eventID, we are getting this from the rsvp table in the DB
	rsvprow, err := dbmap.Query("SELECT rsvp_id, event_id, first_name, last_name, phone_number, email, rsvp_response FROM rsvp WHERE event_id=?", eventID)
	if err != nil {
		return nil, err
	}

	// this for loop is interating through each RSVP row
	for rsvprow.Next() {
		var rsvp models.RSVP

		// reading the values in the row and storing it inside of the rsvp variable
		err = rsvprow.Scan(&rsvp.RSVPID, &rsvp.EventID, &rsvp.FirstName, &rsvp.LastName, &rsvp.PhoneNumber, &rsvp.Email, &rsvp.Response)
		if err != nil {
			return nil, err
		}

		// we are adding each rsvp that has been read from the rsvprow inside the rsvps array we initially created.
		rsvps = append(rsvps, rsvp)
	}

	// we are returning all of the rsvps, as they will all have the same event ID
	return rsvps, nil
}

func GetAllPublicEvents() ([]models.Event, error) {
	var publicEvents []models.Event

	// Query the database to fetch all public events
	rows, err := dbmap.Query(
		"SELECT  event_id, title, date, time, location, host_name, description, contact_info, public_private, num_of_RSVP, max_attendees, image_url, event_type, host_id FROM event WHERE public_private = 'public'")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var event models.Event
		err := rows.Scan(
			&event.EventID, &event.EventTitle, &event.Date, &event.Time,
			&event.Location, &event.HostName, &event.Description, &event.ContactInfo,
			&event.PublicPrivate, &event.NumRSVP, &event.MaxAttendees, &event.ImageURL, &event.EventType, &event.HostID)
		if err != nil {
			return nil, err
		}
		publicEvents = append(publicEvents, event)
	}

	return publicEvents, nil
}

// function to update an event by eventId
func UpdateEventByEventId(eventID int, updatedEvent models.Event) (*models.Event, error) {
	_, err := dbmap.Exec(
		"UPDATE event SET title = ?, date = ?, time = ?, location = ?, host_name = ?, description = ?, contact_info = ?, public_private = ?, num_of_RSVP = ?, max_attendees = ?, image_url = ?, event_type = ? WHERE event_id = ?",
		updatedEvent.EventTitle, updatedEvent.Date, updatedEvent.Time, updatedEvent.Location, updatedEvent.HostName, updatedEvent.Description, updatedEvent.ContactInfo, updatedEvent.PublicPrivate, updatedEvent.NumRSVP, updatedEvent.MaxAttendees, updatedEvent.ImageURL, updatedEvent.EventType, eventID)

	if err != nil {
		return nil, err
	}

	return &updatedEvent, nil
}

func GetEventsByField(field, value string) ([]models.Event, error) {

	var filteredEvents []models.Event

	// Query the database to fetch events based on the specified field and value
	query := "SELECT event_id, num_of_RSVP, title, date, time, location, host_name, description, contact_info, public_private, max_attendees, image_url, event_type, host_id FROM event WHERE " + field + "=?"
	rows, err := dbmap.Query(query, value)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var event models.Event
		err := rows.Scan(
			&event.EventID, &event.NumRSVP, &event.EventTitle, &event.Date, &event.Time,
			&event.Location, &event.HostName, &event.Description, &event.ContactInfo,
			&event.PublicPrivate, &event.MaxAttendees, &event.ImageURL, &event.EventType, &event.HostID)
		if err != nil {
			return nil, err
		}
		filteredEvents = append(filteredEvents, event)
	}

	return filteredEvents, nil
}
