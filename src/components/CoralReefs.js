import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import "../styles/FractalTree.css";

const CoralReefSketch = (p5) => {
  let corals = [];
  let angle;

  p5.setup = () => {
    p5.createCanvas(400, 400, "transparent");
    angle = p5.PI / 4;
    p5.stroke(255);
  };

  p5.draw = () => {
    p5.background(20, 50, 120); // Deep blue ocean
    for (let coral of corals) {
      coral.grow();
      coral.display();
    }
  };

  class Coral {
    constructor(x, y, p5) {
      this.p5 = p5;
      this.x = x;
      this.y = y;
      this.size = p5.random(10, 20);
      this.branches = [];
      this.maxBranches = p5.random(5, 10);
    }

    grow() {
      if (this.branches.length < this.maxBranches) {
        let angle = this.p5.random(-p5.PI / 4, p5.PI / 4);
        let length = this.p5.random(20, 50);
        let newX = this.x + length * this.p5.cos(angle);
        let newY = this.y - length * this.p5.sin(angle);
        this.branches.push({ x: newX, y: newY });
      }
    }

    display() {
      this.p5.stroke(255, 100, 150); // Pinkish coral color
      this.p5.strokeWeight(3);
      this.p5.noFill();
      this.p5.beginShape();
      this.p5.vertex(this.x, this.y);
      for (let branch of this.branches) {
        this.p5.vertex(branch.x, branch.y);
      }
      this.p5.endShape();
    }
  }
};

const CoralReef = () => {
  return <ReactP5Wrapper sketch={CoralReefSketch} />;
};

export default CoralReef;
