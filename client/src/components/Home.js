import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const downloadMobileConfig = () => {
  UserService.downloadMobileconfig();
};

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        {/* <h3>{content}</h3> */}
        {/* <div dangerouslySetInnerHTML={{ __html: this.htmlDecode(content) }} /> */}
        <img src="/floppa_sprite.jpg" alt="image" width={250} height={250}/>
      </header>
    </div>
  );
};

export default Home;
