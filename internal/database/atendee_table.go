package eventsdb

import (
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
    if attendeeRow.Next() { // Check if there is a row to scan
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
    rows, err := dbmap.Query(` // Query the database to fetch all attendees
    SELECT attendee_id, first_name, last_name, email, phone_number, image_url
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
