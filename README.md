## XML parser

- When working with an XML parser, we should always use 2 libs
  - fast-xml-parser (https://www.npmjs.com/package/fast-xml-parser)
  - xml2js (https://www.npmjs.com/package/xml2js)

## Large XML file parser

- If we working with a large XML file, we can not use <b>fast-xml-parser</b> or <b>xml2js</b> because it parser to 1 large Javascript object. We need process an XML stream chunk by chunk. Fortunately, nodejs has <b>XmlStream</b> (https://www.npmjs.com/package/xml-stream)

## Pg copy

- After parser a large XML file, we have 2 options for inserting data to postgres:
  - Bulk insert to insert data to postgres
  - Use <b>pg-copy-streams</b>(https://www.npmjs.com/package/pg-copy-streams) to faster than bulk insert. <b>pg-copy-streams</b> will copy from CSV or TSV file into postgres so we use <b>csv-write-stream</b> (https://www.npmjs.com/package/csv-write-stream) to create CSV file

## Run

docker compose up
