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
  app.post("/watch", isLoggedIn, async function (req, res) {
    let userInput = req.body.video;
    let apiLink = `https://www.googleapis.com/youtube/v3/search?part=snippet&safeSearch=strict&q=${userInput}&key=AIzaSyArYFnbPqIjwBBH3Pp1ff0cosu1CuBQ_T0`;
    console.log(req.body.video);
    
    const response = await fetch(apiLink)
    const data = await response.json()
    .catch((err) => {
      console.log(`${err} Cant find Information`);
    });

    let link = data.items[1].id.videoId;
    var url = `https://www.youtube.com/embed/${link}?enablejsapi=1`;
    // console.log(data);
    // console.log(data.items.snippet);
    // console.log(`this is the link ${link}`);

      // .then((res) => res.json())
      // .then((data) => {
      // })
      
    const user = await User.findById(req.user._id);
    user.info.lastVideo = url;
    const result = await user
      .save()
      .then((result) => {
        res.render("watch.ejs", { url: url });
      })
      .catch((error) => console.error(error));
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

  app.put("/thumbUp", (req, res) => {
    db.collection("moodry").findOneAndUpdate(
      { name: req.body.name, msg: req.body.msg },
      {
        $set: {
          thumbUp: req.body.thumbUp + 1,
        },
      },
      {
        sort: { _id: -1 },
        upsert: true,
      },
      (err, result) => {
        if (err) return res.send(err);
        res.send(result);
      }
    );
  });

  app.put("/thumbDown", (req, res) => {
    db.collection("moodry").findOneAndUpdate(
      { name: req.body.name, msg: req.body.msg },
      {
        $set: {
          thumbDown: req.body.thumbDown + 1,
        },
      },
      {
        sort: { _id: -1 },
        upsert: true,
      },
      (err, result) => {
        if (err) return res.send(err);
        res.send(result);
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
