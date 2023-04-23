const express = require('express');
const router = express.Router();
const whois = require('whois');
const nodemailer = require('nodemailer');
const WhoisData = require('../modals/domain');
const inputDomains = require('../input/input.json');

// Perform WHOIS lookup for each domain
router.get('/whois', async (req, res) => {
  try {
    for (const inputDomain of inputDomains) {
      const { name, domainName, email, phone } = inputDomain;
      console.log(`Domain: ${domainName}`);
      const whoisData = await new Promise((resolve, reject) => {
        whois.lookup(domainName, (err, data) => {
          if (err) {
            console.log(`Error: ${err}`);
            reject(err);
          } else {
            // Parse WHOIS data and extract relevant information
            const regexRegistrar = /Registrar:\s*(.*)/i;
            const regexCreationDate = /Creation Date:\s*(.*)/i;
            const regexExpirationDate = /Expiration Date:\s*(.*)/i;
            const regexNameServer = /Name Server:\s*(.*)/i;

            const registrar = regexRegistrar.exec(data)?.[1] || 'N/A';
            const creationDate = regexCreationDate.exec(data)?.[1] || 'N/A';
            const expirationDate = regexExpirationDate.exec(data)?.[1] || 'N/A';
            const nameServer = regexNameServer.exec(data)?.[1] || 'N/A';

            console.log(registrar);
            console.log(creationDate);
            console.log(expirationDate);
            console.log(nameServer);
            resolve(
              new WhoisData({
                name,
                domainName,
                email,
                phone,
                registrar,
                creationDate,
                expirationDate,
                nameServer
              })
            );
          }
        });
      });

      await whoisData.save();
      console.log('WHOIS data stored in database.');

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'oool36068@gmail.com',
          pass: 'kgzoblxajohulfah'
        }
      });

      const mailOptions = {
        from: 'vinodsoni15012000@gmail.com',
        to: email,
        subject: `WHOIS Data for Domain Name: ${domainName}`,
        html: `
          <h3>WHOIS Data for Domain Name: ${domainName}</h3>
          <p>Name: ${name}</p>
          <p>Domain Name: ${domainName}</p>
          <p>Email ID: ${email}</p>
          <p>Phone Number: ${phone}</p>
          <h4>Domain details</h4>
          <p>Domain registrar: ${whoisData.registrar}</p>
          <p>Creation Date: ${whoisData.creationDate}</p>
          <p>Expiration Date: ${whoisData.expirationDate}</p>
          <p>Server Name: ${whoisData.nameServer}</p>
        `
      };
      
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(`Error while sending email: ${err}`);
        } else {
          console.log('Email sent:', info.response);
        }
      });

      console.log("=".repeat(50));
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

module.exports = router;
