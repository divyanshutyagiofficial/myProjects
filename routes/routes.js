const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const Cover = require('../models/cover.js');
const Message = require('../models/message.js');
// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000000000000000000 }
    /*fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }*/
}).any('myFile');

// Check File Type
/*function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
 
  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}*/

// Init app
router.get('/', (req, res) => res.json({ msg: `Server is running on port ${port}` }));

router.get('/view', (req, res) => {
    fs.readdir('./public/uploads/', (err, files) => {
        res.send(files);
    });
});

router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.json({ msg: err });
        } else {
            if (req.file == undefined) {
                res.json({ msg: 'Error: No File Selected!' });
            } else {
                res.json({ msg: 'file uploaded successfully' });
            }
        }
    });
});

router.post('/testUpload', (req, res) => {
  upload(req, res, (err) => {
    if(err) throw err;
    console.log(req);
    if(req.files == undefined || req.files.length === 0 || req.files === null){
      res.json({msg: 'Error: No File Selected!'});
    } else {
	  let a = [];
	  req.files.forEach(file => {
		  a.push({id: file.filename});
	  }) 
	  res.send(a);
    }
  });
});

router.post('/uploadCover', (req, res) => {
    upload(req, res, (err) => {
        if (err) throw err
        if (req.file == undefined) {
            res.json({ msg: 'Error: No File Selected!' });
        } else {
            /* Cover.deleteOne({}, (err, data) => {
                 if (err) throw err;
                 console.log('cover deleted successfully');
             });
             let newCover = new Cover({
                 name: req.file.filename
             });
             newCover.save((err, data) => {
                 console.log('file added successfully');
             });*/

            Cover.find((err, cover) => {
                console.log(cover !== null && cover !== undefined && cover !== [] && cover.length !== 0);
                if (err) throw err;
                if (cover !== null && cover !== undefined && cover !== [] && cover.length !== 0) {
                    console.log(cover);
                    Cover.updateOne({ "name": cover[0].name }, { $set: { "name": req.file.filename } }, (err, data) => {
                        if (err) throw err;
                        console.log('Cover updated successfully');
                        res.json({ msg: 'cover updated successfully' });
                    })
                } else {
                    let newCover = new Cover({
                        name: req.file.filename
                    });
                    newCover.save((err, data) => {
                        console.log('file added successfully');
                        res.json({ msg: 'cover uploaded successfully' });
                    });
                }

            })

        }
    })
});

router.get('/getCover', (req, res) => {
    Cover.find(function (err, cover) {
        if (err) {
            res.json({ msg: err });
        } else {
            res.setHeader('content-type', 'application/json');
            res.json({ cover });
        }
    })
});

router.get('/public/uploads/:fileName', (req, res) => {
    let fileName = req.params.fileName;
    fs.readFile('./public/uploads/' + fileName, (err, data) => {
        if (err) {
            res.json({ msg: err });
        }
        res.send(data);
    })
});

router.post('/signUp', (req, res) => {
    let user = new User({
        name: req.body.name,
        contact: req.body.contact,
        username: req.body.username,
        password: req.body.password
    })
    User.find({ username: req.body.username }, (err, data) => {
		if err throw err;
        console.log(data);
        if (data) {
			  data.forEach(data => {
                if (data['username'] === req.body.username) {
                    res.status(409);
                    res.json({ msg: 'username already exists' });
                }
            });
        } else {
          console.log(user);
            user.save((err, acc) => {
                if (err) {
                    res.json(err);
                }
                res.json({ msg: 'user created successfully.' });
            })
        }
    })
});

router.post('/logIn', (req, res) => {
    User.findOne({ username: req.body.username, password: req.body.password }, (err, user) => {
        if (err) {
            res.json(err);
        } else {
            if (user) {
                res.json({ username: user['username'] });
            } else {
                res.status(401);
                res.json({ msg: `Invalid email or password.` });
            }
        }
    });
});

router.get('/getUsers/:username', (req, res) => {
    let a = [];
    let username = req.params.username;
    User.find((err, data) => {
        if (err) throw err;
        data.forEach(element => {
            let query = {
                receiver: username,
                sender: element['username'],
                read: false
            }
            Message.find(query, (err, message) => {
                if (err) throw err;
                count = message.length;
                a.push({ name: element.name, username: element.username, contact: element.contact, unreadCount: count });
                if (a.length === data.length) {
                    res.send(a);
                }
            });
        });
    });
});

router.post('/resetCount', (req, res) => {
    let username = req.body.username;
    let sender = req.body.sender;
    Message.update({receiver: username, sender: sender}, {$set : {read: true}}, { multi: true }, (err, data) => {
        if(err) throw err;
        res.json({msg: 'Message status updated successfully'});
    })
})

router.post('/saveMessage', (req, res) => {
    let newMessage = new Message({
        message: req.body.message,
        sender: req.body.sender,
        receiver: req.body.receiver,
        read: req.body.read
    })
    newMessage.save((err, data) => {
        if (err) throw err;
        res.json({ msg: 'Message saved successfully' });
    })
});


router.get('/getMessages/:sender/:receiver', (req, res) => {
    let query = {
        sender: [req.params.sender, req.params.receiver],
        receiver: [req.params.sender, req.params.receiver]
    }
    Message.find(query, (err, data) => {
        console.log(data);
        if (err) throw err;
        if (data) {
            res.json(data);
        } else {
            res.status(204);
            res.json({ msg: 'No messages found' });
        }
    })
});

module.exports = router;