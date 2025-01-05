package models

type Event struct {
	EventID       int    `json:"event_id,omitempty"`
	NumRSVP       int    `json:"num_of_RSVP"`
	EventTitle    string `json:"title"`
	Date          string `json:"date" `
	Time          string `json:"time" `
	Location      string `json:"location" `
	HostName      string `json:"host_name" `
	Description   string `json:"description" `
	ContactInfo   string `json:"contact_info" `
	PublicPrivate string `json:"public_private" `
	MaxAttendees  int    `json:"max_attendees" `
	ImageURL      string `json:"image_url"`
	EventType     string `json:"event_type"`
	HostID        int    `json:"host_id"`
}

// Defining the RSVP Struct
type RSVP struct {
	RSVPID 		int `json:"rsvp_id,omitempty"`
	EventID 	int `json:"event_id"`
	FirstName 	string `json:"first_name"`
	LastName 	string `json:"last_name"`
	PhoneNumber string `json:"phone_number"`
	Email 		string `json:"email"`
	Response 	string `json:"rsvp_response"`
}

//host struct
type Host struct {
	HostID 		int `json:"host_id,omitempty"`
	FirstName 	string `json:"first_name"`
	LastName 	string `json:"last_name"`
	Email 		string `json:"email"`
	ImageURL    string `json:"image_url"`
}