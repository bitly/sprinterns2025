package main

import (
    "database/sql"
    "fmt"
    "log"

    _ "github.com/go-sql-driver/mysql"
)

func CreateAttendeesTable() {
    // Connect to the database
    dsn := "root:admin123@tcp(localhost:3306)/events" //dsn
    db, err := sql.Open("mysql", dsn) //open connection to db
    if err != nil { //check for errors
        log.Fatal(err) //exit if error is found
    }
    defer db.Close() //close the connection when the function ends
	
    // SQL query to create the attendees table
    createTableQuery := `
    CREATE TABLE IF NOT EXISTS attendees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    image_url VARCHAR(2048)
);

    // Run the query
    _, err = db.Exec(createTableQuery) //run the sql query
    if err != nil { //check for errors
        log.Fatal(err) //exit if error is found
    }

    fmt.Println("Attendees table created successfully") //print success message
}

func main() {
    CreateAttendeesTable() //	call the function to create the attendees table
}


