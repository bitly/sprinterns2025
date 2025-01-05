package eventsdb

import (
	"main.go/models"
)

func CreateHost(host models.Host) (*models.Host, error) {
	_, err := dbmap.Query(
		// when the user types in the values in the RSVP form, this will be populated.
		"INSERT INTO host (first_name, last_name, email, image_url) VALUES (?,?,?,?);",
		host.FirstName, host.LastName, host.Email, host.ImageURL)

		if err != nil {
			return nil, err
		}

		// each row has a column that specifies what type of information needs to be inputed, determined by the DB schema.
		hostrow, err := dbmap.Query(
			"SELECT host_id, first_name, last_name, email, image_url FROM host ORDER BY host_id DESC LIMIT 1")
		var hosts []models.Host

		// for each row inside of the host array, we are appending another host into it
		// iterating through each hostrow and reading the data that is stored in the address, this is then stored inside of the host variable
		for hostrow.Next() {
			var host models.Host
			err = hostrow.Scan(&host.HostID, &host.FirstName, &host.LastName, &host.Email, &host.ImageURL)
			if err != nil {
				return nil, err
			}

			// appending the host into the hosts array
			hosts = append(hosts, host)
		}



		return &hosts[0], nil
}
func GetAllHosts() ([]models.Host, error) {
    var hosts []models.Host

    // Query the database to fetch all hosts
    rows, err := dbmap.Query("SELECT host_id, first_name, last_name, email, image_url FROM host")
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    for rows.Next() {
        var host models.Host
        err := rows.Scan(&host.HostID, &host.FirstName, &host.LastName, &host.Email, &host.ImageURL)
        if err != nil {
            return nil, err
        }
        hosts = append(hosts, host)
    }
    return hosts, nil
}