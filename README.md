# extract fresh WHOIS records database of daily registering domains


/*

1. setup express.js

2. connect to the databas

3. set up schema to store (name,domainName,email,number,and current time)

4. after successfully connected schema to database, store some info

5. using SMTP nodemailer to send a email after visited the domain

*/


# dependencies

/* 
   1. express: "^4.18.2", (for server side connection)

   2. mongoose: "^7.0.4", (for database)

   3. nodemailer: "^6.9.1", (for sending a mail)

   4. whois: "^2.14.0" , (for geting information of domains)
*/
