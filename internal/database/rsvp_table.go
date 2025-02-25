package eventsdb

import (
	"github.com/bitly/sprinterns2025/models"
)

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

// Get RSVP
func GetRsvp(rsvpID int) (*models.RSVP, error) {
	var rsvps []models.RSVP
	rsvprow, err := dbmap.Query(
		"SELECT rsvp_id, event_id, first_name, last_name, phone_number, email, rsvp_response FROM rsvp WHERE rsvp_id=?;",
		rsvpID)
	if err != nil {
		return nil, err
	}
	for rsvprow.Next() {
		var rsvp models.RSVP
		// for each row, scan into the event struct
		err = rsvprow.Scan(&rsvp.RSVPID, &rsvp.EventID, &rsvp.FirstName, &rsvp.LastName, &rsvp.PhoneNumber, &rsvp.Email, &rsvp.Response)
		if err != nil {
			return nil, err
		}
		// append the event into events array
		rsvps = append(rsvps, rsvp)
	}
	if len(rsvps) == 0 {
		return nil, nil
	}
	return &rsvps[0], nil
}
