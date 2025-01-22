package eventsdb

import (
	"database/sql"

	"main.go/models"

	_ "github.com/go-sql-driver/mysql"
)

// Create attendee inserts a new attendee into the attendees table
func CreateAttendee(attendee models.Attendee) (*models.Attendee, error) {
	insertQuery := `
    INSERT INTO attendees (first_name, last_name, email, phone_number, image_url)
    VALUES (?, ?, ?, ?, ?);`
	_, err := dbmap.Exec(insertQuery, attendee.FirstName, attendee.LastName, attendee.Email, attendee.PhoneNumber, attendee.ImageURL)
	if err != nil {
		return nil, err
	}

	// Retrieve the newly inserted attendee
	attendeeRow, err := dbmap.Query(`
    SELECT attendee_id, first_name, last_name, email, phone_number, image_url
    FROM attendees ORDER BY attendee_id DESC LIMIT 1`)
	if err != nil {
		return nil, err
	}
	defer attendeeRow.Close() // Close the row after the function returns

	var newAttendee models.Attendee // Create a new Attendee struct to hold the retrieved data
	if attendeeRow.Next() {         // Check if there is a row to scan
		err = attendeeRow.Scan(&newAttendee.AttendeeID, &newAttendee.FirstName, &newAttendee.LastName, &newAttendee.Email, &newAttendee.PhoneNumber, &newAttendee.ImageURL) // Scan the row into the newAttendee struct
		if err != nil {
			return nil, err
		}
	}

	return &newAttendee, nil
}

// GetAllAttendees retrieves all attendees from the attendees table
func GetAllAttendees() ([]models.Attendee, error) {
	var attendees []models.Attendee

    // Query the database to fetch all attendees
    rows, err := dbmap.Query(`
    SELECT id, first_name, last_name, email, phone_number, image_url
    FROM attendees`)
	if err != nil { // Check for errors
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var attendee models.Attendee // Create a new Attendee struct to hold the retrieved data
		err := rows.Scan(&attendee.AttendeeID, &attendee.FirstName, &attendee.LastName, &attendee.Email, &attendee.PhoneNumber, &attendee.ImageURL)
		if err != nil { // Check for errors
			return nil, err
		}
		attendees = append(attendees, attendee) // Append the attendee to the attendees
	}
	return attendees, nil
}

// Get Attendee by ID
func GetAttendee(attendeeID int) (*models.Attendee, error) {
	var attendeeDb AttendeeDb

	err := dbmap.SelectOne(&attendeeDb, "SELECT id, first_name, last_name, email, image_url FROM attendees WHERE id = ?", attendeeID)
	if err == sql.ErrNoRows { // you can use this to see if there were any db row matches

		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	attendee := models.Attendee{
		AttendeeID: attendeeDb.AttendeeID,
		FirstName:  attendeeDb.FirstName,
		LastName:   attendeeDb.LastName,
		Email:      attendeeDb.Email,
		ImageURL:   attendeeDb.ImageURL,
	}
	return &attendee, nil
}

// attendee db struct
type AttendeeDb struct {
	AttendeeID  int    `db:"id"`
	FirstName   string `db:"first_name"`
	LastName    string `db:"last_name"`
	Email       string `db:"email"`
	PhoneNumber string `db:"phone_number"`
	ImageURL    string `db:"image_url"`
}
