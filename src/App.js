import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import Rank from "./components/rank/Rank";
import ImageSearch from "./components/imageSearch/ImageSearch";
import FacialRecogniton from "./components/facialRecogniton/FacialRecogniton";
import "./App.css";

import Signin from "./components/signIn/Signin";
import Register from "./components/register/Register";

const particules = {
  particles: {
    number: {
      value: 100,
      density: { enable: true, value_area: 800 },
    },
  },
};

const initilaState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initilaState;
  }

  onLoadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  };

  onButtonClick = () => {
    this.setState({ imageUrl: this.state.input });
    fetch("https://fierce-atoll-62064.herokuapp.com/imageUrl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("https://fierce-atoll-62064.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data) {
                this.onLoadUser(data);
              }
            });
        }

        this.displayBox(this.calculateFaceLocation(response));
      })

      .catch((error) => console.log(error));
  };

  onRouteChange = (route) => {
    if (route === "signin") {
      this.setState(initilaState);
    } else {
      this.setState({ route: route });
    }
  };

  on;

  render() {
    return (
      <div className="App">
        <Particles className="particule" params={particules} />

        {this.state.route === "home" ? (
          <div>
            <Navigation onRouteChange={this.onRouteChange} />
            <Logo />
            <Rank rank={this.state.user.entries} name={this.state.user.name} />
            <ImageSearch
              onInputChange={this.onInputChange}
              onButtonClick={this.onButtonClick}
            />
            <FacialRecogniton
              box={this.state.box}
              imgUrl={this.state.imageUrl}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <Signin
            onRouteChange={this.onRouteChange}
            onLoadUser={this.onLoadUser}
          />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            onLoadUser={this.onLoadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
