module.exports = function(app, upload, fs,connection) {

  // server routes ===========================================================
  // handle things like api calls
  // authentication routes

  // frontend routes =========================================================
  // route to handle all angular requests
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });

  app.post('/upload', function(req, res) {
    upload(req, res, function(err) {
      if (err) {
        res.json({ error_code: 1, err_desc: err });
        return;
      } else if (req.file) {
        console.log("Uploaded" + JSON.stringify(req.file, null, 4));
        fs.readFile(req.file.path, function(err, data) {
          if (err) throw err;
          if (data.indexOf('praveen') > -1) {
            var post  = {Name: req.file.originalname, Path: req.file.path,Keywords:'praveen'};
            connection.query('INSERT INTO documentlist SET ?',post, function(err, rows, fields) {
              if (!err)
                console.log('The solution is: ', rows);
              else
                console.log('Error while performing Query.'+err);
            });
          } else {
            console.log("not found!");
          }
        });
        res.json({ error_code: 0, err_desc: "sucess" });
        return;
      }
    });
  });

};
