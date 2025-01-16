package handlers

import (
    "net/http"

	"github.com/gin-gonic/gin"
	"google.golang.org/appengine/log"
	eventsdb "main.go/internal/database"
	"main.go/models"
)

// create new attendee
func CreateAttendee(c *gin.Context) {
	setCors(c)
    var attendee models.Attendee

    // Bind JSON to the attendee struct
    if err := c.ShouldBindJSON(&attendee); err != nil {
        log.Errorf(c, "ERROR: %+v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
    }

    // Create the attendee in the database
    newAttendee, err := eventsdb.CreateAttendee(attendee)
	if err != nil {
		log.Errorf(c, "ERROR: %+v", err)
		c.IndentedJSON(http.StatusInternalServerError, nil) //server error
		return
	}

    // Return the newly created attendee
    c.JSON(http.StatusOK, newAttendee)
}