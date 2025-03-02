import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";

const SnowflakeSketch = (p5) => {
  let snowflakes = [];

  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
  };

  p5.draw = () => {
    p5.background(0);
    let t = p5.frameCount / 60; // Time variable

    for (let i = 0; i < p5.random(2); i++) {
      snowflakes.push(new Snowflake(p5));
    }

    for (let flake of snowflakes) {
      flake.update(t);
      flake.display();
    }
  };

  class Snowflake {
    constructor(p5) {
      this.posX = p5.random(0, p5.width);
      this.posY = p5.random(-50, 0);
      this.initialAngle = p5.random(0, 2 * p5.PI);
      this.size = p5.random(2, 5);
      this.radius = p5.sqrt(p5.random(0, p5.width));
    }

    update(time) {
      let w = 0.6;
      let angle = w * time + this.initialAngle;
      this.posX += p5.sin(angle) * 2;
      this.posY += p5.pow(this.size, 0.5);

      if (this.posY > p5.height) {
        let index = snowflakes.indexOf(this);
        snowflakes.splice(index, 1);
      }
    }

    display() {
      p5.fill(255);
      p5.noStroke();
      p5.ellipse(this.posX, this.posY, this.size);
    }
  }
};

const Snowflake = () => {
  return <ReactP5Wrapper sketch={SnowflakeSketch} />;
};

export default Snowflake;
