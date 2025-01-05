#!/bin/bash
# This bash script runs all SQL scripts relating to the events database
cd sql

mysql -u root -p"admin123" < create_database_events.sql
mysql -u root -p"admin123" < create_event_table.sql
mysql -u root -p"admin123" < create_rsvp_table.sql
mysql -u root -p"admin123" < create_host_table.sql
