const User = require("./models/user");

module.exports = function(app, passport, db, fetch) {
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
        });
      });
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
  // WATCH SECTION =========================
  app.get("/tableCreate", isLoggedIn, async function (req, res) {
    const moodData = req.user.moodData;
    res.json(moodData);
    console.log(moodData)
  });
  
  app.post("/watch", isLoggedIn, async function (req, res) {
    //DATE
    let dateTime = new Date();
    dateTime = dateTime.toISOString().slice(0, 10);

    let moodPicked = req.body.moodPicked;
    //Randomizer for Different Videos
    // let randomVideo = Math.floor(Math.random() * 3) + 1;

    // API LINK AND USER INPUT
    let userInput = req.body.video;
    let apiLink = `https://www.googleapis.com/youtube/v3/search?part=snippet&safeSearch=strict&q=${userInput}&key=AIzaSyCpPiE5R_BFeSzBteeupguxWEtHffDI6YQ`;
    // AIzaSyArYFnbPqIjwBBH3Pp1ff0cosu1CuBQ_T0;

    //FETCH ASYNC AWAIT
    const response = await fetch(apiLink);
    var data = await response.json().catch((err) => {
      console.log(`${err} Cant find Information`);
    });
    //MoodData push to array to search through in JS API
    let moodData = req.user.moodData;
    //Link for each VIDEO
    console.log('This is our link')
    console.log(data.items[1].id.videoId)
    
    let link = data.items[1];
    let linkName = link.snippet.title;
    
    const newMood = [dateTime, moodPicked, data.items[1].id.videoId];
    if(moodPicked){
      moodData.push(newMood); 
    }
      console.log('MoodData')
      console.log(moodData)
    //saves user session
    const user = await User.findById(req.user._id);
    user.moodData = moodData;
    //URL
    var url = `https://www.youtube.com/embed/${link.id.videoId}?enablejsapi=1`;
    //last video played by user
    user.info.lastVideo = url;
    console.log('user log')
    console.log(user)
    //SAVE EACH USER AND RENDER WATCH WITH OUR URL CONNECTING WITH THE SRC
    const result = await user
      .save()
      .then((result) => {
        res.render("watch.ejs", { url: url });
      })
      .catch((error) => console.error(error));

      // console.log(req.body.moodPicked)
  });

  app.get("/watch", isLoggedIn, function (req, res) {
    db.collection("moodry")
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("watch.ejs", {
          user: req.user,
          moodry: result,
          url: req.user.info.lastVideo,
        });
      });
  });

  // LOGOUT ==============================
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // message board routes ===============================================================
  app.post("/comments", isLoggedIn, async function (req, res){
    db.collection("moodry").save(
      {name: req.body.name, msg: req.body.msg},
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
      successRedirect: "/profile", // redirect to the secure profile section
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
