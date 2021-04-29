const User = require("./models/user");

module.exports = function(app, passport, db, fetch) {
  var linkTitle;
  // normal routes     ===============================================================
  // show the home page (will also have our login links)
  app.get("/", function (req, res) {
    res.render("index.ejs");
  });

  // HOME SECTION =========================
  app.get("/index", isLoggedIn, function (req, res) {
    db.collection("moodry")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("index.ejs", {
          user: req.user,
          moodry: result,
          userInfo: req.user.userInfo
        });
      });
  });
  // ONBOARD SECTION =========================
  app.get("/onboard", isLoggedIn, function (req, res) {
    const onBoarded = req.user.local.onBoardingComplete
    if (onBoarded){
      res.redirect("/profile")
    }
    else {
      db.collection("moodry")
        .find()
        .toArray((err, result) => {
          if (err) return console.log(err);
          res.render("onboard.ejs", {
            user: req.user,
            moodry: result,
            userInfo: req.user.userInfo
          });
        });
    }
  });
  app.post("/onboard", isLoggedIn, async function (req, res) {
    let user = await User.findById(req.user._id)
    const userInfo = req.body.userInfo
    user.userInfo = userInfo
    // let image = user.userInfo.profileImage;
    // console.log(image, 'My image')

    //Wont send to onboarding page if true.
    user.local.onBoardingComplete = true
    userInfo.birthday = userInfo.birthday.slice(0, 15);

    const result = await user.save()
    .then(result => {
      res.redirect('/profile')
    })
    .catch(err => {
      console.log(err)
    })
  });

  // ABOUT SECTION =========================
  app.get("/about", function (req, res) {
    db.collection("moodry")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("about.ejs", {
          user: req.user,
          moodry: result,
        });
      });
  });

  app.get("/aboutUser", isLoggedIn, function (req, res) {
    db.collection("moodry")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("aboutUser.ejs", {
          user: req.user,
          moodry: result,
        });
      }); 
  });
  // PROFILE SECTION =========================
  app.get("/profile", isLoggedIn, function (req, res) {
    db.collection("moodry")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("profile.ejs", {
          user: req.user,
          moodry: result,
          userInfo: req.user.userInfo
        });
      });
  });


  app.post("/moodry", (req, res) => {
    db.collection("moodry").save(
      { name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown: 0 },
      (err, result) => {
        if (err) return console.log(err);
        console.log("saved to database");
        res.redirect("/profile");
      }
    );
  });

  // GAMES SECTION =========================
  app.get("/games", isLoggedIn, function (req, res) {
    db.collection("moodry")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("games.ejs", {
          user: req.user,
          moodry: result,
          userInfo: req.user.userInfo
        });
      });
  });
  // GAME ONE =========================
  app.get("/gameOne", isLoggedIn, function (req, res) {
    db.collection("moodry")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("gameOne.ejs", {
          user: req.user,
          moodry: result,
          userInfo: req.user.userInfo
        });
      });
  });
  // GAME TWO =========================
  app.get("/gameTwo", isLoggedIn, function (req, res) {
    db.collection("moodry")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("gameTwo.ejs", {
          user: req.user,
          moodry: result,
          userInfo: req.user.userInfo
        });
      });
  });
  // GAME THREE =========================
  app.get("/gameThree", isLoggedIn, function (req, res) {
    db.collection("moodry")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("gameThree.ejs", {
          user: req.user,
          moodry: result,
          userInfo: req.user.userInfo
        });
      });
  });
  // GAME FOUR =========================
  app.get("/gameFour", isLoggedIn, function (req, res) {
    db.collection("moodry")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("gameFour.ejs", {
          user: req.user,
          moodry: result,
          userInfo: req.user.userInfo
        });
      });
  });

  // LEARNING SECTION =========================
  app.get("/learning", isLoggedIn, function (req, res) {
    db.collection("moodry")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("learning.ejs", {
          user: req.user,
          moodry: result,
          userInfo: req.user.userInfo
        });
      });
  });
  // LEARN ONE =========================
  app.get("/learnOne", isLoggedIn, function (req, res) {
    db.collection("moodry")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("learnOne.ejs", {
          user: req.user,
          moodry: result,
          userInfo: req.user.userInfo
        });
      });
  });
  // LEARN TWO =========================
  app.get("/learnTwo", isLoggedIn, function (req, res) {
    db.collection("moodry")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("learnTwo.ejs", {
          user: req.user,
          moodry: result,
          userInfo: req.user.userInfo
        });
      });
  });
  // LEARN THREE =========================
  app.get("/learnThree", isLoggedIn, function (req, res) {
    db.collection("moodry")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("learnThree.ejs", {
          user: req.user,
          moodry: result,
          userInfo: req.user.userInfo
        });
      });
  });

  // CHAT SECTION =========================
  app.get("/activity", isLoggedIn, function (req, res) {
    db.collection("moodry")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("activity.ejs", {
          user: req.user,
          moodry: result,
          userInfo: req.user.userInfo
        });
      });
  });
  // CONTACT SECTION =========================
  app.get("/contact", function (req, res) {
    db.collection("moodry")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("contact.ejs", {
          user: req.user,
          moodry: result,
        });
      });
  });
  app.get("/contactUser", isLoggedIn, function (req, res) {
    db.collection("moodry")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("contactUser.ejs", {
          user: req.user,
          moodry: result,
        });
      });
  });

  // TABLE CREATION SECTION =========================
  app.get("/tableCreate", isLoggedIn, async function (req, res) {
    const moodData = req.user.moodData;
    res.json(moodData);
  });
   app.get("/gameCreate", isLoggedIn, async function (req, res) {
     const gamesData = req.user.gamesData;
     res.json(gamesData);
   });
   app.get("/learnCreate", isLoggedIn, async function (req, res) {
     const learnData = req.user.learnData;
     res.json(learnData)
   });
   app.get("/doActivity", isLoggedIn, async function (req, res) {
     const activityData = req.user.activityData;
     res.json(activityData)
   });

   //GAME DATA POST
   app.post("/gameCreate", isLoggedIn, async function (req, res) {
    //DATE
    var dateTime = new Date();
    dateTime =
      ("0" + (dateTime.getMonth() + 1)).slice(-2) +
      "/" +
      ("0" + dateTime.getDate()).slice(-2) +
      "/" +
      dateTime.getFullYear();

    let gamesData = req.user.gamesData;
    let gameName = req.body.gameName
    gamesData.push([gameName, dateTime]);
    console.log(gamesData)
    var user = await User.findById(req.user._id);
    user.gamesData = gamesData;
    // user.info.lastVideo = url;

    let result = await user
      .save()
      .then((result) => {
        res.json("success");
      })
      .catch((error) => console.error(error));
   });

   //LEARN DATA POST
   app.post("/learnCreate", isLoggedIn, async function (req, res) {
     //DATE
     var dateTime = new Date();
     dateTime =
       ("0" + (dateTime.getMonth() + 1)).slice(-2) +
       "/" +
       ("0" + dateTime.getDate()).slice(-2) +
       "/" +
       dateTime.getFullYear();

     let learnData = req.user.learnData;
     let learnName = req.body.learnName;

     learnData.push([learnName, dateTime]);
     console.log(learnData)
     var user = await User.findById(req.user._id);
     user.learnData = learnData;
     // user.info.lastVideo = url;

     let result = await user
       .save()
       .then((result) => {
         res.json("success");
       })
       .catch((error) => console.error(error));
   });
   //ACTIVITY DATA POST
   app.post("/doActivity", isLoggedIn, async function (req, res) {
     //DATE
     var dateTime = new Date();
     dateTime =
       ("0" + (dateTime.getMonth() + 1)).slice(-2) +
       "/" +
       ("0" + dateTime.getDate()).slice(-2) +
       "/" +
       dateTime.getFullYear();

     let activityData = req.user.activityData;
     let activity = req.body.activity;
     activityData.push([activity, dateTime]);
     console.log(activityData);
     var user = await User.findById(req.user._id);
     user.activityData = activityData;
     // user.info.lastVideo = url;

     let result = await user
       .save()
       .then((result) => {
         res.json("success");
       })
       .catch((error) => console.error(error));
   });
  

  //API AND POST
  app.post("/watch", isLoggedIn, async function (req, res) {
    // Randomizer for Different Videos
    let randomVideo = Math.floor(Math.random() * 3) + 1;

    // API LINK AND USER INPUT
    let userInput = req.body.video;
    let apiLink = `https://www.googleapis.com/youtube/v3/search?part=snippet&enablejsapi=1&safeSearch=strict&q=${userInput}&key=AIzaSyCpPiE5R_BFeSzBteeupguxWEtHffDI6YQ`;

    //AIzaSyArYFnbPqIjwBBH3Pp1ff0cosu1CuBQ_T0;
    //AIzaSyCpPiE5R_BFeSzBteeupguxWEtHffDI6YQ

    //FETCH ASYNC AWAIT
    let response = await fetch(apiLink);
    var data = await response.json().catch((err) => {
      console.log(`${err} Cant find Information`);
    });

    var link = data.items[randomVideo];
    linkTitle = link.snippet.title;

    //URL
    var url = `https://www.youtube.com/embed/${link.id.videoId}?enablejsapi=1`;

    var user = await User.findById(req.user._id);

    //saves last video
    user.info.lastVideo = url;

    //SAVE EACH USER AND RENDER WATCH WITH OUR URL CONNECTING WITH THE SRC
    let result = await user
      .save()
      .then((result) => {
        res.render("watch.ejs", { url: url, userInfo: req.user.userInfo});
      })
      .catch((error) => console.error(error));
  });

  // MOOD SELECTOR POST
  app.post("/moodPicked", isLoggedIn, async function (req, res) {
    //DATE
    var dateTime = new Date();
    dateTime =
      ("0" + (dateTime.getMonth() + 1)).slice(-2) +
      "/" +
      ("0" + dateTime.getDate()).slice(-2) +
      "/" +
      dateTime.getFullYear()

    //mood picker
    let moodPicked = req.body.moodPicked;
    let moodData = req.user.moodData;
    moodData.push([linkTitle, moodPicked, dateTime]);
    var user = await User.findById(req.user._id);
    user.moodData = moodData;
    // user.info.lastVideo = url;

    let result = await user
      .save()
      .then((result) => {
        res.json("success");
      })
      .catch((error) => console.error(error));
  });

  //WATCH SECTION
  app.get("/watch", isLoggedIn, function (req, res) {
    db.collection("moodry")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("watch.ejs", {
          user: req.user,
          moodry: result,
          userInfo: req.user.userInfo,
          url:
            req.user.info.lastVideo ||
            `https://www.youtube.com/embed/gghDRJVxFxU?enablejsapi=1`,
        });
      });
  });

  // LOGOUT ==============================
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // message board routes ===============================================================
  app.post("/comments", isLoggedIn, async function (req, res) {
    db.collection("moodry").save(
      { name: req.body.name, msg: req.body.msg },
      (err, result) => {
        if (err) return console.log(err);
        console.log("saved to database");
        res.redirect("/profile");
      }
    );
  });

  app.delete("/trash", (req, res) => {
    db.collection("moodry").findOneAndDelete(
      { name: req.body.name, msg: req.body.msg },
      (err, result) => {
        if (err) return res.send(500, err);
        res.send("Message deleted!");
      }
    );
  });

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get("/login", function (req, res) {
    res.render("login.ejs", { message: req.flash("loginMessage") });
  });

  // process the login form
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/profile", // redirect to the secure profile section
      failureRedirect: "/login", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash moodry
    })
  );

  // SIGNUP =================================
  // show the signup form
  app.get("/signup", function (req, res) {
    res.render("signup.ejs", { message: req.flash("signupMessage") });
  });

  // process the signup form
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/onboard", // redirect to the secure profile section
      failureRedirect: "/signup", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash moodry
    })
  );

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get("/unlink/local", isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect("/profile");
    });
  });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
