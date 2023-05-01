const fs = require("fs");
const { Pool } = require("pg");
const { from } = require("pg-copy-streams");

exports.bulkInsert = async () => {
  const credentials = {
    user: process.env.POSTGRES_USER,
    host: process.env.PGHOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
  };

  const pool = new Pool(credentials);

  pool.connect(function (err, client, done) {
    if (err) {
      console.log("POOL CONNECT ERROR", err);
      return;
    }
    console.log("START COPY");
    const stream = client.query(from("COPY abns FROM STDIN"));
    const fileStream = fs.createReadStream(
      `${process.cwd()}/csv/20230412_Public01.csv`
    );
    fileStream.on("error", (err) => {
      console.log("FILESTREAM ERROR:::", err);
      done(err);
    });
    stream.on("error", (err) => {
      console.log("STREAM ERROR:::", err);
      done(err);
    });
    stream.on("finish", () => {
      console.log("===COPY DONE===");
      done();
    });
    fileStream.pipe(stream);
  });
};
