const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const { body, validationResult } = require("express-validator"); //for simple initial  validation
const bcrypt = require("bcryptjs"); //to hash password
const jwt = require("jsonwebtoken"); // to create secure tokens for users

const JWT_SECRET = "strongKeyPassword_jwt";
const fetchuser = require("../middleware/fetchuser.js"); //middleware for protected routes

//Route 1 : creating a user using : POST "/api/auth/createuser" no login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isString(),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
    
      if (!result.isEmpty()) {
        res.status(500).send("some error occured");
      }

      //check if user already exists
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        res.status(409).json({ error: "A user account with this email id already exists" });
      }

      //genrating salt to use it with hash function for more secured hashed password
      const salt = await bcrypt.genSalt(10);
      //hashing function
      const hashedPassword = await bcrypt.hash(`${req.body.password}`, salt);

      

      user = User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      })
        .then((user) => {
          const data = {
            user: {
              id: user.id,
            },
          };
          const jwt_create_Token = jwt.sign(data, JWT_SECRET);
          res.json({ success: true, jwt: jwt_create_Token });
        })
        .catch(() => {
          res.status(500).send("some error occured");
        });
    } catch (error) {
      res.status(500).send("some error occured");
    }
  }
);



//Route 2 : Email verification route
router.get("/verify/:AuthToken", async (req, res) => {
  try {

    //retrieving the auth token from params 
    let jwt_token = req.params.AuthToken;

    //if the jwt is not present
    if (!jwt) {
      res.status(500).send("some error occured");
    }

    //jwt verification
    jwt.verify(jwt_token, JWT_SECRET, async (error, payload) => {
      if (error) {
        res.status(500).send("some error occured");
      } else {
        let user = await User.findById(payload.user.id);
        user.verified = true;
        user
          .save()
          .then(() => {
            res.json("Successfully verified");
          })
          .catch(() => {
            res.status(500).send("some error occured");
          });
      }
    });
  } catch (error) {
    res.status(500).send("some error occured");
  }
});

//Route 3 : authorizing a user using : POST "/api/auth/login" no login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be empty").exists(),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result) {
        return res.json({ error: result.array() });
      }

      const { email, password } = req.body;

      try {
        let user = await User.findOne({ email }); //user exists
        if (!user) {
          return res
            .status(400)
            .json({ error: "Please Enter correct credentials" }); //dont write attacker understanding prompts
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
          return res
            .status(400)
            .json({ error: "Please Enter correct credentials" }); //dont write attacker understanding prompts
        }
        const payLoad = {
          user: {
            id: user.id,
          },
        };
        const jwt_auth_Token = jwt.sign(payLoad, JWT_SECRET);

        if (!user.verified) {
          res.json({ e_verification: false,jwt: jwt_auth_Token });
        } else {
          res.json({ success: true, jwt: jwt_auth_Token });
        }
      } catch (error) {
        res.status(500).send("some error occured"); 
      }
    } catch (error) {
      res.status(500).send("some error occurred");
    }
  }
);

//Route 3 : getting details of a logged in  user using : post "/api/auth/getuser" login required

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userID = await req.user.id;
    let user = await User.findById(userID).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("some error occurred");
  }
});

module.exports = router;
