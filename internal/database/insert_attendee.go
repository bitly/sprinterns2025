package main

import (
    "database/sql"
    "fmt"
    "log"

    _ "github.com/go-sql-driver/mysql"
)

func InsertAttendee(eventID int, firstName, lastName, email, phoneNumber, imageURL string) {
    // Connect to the database
    dsn := "root:admin123@tcp(localhost:3306)/events" // Data Source Name with MySQL connection details
    db, err := sql.Open("mysql", dsn) // Open a connection to the database
    if err != nil { // Check for connection errors
        log.Fatal(err) // Log and exit if there is an error
    }
    defer db.Close() // to make sure the database connection is closed when the function exits

    // SQL query to insert a new attendee
    insertQuery := `
    INSERT INTO attendees (event_id, first_name, last_name, email, phone_number, image_url)
    VALUES (?, ?, ?, ?, ?, ?);`

    // Execute the query
    _, err = db.Exec(insertQuery, eventID, firstName, lastName, email, phoneNumber, imageURL) // Execute the SQL query
    if err != nil { // Check for execution errors
        log.Fatal(err) // Log and exit if there is an error
    }

    fmt.Println("Attendee inserted successfully") // Print a success message
}

func main() {
    // Example data to insert
    eventID := 1
    firstName := "John"
    lastName := "Pork"
    email := "john.pork@example.com"
    phoneNumber := "123-456-7890"
    imageURL := "http://example.com/image.jpg"

    InsertAttendee(eventID, firstName, lastName, email, phoneNumber, imageURL) // Call the function to insert an attendee
}