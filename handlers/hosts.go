package handlers

import (
	"fmt"
	"net/http"
	"strconv"

	"log"

	"github.com/gin-gonic/gin"
	eventsdb "main.go/internal/database"
	"main.go/models"
)

// creates a new event host
func CreateHost(c *gin.Context) {
	setCors(c)
	var host models.Host

	// Call BindJSON to bind the received JSON to event +add error handling later
	if err := c.BindJSON(&host); err != nil {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusBadRequest, nil) //bad data
		return
	}

	createdHost, err := eventsdb.CreateHost(host)
	if err != nil {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusInternalServerError, nil) //server error
		return
	}

	c.JSON(201, createdHost) //success
}

// Get Attendee by ID

func GetAttendee(c *gin.Context) {
	setCors(c)

	attendeeID := c.Param("attendeeID")
	intattendeeID, err := strconv.Atoi(attendeeID)
	if err != nil {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusBadRequest, nil) //bad data
		return
	}
	fmt.Println("attendee", intattendeeID)
	attendee, err := eventsdb.GetAttendee(intattendeeID)
	if err != nil {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusInternalServerError, err) //server error
		return
	}

	if attendee == nil {
		c.IndentedJSON(http.StatusNotFound, nil) //event not found
		return
	}
	c.JSON(200, attendee) //success
}
