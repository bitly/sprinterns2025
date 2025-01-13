package handlers

import (
	"net/http"
	"strconv"

	"log"

	"github.com/gin-gonic/gin"
	eventsdb "main.go/internal/database"
	"main.go/models"
)

func setCors(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
}

func HandleCors(c *gin.Context) {
	setCors(c)

	c.AbortWithStatus(204)

}

// delete an RSVP by event
// delete the Event itself

// DeleteEvent was define in main.go in handlers
// c *gin.Context --> gin is the api framework, context will contain the endpoint, will contain the event id, the api http method: DELETE, contains headers, sending large info of sql body in Json file
func DeleteEvent(c *gin.Context) {
	setCors(c)

	// finding and getting an individual eventid, delete all rsvps assoicated with the event
	eventID := c.Param("eventID")
	intEventID, err := strconv.Atoi(eventID)
	if err != nil {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusBadRequest, nil) //bad data
		return
	}

	err = eventsdb.DeleteEventByEventId(intEventID) //eventsdb.DeleteEvent is diff from handlers.DeleteEvent
	if err != nil {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusInternalServerError, nil) //server error
		return
	}

	c.JSON(204, nil) //success
}

// creates a new event
func CreateEvent(c *gin.Context) {
	setCors(c)
	var event models.Event

	// Call BindJSON to bind the received JSON to event +add error handling later
	if err := c.BindJSON(&event); err != nil {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusBadRequest, nil) //bad data
		return
	}

	createdEvent, err := eventsdb.CreateEvent(event)
	if err != nil {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusInternalServerError, nil) //server error
		return
	}

	c.JSON(201, createdEvent) //success
}

func GetEvent(c *gin.Context) {
	setCors(c)

	eventID := c.Param("eventID")
	intEventID, err := strconv.Atoi(eventID)
	if err != nil {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusBadRequest, nil) //bad data
		return
	}

	event, err := eventsdb.GetEvent(intEventID)
	if err != nil {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusInternalServerError, err) //server error
		return
	}

	if event == nil {
		c.IndentedJSON(http.StatusNotFound, nil) //event not found
		return
	}
	c.JSON(200, event) //success
}

func GetPublicEvents(c *gin.Context) {
	setCors(c)

	// Fetch all public events from the database
	publicEvents, err := eventsdb.GetAllPublicEvents()
	if err != nil {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusInternalServerError, nil) //server error
		return
	}
	c.JSON(200, publicEvents) //success - return the list of public events
}

// updating an event
func UpdateEventByEventId(c *gin.Context) {
	setCors(c)

	var updatedEventData models.Event

	eventID := c.Param("eventID")
	intEventID, err := strconv.Atoi(eventID)
	if err != nil {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusBadRequest, nil)
		return
	}

	// Call BindJSON to bind the received JSON to event +add error handling later
	if err := c.BindJSON(&updatedEventData); err != nil {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusBadRequest, nil) //bad data
		return
	}

	updatedEvent, err := eventsdb.UpdateEventByEventId(intEventID, updatedEventData)
	if err != nil {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusInternalServerError, nil) //server error
		return
	}

	c.JSON(201, updatedEvent) //update created - success
}

func GetEventsByField(c *gin.Context) {
	setCors(c)

	// Retrieve the field and value from query parameters
	field := c.Query("field")
	value := c.Query("value")

	// Validate that both field and value are provided
	if field == "" || value == "" {
		log.Printf("ERROR: Both field and value query parameters are required")
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Both 'field' and 'value' query parameters are required"})
		return
	}

	// Fetch events from the database based on the specified field and value
	filteredEvents, err := eventsdb.GetEventsByField(field, value)
	if err != nil {
		log.Printf("ERROR: %+v", err)
		c.IndentedJSON(http.StatusInternalServerError, nil) //server error
		return
	}

	c.JSON(http.StatusOK, filteredEvents) //success - return the list of filtered events
}
