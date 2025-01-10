package handlers

import (
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	eventsdb "main.go/internal/database"
	"main.go/models"
)

// creates a new RSVP
func CreateRSVP(c *gin.Context) {
	setCors(c)
	var rsvp models.RSVP

	// Call BindJSON to bind the received JSON to event +add error handling later
	if err := c.BindJSON(&rsvp); err != nil {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusBadRequest, nil) //bad data
		return
	}

	// populated with an event
	getEvent, err := eventsdb.GetEvent(rsvp.EventID)
	if err != nil {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusInternalServerError, nil) //server error
		return
	}

	getRSVPById, err := eventsdb.GetRSVPsByEventId(rsvp.EventID)
	if err != nil {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusInternalServerError, nil) //server error
		return
	}

	if !(getEvent.MaxAttendees > len(getRSVPById)) {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusBadRequest, nil) //bad data
		return
	}

	createdRSVP, err := eventsdb.CreateRSVP(rsvp)
	if err != nil {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusInternalServerError, nil) //server error
		return
	}

	c.JSON(201, createdRSVP) //success
}

// Get RSVP by ID
func GetRSVP(c *gin.Context) {
	setCors(c)

	rsvpID := c.Param("rsvpID")
	intrsvpID, err := strconv.Atoi(rsvpID)
	if err != nil {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusBadRequest, nil) //bad data
		return
	}

	rsvp, err := eventsdb.GetRsvp(intrsvpID)
	if err != nil {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusInternalServerError, err) //server error
		return
	}

	if rsvp == nil {
		c.IndentedJSON(http.StatusNotFound, nil) //event not found
		return
	}
	c.JSON(200, rsvp) //success
}

func GetRSVPbyEvents(c *gin.Context) {
	setCors(c)
	eventID := c.Param("eventID")
	inteventID, err := strconv.Atoi(eventID)
	if err != nil {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusBadRequest, nil) //bad data
		return
	}
	// Fetch all public events from the database
	RSVPbyEvents, err := eventsdb.GetRSVPsByEventId(inteventID)
	if err != nil {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusInternalServerError, nil) //server error
		return
	}
	c.JSON(200, RSVPbyEvents) //success - return the list of rsvp by events
}
