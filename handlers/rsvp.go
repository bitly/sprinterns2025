package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"google.golang.org/appengine/log"
	eventsdb "main.go/internal/database"
	"main.go/models"
)

// creates a new RSVP
func CreateRSVP(c *gin.Context) {
	setCors(c)
	var rsvp models.RSVP

	// Call BindJSON to bind the received JSON to event +add error handling later
	if err := c.BindJSON(&rsvp); err != nil {
		log.Errorf(c, "ERROR: %+v", err)
		c.IndentedJSON(http.StatusBadRequest, nil) //bad data
		return
	}

	// populated with an event
	getEvent, err := eventsdb.GetEvent(rsvp.EventID)
	if err != nil {
		log.Errorf(c, "ERROR: %+v", err)
		c.IndentedJSON(http.StatusInternalServerError, nil) //server error
		return
	}

	getRSVPById, err := eventsdb.GetRSVPsByEventId(rsvp.EventID)
	if err != nil {
		log.Errorf(c, "ERROR: %+v", err)
		c.IndentedJSON(http.StatusInternalServerError, nil) //server error
		return
	}

	if !(getEvent.MaxAttendees > len(getRSVPById)) {
		log.Errorf(c, "ERROR: %+v", err)
		c.IndentedJSON(http.StatusBadRequest, nil) //bad data
		return
	}

	createdRSVP, err := eventsdb.CreateRSVP(rsvp)
	if err != nil {
		log.Errorf(c, "ERROR: %+v", err)
		c.IndentedJSON(http.StatusInternalServerError, nil) //server error
		return
	}

	c.JSON(201, createdRSVP) //success
}
