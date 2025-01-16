package main

import (
	"net/http"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"main.go/handlers"
)

func main() {
	// Set the router as the default one shipped with Gin
	router := gin.Default()

	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("./views", true)))

	// Setup route group for the API
	api := router.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})

	}

	// EVENTS

	// GET Attendee by ID
	api.GET("/attendee/:attendeeID", handlers.GetAttendee)
	api.OPTIONS("/attendee/:attendeeID", handlers.HandleCors)

	// GET RSVP for Event
	api.GET("/event/:eventID/rsvps", handlers.GetRSVPbyEvents)
	api.OPTIONS("/event/:eventID/rsvps", handlers.HandleCors)

	// CREATE an event
	api.POST("/events", handlers.CreateEvent)
	api.OPTIONS("/events", handlers.HandleCors)
	// GET an event
	api.GET("/event/:eventID", handlers.GetEvent)
	api.OPTIONS("/event/:eventID", handlers.HandleCors)

	//UPDATE an event
	api.PUT("/update-event/:eventID", handlers.UpdateEventByEventId)
	api.OPTIONS("/update-event/:eventID", handlers.HandleCors)

	//CREATE an RSVP
	api.POST("/rsvps", handlers.CreateRSVP)
	api.OPTIONS("/rsvps", handlers.HandleCors)

	//GET PUBLIC EVENTS
	api.GET("/public-events", handlers.GetPublicEvents)
	api.OPTIONS("/public-events", handlers.HandleCors)

	//Get RSVP by ID
	api.GET("/rsvp/:rsvpID", handlers.GetRSVP)
	api.OPTIONS("/rsvp/:rsvpID", handlers.HandleCors)

	// DELETE an event
	api.DELETE("/event/:eventID/delete", handlers.DeleteEvent) // api calls delete to an individual event by calling :eventID (path parameter) & /event/:eventID is a path to a specific event
	api.OPTIONS("/event/:eventID/delete", handlers.HandleCors) // context works with api.DeLEte and does cool stuff

	 // CREATE an attendee
	 api.POST("/attendees", handlers.CreateAttendee)
	 api.OPTIONS("/attendees", handlers.HandleCors)
	 
	// Start and run the server
	router.Run(":3000")
}
