const express = require("express");
const path = require("path");
const { format } = require("date-fns");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const localStorage = require("localStorage");
const cors = require("cors");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const nodemailer = require("nodemailer");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

app.use(express.json());
app.use(cors());
const dbPath = path.join(__dirname, "lms.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

const validatePassword = (password) => {
  return password.length > 4;
};

app.post("/register", async (request, response) => {
  try {
    const { id, name, email, mobile, password } = request.body;
    const hashedPassword = await bcrypt.hash(password, 5);
    const selectUserQuery = `SELECT * FROM user WHERE email = '${email}';`;
    const databaseUser = await db.get(selectUserQuery);

    if (databaseUser === undefined) {
      const createUserQuery = `
     INSERT INTO
      user_details (user_id, name, email, mobile, password)
     VALUES(
       '${id}',
       '${name}',
       '${email}',
       ${mobile},
       '${hashedPassword}'
      );`;
      if (validatePassword(password)) {
        await db.run(createUserQuery);
        response.send({ message: "You Register successfully" });
      } else {
        response.status(400);
        response.send("Password is too short");
      }
    } else {
      response.status(200);
      response.send({ message: "You already exists please Login" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const selectUserQuery = `SELECT * FROM user_details WHERE email = '${email}';`;
    const databaseUser = await db.get(selectUserQuery);
    console.log(databaseUser);
    if (databaseUser === undefined) {
      response.status(400);
      response.send("Invalid user");
    } else {
      const isPasswordMatched = await bcrypt.compare(
        password,
        databaseUser.password
      );
      if (isPasswordMatched === true) {
        const payload = { email: email };
        const jwt_token = await jwt.sign(payload, JWT_SECRET);
        response.send({ jwt_token });
      } else {
        response.status(400);
        response.send("Invalid password");
      }
    }
  } catch (error) {
    console.log(error.message);
  }
});

function authenticateToken(request, response, next) {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  //   console.log(authHeader);
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
    console.log(jwtToken);
  }
  if (jwtToken === undefined) {
    // console.log(jwtToken);
    response.status(401);
    response.send("Invalid JWT Token");
  } else {
    // console.log(jwtToken);
    const verifyToken = jwt.verify(
      jwtToken,
      JWT_SECRET,
      async (error, payload) => {
        if (error) {
          response.status(401);
          response.send("Invalid JWT Token");
        } else {
          //   console.log({ ...payload });
          localStorage.setItem("userEmail", payload.email);
          request.email = payload.email;
          next();
        }
      }
    );
  }
}

app.get("/profile", authenticateToken, async (req, res, next) => {
  const email = localStorage.getItem("userEmail");
  //   const { email } = req;
  console.log(email);

  const getUserQuery = `SELECT name,email,mobile FROM user_details WHERE email='${email}';`;
  const userDetails = await db.get(getUserQuery);
  res.send(userDetails);
});

app.post("/LaundryRequest", async (request, response, next) => {
  //   const email = localStorage.getItem("userEmail");

  const {
    email,
    requestDate,
    topwear,
    bottomwear,
    woolenCloth,
    service,
    contact,
    address,
    status,
    description,
  } = request.body;

  const result = format(new Date(requestDate), "yyyy-MM-dd");
  console.log(result);
  const request_date = result;

  const createUserQuery = `
     INSERT INTO
      user_laundry_request (
      email,
      request_date,
      topwear,
      bottomwear,
      woolenCloth,
      service,
      contact,
      address,
      status,
      description)
     VALUES
      (
       '${email}',
       '${request_date}',
       ${parseInt(topwear)},
       ${parseInt(bottomwear)},
       ${parseInt(woolenCloth)},
       '${service}',
       ${parseInt(contact)},
       '${address}',
       '${status}',
       '${description}'
      );`;

  await db.run(createUserQuery);
  response.send({ message: "Requested LaundryDetails successfully" });
});

app.get("/LaundryStatus", authenticateToken, async (request, response) => {
  const { email } = request;
  //   console.log(email);

  const getUserQuery = `
  SELECT request_id,name,user_details.email,request_date,topwear,bottomwear,woolenCloth,
  service,contact,address,status,description
   FROM user_details INNER JOIN user_laundry_request ON user_details.email= user_laundry_request.email
  WHERE user_details.email = '${email}'`;
  const userArray = await db.all(getUserQuery);
  response.send(userArray);
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const getUserQuery = `SELECT * FROM user_details WHERE email='${email}';`;
    const oldUser = await db.get(getUserQuery);
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign(
      { email: oldUser.email, id: oldUser.user_id },
      secret,
      {
        expiresIn: "30m",
      }
    );
    const link = `http://localhost:3000/reset-password/${oldUser.user_id}/${token}`;
    res.send({ link: link, id: oldUser.user_id });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "vara96922@gmail.com",
        pass: "haqbywqykeccsfiv",
      },
    });

    var mailOptions = {
      from: "vara96922@gmail.com",
      to: oldUser.email,
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    // console.log(link);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  //   console.log(req.params);
  const getUserQuery = `SELECT * FROM user_details WHERE user_id='${id}';`;
  const oldUser = await db.get(getUserQuery);
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const getUserQuery = `SELECT * FROM user_details WHERE user_id='${id}';`;
  const oldUser = await db.get(getUserQuery);
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    const updatedQuery = `UPDATE user_details SET password = '${encryptedPassword}' WHERE user_id = '${id}';`;
    await db.run(updatedQuery);

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});
