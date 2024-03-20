var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secret = 'login'  
app.use(cors())
const mysql = require('mysql2');
app.use(express.json());
app.use(express.static('public'));
const multer = require('multer') //http://expressjs.com/en/resources/middleware/multer.html npm install --save multer
const { Public } = require('@mui/icons-material')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'user'
  });
app.post('/register', jsonParser, function (req, res, next) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        connection.execute(
            'INSERT INTO users (username,password,name,phone) VALUES (?,?,?,?)',
            [req.body.username,hash,req.body.name,req.body.phone],
            function(err, results, fields) {
              if(err)   {
                req.json({status:'error',message:err})
                return
              }
              res.json({status:'ok'})
        
            }
          );
    });
})

app.post('/login', jsonParser, function (req, res, next) {
  connection.execute(
    'SELECT * FROM users WHERE username = ?',
    [req.body.username],
    function(err, users, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }
      if (users.length === 0) {
        res.json({ status: 'error', message: 'User not found' });
        return;
      }

      const user = users[0];

      // ตรวจสอบรหัสผ่าน
      bcrypt.compare(req.body.password, user.password, function (err, isLoggedIn) {
        if (isLoggedIn) {
          // ดึงค่า role จาก MySQL
          const role = user.role;
          const id =user.id;
          const name =user.name;
          // กำหนดค่า role ใน payload ของ JWT
          var token = jwt.sign({ username: user.username, role: role ,id:id, name:name }, secret);
          res.json({ status: 'ok', message: 'login success', token, role,id,name });
        } else {
          res.json({ status: 'error', message: 'login failed' });
        }
      });
    }
  );
})


app.post('/authen', jsonParser, function (req, res, next){
    try{
        const token = req.headers.authorization.split(' ')[1]
        var decoded =jwt.verify(token,secret);
        res.json({status:'ok',decoded});
    } catch(err){
        res.json({status:'error',message:err.message})
    }
})

app.get('/attractions', function (req, res) {
  connection.query(
    'SELECT At_id, At_name, At_image, At_image1, At_image2, At_image3, At_image4 FROM db_attraction',
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
      } else {
        res.json({ status: 'ok', attractions: results });
      }
    }
  );  
});


app.get('/attractions/:At_id', (req, res) => {
  const At_id = req.params.At_id;

  // ใช้ SQL query ในการดึงข้อมูลจากฐานข้อมูล
  connection.query(
    'SELECT * FROM db_attraction WHERE At_id = ?',
    [At_id],
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
      } else if (results.length > 0) {
        // ถ้าพบข้อมูลแหล่งท่องเที่ยว
        const attraction = results[0];
        res.json({ status: 'ok', attraction });
      } else {
        // ถ้าไม่พบข้อมูล
        res.json({ status: 'error', message: 'Attraction not found' });
      }
    }
  );
});


app.get('/attractions11/:id', (req, res) => {
  const id = req.params.id;

  // ใช้ SQL query ในการดึงข้อมูลจากฐานข้อมูล
  connection.query(
    'SELECT * FROM db_attraction WHERE At_id = ?',
    [id],
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
      } else if (results.length > 0) {
        // ถ้าพบข้อมูลแหล่งท่องเที่ยว
        const attractions1 = results[0];
        res.json({ status: 'ok', attractions1 });
      } else {
        // ถ้าไม่พบข้อมูล
        res.json({ status: 'error', message: 'Attraction not found' });
      }
    }
  );
});



app.get('/Ardatad', function (req, res) {
  connection.query(
    'SELECT * FROM ar_datad',
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
      } else {
        res.json({ status: 'ok', Ardatad: results });
      }
    }
  );  
});



app.get('/Ardatad/:At_id', (req, res) => {
  const At_id = req.params.At_id; // ใช้ At_id แทน req.params.id

  // ใช้ SQL query ในการดึงข้อมูลจากฐานข้อมูล
  connection.query(
    'SELECT * FROM ar_datad WHERE id = ?',
    [At_id],
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
      } else if (results.length > 0) {
        // ถ้าพบข้อมูลแหล่งท่องเที่ยว
        const attraction = results[0];
        res.json({ status: 'ok', attraction });
      } else {
        // ถ้าไม่พบข้อมูล
        res.json({ status: 'error', message: 'Attraction not found' });
      }
    }
  );
});

app.get('/Armarker', function (req, res) {
  connection.query(
    'SELECT id, url1, url2,url3,url4,url5,url6,imageMark FROM armarker_url',
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
      } else {
        res.json({ status: 'ok', Armarker: results });
      }
    }
  );  
});




app.get('/Armarker/:At_id', (req, res) => {
  const At_id = req.params.At_id;

  connection.query(
    'SELECT * FROM armarker_url WHERE id = ?',
    [At_id],
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
      } else if (results.length > 0) {
        const attraction = results[0];
        res.json({ status: 'ok', attraction });
      } else {
        res.json({ status: 'error', message: 'Attraction not found' });
      }
    }
  );
});


app.get('/Arlocation', function (req, res) {
  connection.query(
    'SELECT id, urll1, urll2,urll3,urll4,urll5,urll6 FROM arlocations_url',
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
      } else {
        res.json({ status: 'ok', attractions: results });
      }
    }
  );  
});

app.get('/Arlocation/:At_id', (req, res) => {
  const At_id = req.params.At_id;

  connection.query(
    'SELECT * FROM arlocations_url WHERE id = ?',
    [At_id],
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
      } else if (results.length > 0) {
        const attraction = results[0];
        res.json({ status: 'ok', attraction });
      } else {
        res.json({ status: 'error', message: 'Attraction not found' }); 
      }
    }
  );
});


app.post('/reviewAt', jsonParser, function (req, res, next) {
  const { id, name, note_review, At_id, rating } = req.body;

  connection.beginTransaction(function(err) {
    if (err) {
      res.json({ status: 'error', message: err });
      return;
    }

    // Insert review into review table
    connection.execute(
      'INSERT INTO review (id, name, note_review, At_id) VALUES (?, ?, ?, ?)',
      [id, name, note_review, At_id],
      function(err, results, fields) {
        if (err) {
          return connection.rollback(function() {
            res.json({ status: 'error', message: err });
          });
        }

        // Insert or update rating in scores table
        connection.execute(
          'INSERT INTO scores (id, rating, At_id) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rating = ?',
          [id, rating, At_id, rating],
          function(err, results, fields) {
            if (err) {
              return connection.rollback(function() {
                res.json({ status: 'error', message: err });
              });
            }

            connection.commit(function(err) {
              if (err) {
                return connection.rollback(function() {
                  res.json({ status: 'error', message: err });
                });
              }
              res.json({ status: 'ok' });
            });
          }
        );
      }
    );
  });
});
// GET endpoint to check if user has rated
app.get('/checkRating/:At_id', (req, res) => {
  const { At_id } = req.params;
  const { id } = req.query;

  const sql = 'SELECT * FROM scores WHERE At_id = ? AND id = ?';
  connection.query(sql, [At_id, id], (err, results) => {
    if (err) {
      console.error('Error checking rating:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.status(200).json({ hasRated: results.length > 0 });
  });
});


app.get('/reviewAt/:At_id', function (req, res, next) {
  const At_id = req.params.At_id;

  // Your connection logic, assuming you have access to 'connection'

  connection.query(
    'SELECT * FROM review WHERE At_id = ?',
    [At_id],
    function(err, reviewResults, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }

      connection.query(
        'SELECT * FROM scores WHERE At_id = ?',
        [At_id],
        function(err, scoresResults, fields) {
          if (err) {
            res.json({ status: 'error', message: err });
            return;
          }

          res.json({ status: 'ok', review: reviewResults, scores: scoresResults });
        }
      );
    }
  );
});


app.get('/reviewAt2', jsonParser, function (req, res, next) {

  connection.query(
    'SELECT At_id, rating, id FROM scores',
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
      } else {
        res.json({ status: 'ok', ratings: results });
      }
    }
  );  
});





app.get('/user', function (req, res) {
  connection.query(
    'SELECT id, username, password, name, phone, role,Lifestyle,birthday,imageFile FROM users',
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
      } else {
        res.json({ status: 'ok', user : results });
      }
    }
  );  
});

app.get('/user/:id', function (req, res) {
  const id = req.params.id;
  connection.query(
    'SELECT * FROM users WHERE id = ?',
    [id],
    function (err, results, fields) {
      if (err) {
        res.status(500).json({ status: 'error', message: err }); 
      } else {
        res.json({ status: 'ok', user: results });
      }
    }
  );
});

///////////////////////////////////////////////////////////////////////////////////////////////////////

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

app.put('/editProfile/:id', upload.single('imageFile'), (req, res) => {
  const id = req.params.id;
  const { name, phone, birthday, Lifestyle } = req.body;
  let imageFile = req.file ? req.file.filename : null; // Check if there is an uploaded file before accessing its properties

  if (!name || !phone || !birthday || !Lifestyle) {
    return res.status(400).json({ status: 'error', message: 'Name, phone, birthday, and Lifestyle are required' });
  }

  // Check if there is a new uploaded file and the new file name is different from the old one
  if (req.file && req.file.filename !== req.body.oldImageFile) {
    // If there is a new file and the filename is different from the old one
    imageFile = req.file.filename;

    // Delete the old file
    if (req.body.oldImageFile) {
      const oldImagePath = `./public/images/${req.body.oldImageFile}`;
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error('Error deleting old image:', err);
        }
      });
    }
  }

  // Check if any field is empty, if yes, use the existing data from the database
  const query = 'UPDATE users SET name = COALESCE(?, name), phone = COALESCE(?, phone), imageFile = COALESCE(?, imageFile), birthday = COALESCE(?, birthday), Lifestyle = COALESCE(?, Lifestyle) WHERE id = ?';
  const params = [name, phone, imageFile, birthday, Lifestyle, id];

  connection.query(query, params, (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }

    res.json({ status: 'ok', message: 'Profile updated successfully', imageFile: imageFile });
  });
});
































///////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/Atadd', jsonParser, function (req, res, next) {
  const {
    At_name,
    At_image,
    At_image1,
    At_image2,
    At_image3,
    At_image4,
    At_details,
    At_record,
    At_contact,
    At_record2,
    At_address,
    longitude,
    latitude,

    url_image1,
    url_image2,
    url_image3,
    url_image4,
    url_image5,
    url_image6,
    name1,
    name2,
    name3,
    name4,
    name5,
    name6,
    urll1,
    urll2,
    urll3,
    urll4,
    urll5,
    urll6,
    url1,
    url2,
    url3,
    url4,
    url5,
    url6

  } = req.body;

  connection.beginTransaction(function(err) {
    if (err) {
      return res.json({ status: 'error', message: err });
    }

    // Insert data into db_attraction table
    connection.execute(
      'INSERT INTO db_attraction (At_name, At_image, At_image1, At_image2, At_image3, At_image4, At_details, At_record, At_contact, At_record2, At_address, longitude, latitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [At_name, At_image, At_image1, At_image2, At_image3, At_image4, At_details, At_record, At_contact, At_record2, At_address, longitude, latitude],
      function(err, results, fields) {
        if (err) {
          return connection.rollback(function() {
            res.json({ status: 'error', message: err });
          });
        }

        // Insert data into arlocations_url table
        connection.execute(
          'INSERT INTO arlocations_url (urll1, urll2, urll3, urll4, urll5, urll6) VALUES (?, ?, ?, ?, ?, ?)',
          [urll1, urll2, urll3, urll4, urll5, urll6],
          function(err, results, fields) {
            if (err) {
              return connection.rollback(function() {
                res.json({ status: 'error', message: err });
              });
            }

            // Insert data into armarker_url table
            connection.execute(
              'INSERT INTO armarker_url (url1, url2, url3, url4, url5, url6) VALUES (?, ?, ?, ?, ?, ?)',
              [url1, url2, url3, url4, url5, url6],
              function(err, results, fields) {
                if (err) {
                  return connection.rollback(function() {
                    res.json({ status: 'error', message: err });
                  });
                }

                // Insert data into ar_datad table
                connection.execute(
                  'INSERT INTO ar_datad (url_image1, url_image2, url_image3, url_image4, url_image5, url_image6, name1, name2, name3, name4, name5, name6) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                  [url_image1, url_image2, url_image3, url_image4, url_image5, url_image6, name1, name2, name3, name4, name5, name6],
                  function(err, results, fields) {
                    if (err) {
                      return connection.rollback(function() {
                        res.json({ status: 'error', message: err });
                      });
                    }

                    connection.commit(function(err) {
                      if (err) {
                        return connection.rollback(function() {
                          res.json({ status: 'error', message: err });
                        });
                      }
                      res.json({ status: 'ok' });
                    });
                  }
                );
              }
            );
          }
        );
      }
    );
  });
});



app.put('/editAt/:id', (req, res) => {
  const id = req.params.id;
  const {
    At_name,
    At_image,
    At_image1,
    At_image2,
    At_image3,
    At_image4,
    At_details,
    At_record,
    At_contact,
    At_record2,
    At_address,
    longitude,
    latitude,
    url_image1,
    url_image2,
    url_image3,
    url_image4,
    url_image5,
    url_image6,
    name1,
    name2,
    name3,
    name4,
    name5,
    name6,
    url1,
    url2,
    url3,
    url4,
    url5,
    url6,
    urll1,
    urll2,
    urll3,
    urll4,
    urll5,
    urll6,
  } = req.body;

  // Check for required fields
  if (!At_name || !At_image || !At_image1 || !At_image2 || !At_image3 || !At_image4 || !At_details || !At_record || !At_contact || !At_record2 || !At_address || !longitude || !latitude || !url_image1 || !url_image2 || !url_image3 || !url_image4 || !url_image5 || !url_image6 || !name1 || !name2 || !name3 || !name4 || !name5 || !name6 || !url1 || !url2 || !url3 || !url4 || !url5 || !url6|| !urll1 || !urll2 || !urll3 || !urll4 || !urll5 || !urll6) {
    return res.status(400).json({ status: 'error', message: 'required fields are missing' });
  }

  let query = `
    UPDATE db_attraction
    SET At_name = ?, At_image = ?, At_image1 = ?, At_image2 = ?, At_image3 = ?, At_image4 = ?, At_details = ?, At_record = ?, At_contact = ?, At_record2 = ?, At_address = ?, longitude = ?, latitude = ?
    WHERE At_id = ?`;

  const params = [
    At_name,
    At_image,
    At_image1,
    At_image2,
    At_image3,
    At_image4,
    At_details,
    At_record,
    At_contact,
    At_record2,
    At_address,
    longitude,
    latitude,
    id,
  ];

  // Execute the first update query
  connection.query(query, params, (error, results) => {
    if (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }

    // If the first query is successful, update ar_datad table
    query = `
      UPDATE ar_datad
      SET url_image1 = ?, url_image2 = ?, url_image3 = ?, url_image4 = ?, url_image5 = ?, url_image6 = ?, name1 = ?, name2 = ?, name3 = ?, name4 = ?, name5 = ?, name6 = ?
      WHERE id = ?`;

    const arParams = [
      url_image1,
      url_image2,
      url_image3,
      url_image4,
      url_image5,
      url_image6,
      name1,
      name2,
      name3,
      name4,
      name5,
      name6,
      id,
    ];

    // Execute the second update query for ar_datad table
    connection.query(query, arParams, (arError, arResults) => {
      if (arError) {
        return res.status(500).json({ status: 'error', message: arError.message });
      }

      // If the second query is successful, update arlocations_url table
      query = `
        UPDATE arlocations_url
        SET urll1 = ?, urll2 = ?, urll3 = ?, urll4 = ?, urll5 = ?, urll6 = ? WHERE id = ?`;

      const arLocParams = [
        urll1,
        urll2,
        urll3,
        urll4,
        urll5,
        urll6,
        id,
      ];

      // Execute the third update query for arlocations_url table
      connection.query(query, arLocParams, (arLocError, arLocResults) => {
        if (arLocError) {
          return res.status(500).json({ status: 'error', message: arLocError.message });
        }

        // If the third query is successful, update armarker_url table
        query = `
          UPDATE armarker_url
          SET url1 = ?, url2 = ?, url3 = ?, url4 = ?, url5 = ?, url6 = ?
          WHERE id = ?`;

        const arMarkerParams = [
          url1,
          url2,
          url3,
          url4,
          url5,
          url6,
          id,
        ];

        // Execute the fourth update query for armarker_url table
        connection.query(query, arMarkerParams, (arMarkerError, arMarkerResults) => {
          if (arMarkerError) {
            return res.status(500).json({ status: 'error', message: arMarkerError.message });
          }
          res.json({ status: 'ok', message: 'Attraction updated successfully' });
        });
      });
    });
  });
});




app.delete('/deleteAt/:id', (req, res) => {
  const id = req.params.id;

  // Check if the ID is provided
  if (!id) {
    return res.status(400).json({ status: 'error', message: 'Attraction ID is missing' });
  }

  // Query to delete attraction by ID
  connection.query(
    'DELETE db_attraction, ar_datad, arlocations_url, armarker_url FROM db_attraction JOIN ar_datad ON db_attraction.At_id = ar_datad.id JOIN arlocations_url ON db_attraction.At_id = arlocations_url.id JOIN armarker_url ON db_attraction.At_id = armarker_url.id WHERE db_attraction.At_id = ?',
    id,
    (error, results) => {
      if (error) {
        return res.status(500).json({ status: 'error', message: error.message });
      }

      // Check if any rows were affected (attraction was deleted)
      if (results.affectedRows === 0) {
        return res.status(404).json({ status: 'error', message: 'Attraction not found' });
      }

      res.json({ status: 'ok', message: 'Attraction deleted successfully' });
    }
  );
});
  




app.delete('/deleteReview/:id', (req, res) => {
  const id = req.params.id;

  // Check if the ID is provided
  if (!id) {
    return res.status(400).json({ status: 'error', message: 'Review ID is missing' });
  }

  // Query to delete attraction by ID
  connection.query('DELETE FROM review WHERE no = ?', id, (error, results) => {
    if (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }

    // Check if any rows were affected (attraction was deleted)
    if (results.affectedRows === 0) {
      return res.status(404).json({ status: 'error', message: 'review not found' });
    }

    res.json({ status: 'ok', message: 'review deleted successfully' });
  });
});

app.get('/reviews', function (req, res, next) {
  // Your connection logic, assuming you have access to 'connection'
  connection.query(
      'SELECT * FROM review',
      function(err, reviewall, fields) {
          if (err) {
              res.json({ status: 'error', message: err });
              return;
          }
          
          res.json({ status: 'ok', reviews: reviewall });
      }
  );
});

app.listen(3333, function () {
  console.log('CORS-enabled web server listening on port 3333')
})