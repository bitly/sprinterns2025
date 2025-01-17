package handlers

import (
    "net/http"
	"log"

	"github.com/gin-gonic/gin"
	eventsdb "main.go/internal/database"
	"main.go/models"
)

// create new attendee
func CreateAttendee(c *gin.Context) {
	setCors(c)
    var attendee models.Attendee

    // Bind JSON to the attendee struct and error handler
    if err := c.ShouldBindJSON(&attendee); err != nil {
        log.Printf("ERROR: %+v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
    }

    // Create the attendee in the database
    newAttendee, err := eventsdb.CreateAttendee(attendee)
	if err != nil {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusInternalServerError, nil) //server error
		return
	}

    // Return the newly created attendee
    c.JSON(http.StatusOK, newAttendee)
}


/*   test 
curl -X POST http://localhost:3000/api/attendees \
-H "Content-Type: application/json" \
-d '{
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "jane.smith@example.com",
    "phone_number": "0987654321",
    "image_url": "http://example.com/jane.jpg"
}'*/