package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"google.golang.org/appengine/log"
	eventsdb "main.go/internal/database"
	"main.go/models"
)

// creates a new event host
func CreateHost(c *gin.Context) {
	setCors(c)
	var host models.Host

	// Call BindJSON to bind the received JSON to event +add error handling later
	if err := c.BindJSON(&host); err != nil {
		log.Errorf(c, "ERROR: %+v", err)
		c.IndentedJSON(http.StatusBadRequest, nil) //bad data
		return
	}

	createdHost, err := eventsdb.CreateHost(host)
	if err != nil {
		log.Errorf(c, "ERROR: %+v", err)
		c.IndentedJSON(http.StatusInternalServerError, nil) //server error
		return
	}

	c.JSON(201, createdHost) //success
}
