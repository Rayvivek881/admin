const { connection, query, destroy } = require('./db/MySqlQuery.js');
let obj = {
    title : "ruby developer (backend)",
    location : "Noida, UP",
    exp_level : "3+ year",
    link : "www.google.com",
    tag : "tag1",
    id : "123"
}
let sql = `INSERT INTO Jobs (title, location, tag, exp_level, link, id)
            VALUES ('${obj.title}', '${obj.location}', '${obj.tag}', '${obj.exp_level}', '${obj.link}', '${obj.id}')`;
// let sql = `CREATE TABLE Jobs (
//     title varchar(100),
//     location varchar(100),
//     tag varchar(50),
//     exp_level varchar(50),
//     link varchar(500),
//     id varchar(50)
// )`;
connection().then(async (result) => {
    console.log('database connected............');
    const users = await query("SELECT * FROM Admin");
    console.log(users);
    destroy();
}).catch((err) => console.log("got some error" ));