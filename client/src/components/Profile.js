import React from "react";
import AuthService from "../services/auth.service";

const openDownload = () => {
  window.open(`http://solidsoftware.ru:8080/api/test/downloads/${AuthService.getCurrentUser().username}`);
}

const Profile = (props) => {
  const currentUser = AuthService.getCurrentUser();

  if (props.match.path === "/confirm/:confirmationCode") {
    AuthService.verifyUser(props.match.params.confirmationCode)
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <button className="btn btn-primary btn-block" onClick={openDownload}>Download profile</button>
      
      {/* <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <p>
        <strong>Status:</strong> {currentUser.status}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul> */}
    </div>
  );
};

export default Profile;
