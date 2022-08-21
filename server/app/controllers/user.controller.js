const nodemailer = require("../config/nodemailer.config");
const db = require("../models");
const User = db.user;
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

async function execute(command) {
  try {
      const { stdout, stderr } = await exec(command);
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
    } catch (e) {
      console.error(e);
    }
}

exports.allAccess = (req, res) => {
  res.status(200).send(`
  <h1><strong>FREE VPN FOR REAL</strong></h1>
  <ol>
  <li>заходим на сайт с телефона</li>
  <li>регистрируемся и логинимся. скачиваем профайл</li>
  <li>в настройках в самом вверху появится пункт — profile downloaded. заходим в него и устанавливаем скаченный профайл
  </li>
  <li>в настройках впн включить галочку connect on demand</li>
  </ol>
  `
  );
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.sendEmail = (req, res) => {
  User.findById(req.userId).exec((err, user) => {

    if (err) {
      res.status(500).send({ message: err });
      return;

    }
    nodemailer.sendConfirmationEmail(
      user.username,
      user.email,
      user.confirmationCode
    );

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  })
};

exports.mobileconfig = (req, res) => {
  User.findById(req.userId).exec(async (err, user) => {

    if (err) {
      res.status(500).send({ message: err });
      return;

    }

    await execute(`docker exec -i ipsec-vpn-server ikev2.sh --addclient ${user.username}
    docker exec -i ipsec-vpn-server ikev2.sh --exportclient ${user.username}
    docker cp ipsec-vpn-server:/etc/ipsec.d/${user.username}.mobileconfig ${appDir}/mobileconfigs/
    `)
    
    res.sendFile(`${appDir}/mobileconfigs/${user.username}.mobileconfig`)
  })
};

exports.downloads = async (req, res) => {
    let username = req.params.download
    console.log(username);
    await execute(`docker exec -i ipsec-vpn-server ikev2.sh --addclient ${username}
    docker exec -i ipsec-vpn-server ikev2.sh --exportclient ${username}
    docker cp ipsec-vpn-server:/etc/ipsec.d/${username}.mobileconfig ${appDir}/mobileconfigs/
    `)
    
    res.download(`${appDir}/mobileconfigs/${username}.mobileconfig`, `${username}.mobileconfig`);
}