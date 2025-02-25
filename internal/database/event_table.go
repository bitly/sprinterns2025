package eventsdb

import (
	"github.com/bitly/sprinterns2025/models"
)

func CreateEvent(event models.Event) (*models.Event, error) {
	_, err := dbmap.Query(
		"INSERT INTO event (title, date, time, location, host_name, description, contact_info, public_private, num_of_RSVP, max_attendees, image_url, event_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
		event.EventTitle, event.Date, event.Time, event.Location, event.HostName, event.Description, event.ContactInfo, event.PublicPrivate, event.NumRSVP, event.MaxAttendees, event.ImageURL, event.EventType)

	if err != nil {
		return nil, err
	}

	eventrow, err := dbmap.Query(
		"SELECT event_id, title, date, time, location, host_name, description, contact_info, public_private, num_of_RSVP, max_attendees, image_url, event_type FROM event ORDER BY event_id DESC LIMIT 1")
	var events []models.Event
	if err != nil {
		return nil, err
	}

	for eventrow.Next() {
		var event models.Event
		// for each row, scan into the event struct
		err = eventrow.Scan(&event.EventID, &event.EventTitle, &event.Date, &event.Time, &event.Location, &event.HostName, &event.Description, &event.ContactInfo, &event.PublicPrivate, &event.NumRSVP, &event.MaxAttendees, &event.ImageURL, &event.EventType)
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
		"SELECT event_id, title, date, time, location, host_name, description, contact_info, public_private, num_of_RSVP, max_attendees, image_url, event_type FROM event WHERE event_id=?;",
		eventID)
	if err != nil {
		return nil, err
	}
	for eventrow.Next() {
		var event models.Event
		// for each row, scan into the event struct
		err = eventrow.Scan(&event.EventID, &event.EventTitle, &event.Date, &event.Time, &event.Location, &event.HostName, &event.Description, &event.ContactInfo, &event.PublicPrivate, &event.NumRSVP, &event.MaxAttendees, &event.ImageURL, &event.EventType)
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

func GetAllPublicEvents() ([]models.Event, error) {
	var publicEvents []models.Event

	// Query the database to fetch all public events
	rows, err := dbmap.Query(
		"SELECT  event_id, title, date, time, location, host_name, description, contact_info, public_private, num_of_RSVP, max_attendees, image_url, event_type FROM event WHERE public_private = 'public'")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var event models.Event
		err := rows.Scan(
			&event.EventID, &event.EventTitle, &event.Date, &event.Time,
			&event.Location, &event.HostName, &event.Description, &event.ContactInfo,
			&event.PublicPrivate, &event.NumRSVP, &event.MaxAttendees, &event.ImageURL, &event.EventType)
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
	query := "SELECT event_id, num_of_RSVP, title, date, time, location, host_name, description, contact_info, public_private, max_attendees, image_url, event_type FROM event WHERE " + field + "=?"
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
			&event.PublicPrivate, &event.MaxAttendees, &event.ImageURL, &event.EventType)
		if err != nil {
			return nil, err
		}
		filteredEvents = append(filteredEvents, event)
	}

	return filteredEvents, nil
}

// function to delete an event and RSVP by eventId
func DeleteEventByEventId(eventID int) error {
	_, err := dbmap.Exec(
		"DELETE FROM rsvp WHERE event_id = ?",
		eventID)

	if err != nil {
		return err
	}

	_, err = dbmap.Exec(
		"DELETE FROM event WHERE event_id = ?",
		eventID)

	if err != nil {
		return err
	}

	return nil
}
