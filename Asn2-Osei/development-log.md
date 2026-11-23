# Development Log

| Step | What I Built/Changed | Problem Faced | How I Tested/Fixed |
|---|---|---|---|
| 1 | Created the Express server | package.json had an invalid configuration | Fixed package.json and ran node server.js again |
| 2 | Added the /data route | Needed to make sure the JSON file loaded correctly | Opened /data and confirmed all products were displayed |
| 3 | Added the /data/:id route | Needed to match the URL ID with the product ID | Tested /data/1 and confirmed product ID 1 was returned |
| 4 | Added the /search and /filter routes | Search needed to work regardless of uppercase or lowercase letters | Used lowercase comparison and tested Mouse and electronics |
| 5 | Added the HTML forms and /random feature | Needed the form input names to match req.query | Tested the forms and refreshed /random to confirm it returned products |
| 6 | Enriched the Products dataset with image metadata | Needed to add image information to the original records | Ran the enrichment script and checked the updated JSON dataset |
| 7 | Added geolocation and nested pricing information | Needed to organize additional product information | Ran the enrichment scripts and confirmed the nested pricing information was added to the product records |
| 8 | Updated the dataset used by server.js | Needed the application to load the enriched dataset | Opened /data and confirmed the additional fields were displayed |
| 9 | Created the JavaScript product table at /table-js | Needed to display multiple product fields in an HTML table | Opened /table-js and confirmed the product records appeared |
| 10 | Installed and configured EJS | Needed to configure Express to use EJS templates | Installed EJS and tested the /table route |
| 11 | Created views/table.ejs | Needed to display nested pricing, tags, and product images | Opened /table and confirmed the product information appeared |
| 12 | Created public/style.css | The table initially displayed without the expected styling | Added CSS and refreshed the browser |
| 13 | Configured Express static middleware | The CSS changes were not appearing in the browser | Added express.static middleware and refreshed the page |
| 14 | Improved the /filter route | Needed to filter nested pricing and array fields | Tested category, currency, tag, and combined filters |
| 15 | Added custom request-logging middleware | Needed to monitor incoming requests | Tested /data and /table and checked the VS Code terminal |
| 16 | Added Express URL-encoded middleware | Needed Express to read submitted HTML form data | Submitted information through the product form |
| 17 | Created public/add.html | Needed an HTML form for product submissions | Opened /add and confirmed the form was displayed |
| 18 | Added GET and POST /add routes | Needed to process submissions and validate the information | Tested valid and invalid product submissions |
| 19 | Updated README.md | Needed to document the new Assignment 2 features | Reviewed the project description, routes, and EJS explanations |
| 20 | Updated ai-use.md | Needed to disclose the use of Generative AI | Reviewed the AI assistance and learning disclosure |

## Development Summary

During development, I extended my original Product Inventory Explorer application by enriching the dataset and adding new Express features.

I implemented JavaScript and EJS tables, CSS styling, filtering using nested and array fields, custom middleware, request logging, and an HTML product submission form with server-side validation.

I tested the implemented features locally using the browser and VS Code terminal.