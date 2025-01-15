package eventsdb

import (
    "database/sql"
    "log"
    "main.go/models"

    _ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func init() {
    initializeDb()
}

func initializeDb() {
    var err error
    dsn := "root:admin123@tcp(localhost:3306)/events"
    db, err = sql.Open("mysql", dsn)
    if err != nil {
        log.Fatal(err)
    }

    // make the database connection is available
    err = db.Ping()
    if err != nil {
        log.Fatal(err)
    }

    // Create the attendees table if it doesn't exist
    createTableQuery := `
    CREATE TABLE IF NOT EXISTS attendees (
        attendee_id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20),
        image_url VARCHAR(2048)
    ) DEFAULT CHARSET=utf8;`
    _, err = db.Exec(createTableQuery)
    if err != nil {
        log.Fatal(err)
    }
}

func CreateAttendee(attendee models.Attendee) (*models.Attendee, error) {
    insertQuery := `
    INSERT INTO attendees (first_name, last_name, email, phone_number, image_url)
    VALUES (?, ?, ?, ?, ?);`
    result, err := db.Exec(insertQuery, attendee.FirstName, attendee.LastName, attendee.Email, attendee.PhoneNumber, attendee.ImageURL)
    if err != nil {
        return nil, err
    }

    attendeeID, err := result.LastInsertId() // Get the ID of the inserted attendee
    if err != nil { // Check for errors
        return nil, err
    }
    attendee.AttendeeID = int(attendeeID) // Set the ID of the attendee

    return &attendee, nil
}

func GetAttendee(attendeeID int) (*models.Attendee, error) { // GetAttendee function to fetch an attendee by ID
    var attendee models.Attendee // Create a variable to store the attendee details
    selectQuery := ` // SQL query to select an attendee by ID
    SELECT attendee_id, first_name, last_name, email, phone_number, image_url    
    FROM attendees WHERE attendee_id = ?;`
    err := db.QueryRow(selectQuery, attendeeID).Scan(&attendee.AttendeeID, &attendee.FirstName, &attendee.LastName, &attendee.Email, &attendee.PhoneNumber, &attendee.ImageURL) // Execute the query and scan the result into the attendee variable
    if err != nil { // Check for errors
        return nil, err
    }

    return &attendee, nil
}