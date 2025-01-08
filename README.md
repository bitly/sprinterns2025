# sprinterns2025
Sprinternship 2025 Challenge Project

Tanzina Sumona

### Setup Your Local Go & SQL Environments
Go to https://github.com/bitly/sprinterns2025

Click the “<> Code” Dropdown button and toggle to SSH
Copy the url: git@github.com:bitly/sprinterns2025.git 

Open a Terminal window on your computer. If you have a Mac, this should be pretty straightforward (although we may need to install Git if you haven’t used it before). If you’re on a windows computer, we may need to install a git specific terminal - we’ll figure it out together!

`$ cd` (to get into your home directory) 

`$ git clone git@github.com:bitly/sprinterns2025.git`

If you get permissioning errors (about not being able to pull from this repo - we’ll need to take some steps to allow you to interact with git via SSH). 

Once you’ve successfully cloned the repository, if you do an `ls -la` command in your terminal, you should now see a “sprinterns2024” directory listed! 

Now we’ll deal with installing dependencies
`$ go mod tidy`

If you do not already have homebrew installed, you can do so by running the following command in your terminal:
`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

We also need to install our database - MySQL
`$ brew install mysql`

`$ brew services start mysql`

`$ mysql_secure_installation` - set the password to `admin`. You shouldn't enforce a strong password here because otherwise it'll reject admin. If you can't get it to accept admin, just put in a strong password then: 

`$ mysql -u root -p $ UPDATE mysql.user SET authentication_string=null WHERE User='root';`

`$ FLUSH PRIVILEGES; $ exit;` 

`$ mysql -u root $ ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'admin123';`


To Start the MySQL Server: 
`$ mysql.server start` 

To Stop the MySQL Server: 
`$ mysql.server stop`

To access the DB command line: 
`$ mysql -u root -p` (then enter the password you created when prompted)

Once the dependencies have been installed, you’ll be able to run the server/app with:
`$ go run main.go`

You will also need to create the database that stores the data from the events app. You can do this by running the following script:
`$ ./run_sql_scripts.sh`

### Setup your React environment 

First you will need to install node. If you are on a Mac and you've installed `brew` in the initial Go + MySQL setup step, you can just:
`$ brew install node`

Once Node is installed, if you have just set up your Go and SQL environments, you are likely already in the correct directory - i.e. the sprinterns2025
repository. From this directory, to setup your local React environment, you can do the following (in the command line):

`$ cd views/js/evently`

To install the required packages via npm (Node Package manager)
`$ npm install`

This should install all packages necessary to run the application. You can then attempt to run the frontend with:
`$ npm run start`

If you currently have the backend running, it is likely doing so on port 3000 which will collide with the default port for the frontend. When you run `npm run start`, if there is a port collision, you'll get the following prompt:

```
? Something is already running on port 3000. Probably:
  /var/folders/xr/47qyrvdn7hvczdf9_g8xjj_m0000gn/T/go-build2666203863/b001/exe/main (pid 40671)
  in /Users/dianabishop/sprinterns2024

Would you like to run the app on another port instead? › (Y/n)
```

Hit the "y" key on your keyboard and the FE will run on port 3001 instead and should automatically open the application in your browser. 
