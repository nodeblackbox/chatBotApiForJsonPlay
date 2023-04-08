# chatBotApiForJsonPlay

TODO: add mark down

<h1>Documentation</h1>

Playing with Json for the chatbot app: Sprint 3

<h2>my sql setup for windows</h2>

To install MySQL on Windows and run the command, follow these steps:

Download the MySQL Installer for Windows from the official MySQL website: https://dev.mysql.com/downloads/installer/

Run the installer and follow the prompts to install MySQL Server and any other components you need (e.g., MySQL Workbench, MySQL Shell).

After installation, make sure the MySQL server is running. You can check this by going to the Windows Services application (search "Services" in the Start menu) and looking for the "MySQL" service. If it's not running, right-click and select "Start."

Since PowerShell doesn't support input redirection, you'll need to use the mysql.exe command with the --execute or -e option to run your SQL script. First, navigate to the directory where your setup.sql file is located:

PS C:\Users\"your pc user name"\"path to"\chatBotApiForJsonPlay\chatBotApiForJsonPlay>
Next, run the MySQL command to execute the SQL script:

PS C:\Users\"your pc user name"\"path to"\chatBotApiForJsonPlay> & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u restricted_user -p -h localhost --execute="source setup.sql"

Make sure to replace 8.0 with your MySQL server version if it's different.

Enter the password for the restricted_user when prompted. The setup.sql script should now be executed.

If you want to use MySQL in the command prompt (cmd.exe) instead of PowerShell, you can use the input redirection with the '<' operator:

PS C:\Users\"your pc user name"\"path to"\chatBotApiForJsonPlay> "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u restricted_user -p -h localhost < setup.sql

Again, replace 8.0 with your MySQL server version if it's different.



if you did the firts command and it did not work us this
and to login
make sure to remember the root password that you used in the my sql set up

PS C:\Users\"your pc user name"\"path to"\chatBotApiForJsonPlay> & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p -h localhost --execute="source setup.sql"


PS C:\Users\"your pc user name"\"path to"\chatBotApiForJsonPlay> & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u restricted_user -p -h localhost --execute="source setup.sql"

TODO: fix documentation 

This is the one that works__________________
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p -h localhost --execute="source setup.sql"

Type this command to test if it works after its all set up & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u restricted_user -p -h localhost

remove latter
commands for me as a dev 
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p -h localhost 
SHOW DATABASES;
use chatbot_db;
SELECT * FROM users;