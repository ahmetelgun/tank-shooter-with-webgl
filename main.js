function main() {
  var canvas = document.getElementById("canvas");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }

  var x = window.innerWidth;
  var y = window.innerHeight;
  if (x / y > 16 / 9) {
    gl.canvas.height = y;
    gl.canvas.width = (y * 16) / 9;
  } else {
    gl.canvas.width = x;
    gl.canvas.height = (x * 9) / 16;
  }

  center = { x: x / 2, y: y / 2 };

  var program = webglUtils.createProgramFromScripts(gl, [
    "3d-vertex-shader",
    "3d-fragment-shader"
  ]);

  var positionLocation = gl.getAttribLocation(program, "a_position");
  var colorLocation = gl.getAttribLocation(program, "a_color");

  var matrixLocation = gl.getUniformLocation(program, "u_matrix");

  var positionBuffer = gl.createBuffer();

  var colorBuffer = gl.createBuffer();

  function radToDeg(r) {
    return (r * 180) / Math.PI;
  }

  function degToRad(d) {
    return (d * Math.PI) / 180;
  }

  var tank = new Tank();

  var structure = new Structure(100, 50, 60, { x: 200, y: 100 });
  var structure1 = new Structure(100, 50, 60, { x: -200, y: 100 });
  var structure2 = new Structure(30, 100, 120, { x: -100, y: -50 });
  var structure3 = new Structure(100, 30, 120, { x: 50, y: -50 });
  var structure4 = new Structure(30, 100, 120, { x: -350, y: -50 });
  var structure5 = new Structure(50, 60, 80, { x: 150, y: -200 });
  var structures = [structure];
  structures.push(structure1);
  structures.push(structure2);
  structures.push(structure3);
  structures.push(structure4);
  structures.push(structure5);

  gl.clearColor(1, 0, 0, 0.3);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  window.requestAnimationFrame(drawAll);
  var balls = [];
  document.getElementsByTagName("body")[0].onmousedown = function(e) {
    let ball = new Ball();

    var tilt =
      (e.clientY - gl.canvas.height / 2) / (e.clientX - gl.canvas.width / 2);
    if (!tilt) {
      tilt = 0.001;
    }

    if (e.clientX - gl.canvas.width / 2 < 0) {
      ball.ball.rotation[2] = -Math.atan(tilt) + degToRad(180);
    } else {
      ball.ball.rotation[2] = -Math.atan(tilt);
      ball.ball.tFlag = true;
    }

    ball.ball.tilt = -tilt;

    balls.push(ball);
  };
  var tilt = Infinity;
  var tFlag;
  document.getElementsByTagName("body")[0].onmousemove = function(e) {
    tilt =
      (e.clientY - gl.canvas.height / 2) / (e.clientX - gl.canvas.width / 2);
    if (!tilt) {
      tilt = 0.1;
    }

    if (e.clientX - gl.canvas.width / 2 < 0) {
      tank.tank.rotation[2] = -Math.atan(tilt) + degToRad(180);
      tFlag = false;
    } else {
      tank.tank.rotation[2] = -Math.atan(tilt);
      tFlag = true;
    }
  };

  document.onkeydown = function(e) {
    e = e || window.event;
    var tr = -tilt + 1;
    var length = ((1 - 1 / tr) * (1 - 1 / tr) + (1 / tr) * (1 / tr)) * 0.1;

    if (e.keyCode == "38" || e.keyCode == "87") {
      structures.map(function(structure) {
        if (-tilt <= -1 && tFlag == true) {
          structure.structures.translation[1] += (1 - 1 / tr) / Math.sqrt(length);
          structure.structures.translation[0] += 1 / tr / Math.sqrt(length);
          return 0;
        }

        if (-tilt <= -1 && tFlag == false) {
          structure.structures.translation[1] -= (1 - 1 / tr) / Math.sqrt(length);
          structure.structures.translation[0] -= 1 / tr / Math.sqrt(length);
          return 0;
        }

        if (tFlag == false) {
          structure.structures.translation[1] += (1 - 1 / tr) / Math.sqrt(length);
          structure.structures.translation[0] += 1 / tr / Math.sqrt(length);
        } else {
          structure.structures.translation[1] -= (1 - 1 / tr) / Math.sqrt(length);
          structure.structures.translation[0] -= 1 / tr / Math.sqrt(length);
        }
      });

      balls.map(function(ball) {
        if (-tilt <= -1 && tFlag == true) {
          ball.ball.translation[1] += (1 - 1 / tr) / Math.sqrt(length);
          ball.ball.translation[0] += 1 / tr / Math.sqrt(length);
          return 0;
        }

        if (-tilt <= -1 && tFlag == false) {
          ball.ball.translation[1] -= (1 - 1 / tr) / Math.sqrt(length);
          ball.ball.translation[0] -= 1 / tr / Math.sqrt(length);
          return 0;
        }

        if (tFlag == false) {
          ball.ball.translation[1] += (1 - 1 / tr) / Math.sqrt(length);
          ball.ball.translation[0] += 1 / tr / Math.sqrt(length);
        } else {
          ball.ball.translation[1] -= (1 - 1 / tr) / Math.sqrt(length);
          ball.ball.translation[0] -= 1 / tr / Math.sqrt(length);
        }
      });
    } else if (e.keyCode == "40" || e.keyCode == "83") {
      structures.map(function(structure) {
        if (-tilt <= -1 && tFlag == true) {
          structure.structures.translation[1] -= (1 - 1 / tr) / Math.sqrt(length);
          structure.structures.translation[0] -= 1 / tr / Math.sqrt(length);
          return 0;
        }

        if (-tilt <= -1 && tFlag == false) {
          structure.structures.translation[1] += (1 - 1 / tr) / Math.sqrt(length);
          structure.structures.translation[0] += 1 / tr / Math.sqrt(length);
          return 0;
        }

        if (tFlag == false) {
          structure.structures.translation[1] -= (1 - 1 / tr) / Math.sqrt(length);
          structure.structures.translation[0] -= 1 / tr / Math.sqrt(length);
        } else {
          structure.structures.translation[1] += (1 - 1 / tr) / Math.sqrt(length);
          structure.structures.translation[0] += 1 / tr / Math.sqrt(length);
        }
      });

      balls.map(function(ball) {
        if (-tilt <= -1 && tFlag == true) {
          ball.ball.translation[1] -= (1 - 1 / tr) / Math.sqrt(length);
          ball.ball.translation[0] -= 1 / tr / Math.sqrt(length);
          return 0;
        }

        if (-tilt <= -1 && tFlag == false) {
          ball.ball.translation[1] += (1 - 1 / tr) / Math.sqrt(length);
          ball.ball.translation[0] += 1 / tr / Math.sqrt(length);
          return 0;
        }

        if (tFlag == false) {
          ball.ball.translation[1] -= (1 - 1 / tr) / Math.sqrt(length);
          ball.ball.translation[0] -= 1 / tr / Math.sqrt(length);
        } else {
          ball.ball.translation[1] += (1 - 1 / tr) / Math.sqrt(length);
          ball.ball.translation[0] += 1 / tr / Math.sqrt(length);
        }
      });
    } else if (e.keyCode == "39" || e.keyCode == "68") {
      structures.map(function(structure) {
        if (-tilt <= -1 && tFlag == true) {
          structure.structures.translation[0] += (1 - 1 / tr) / Math.sqrt(length);
          structure.structures.translation[1] -= 1 / tr / Math.sqrt(length);

          return 0;
        }

        if (-tilt <= -1 && tFlag == false) {
          structure.structures.translation[0] -= (1 - 1 / tr) / Math.sqrt(length);
          structure.structures.translation[1] += 1 / tr / Math.sqrt(length);

          return 0;
        }

        if (tFlag == false) {
          structure.structures.translation[0] += (1 - 1 / tr) / Math.sqrt(length);
          structure.structures.translation[1] -= 1 / tr / Math.sqrt(length);
        } else {
          structure.structures.translation[0] -= (1 - 1 / tr) / Math.sqrt(length);
          structure.structures.translation[1] += 1 / tr / Math.sqrt(length);
        }
      });

      balls.map(function(ball) {
        if (-tilt <= -1 && tFlag == true) {
          ball.ball.translation[0] += (1 - 1 / tr) / Math.sqrt(length);
          ball.ball.translation[1] -= 1 / tr / Math.sqrt(length);

          return 0;
        }

        if (-tilt <= -1 && tFlag == false) {
          ball.ball.translation[0] -= (1 - 1 / tr) / Math.sqrt(length);
          ball.ball.translation[1] += 1 / tr / Math.sqrt(length);

          return 0;
        }

        if (tFlag == false) {
          ball.ball.translation[0] += (1 - 1 / tr) / Math.sqrt(length);
          ball.ball.translation[1] -= 1 / tr / Math.sqrt(length);
        } else {
          ball.ball.translation[0] -= (1 - 1 / tr) / Math.sqrt(length);
          ball.ball.translation[1] += 1 / tr / Math.sqrt(length);
        }
      });
    } else if (e.keyCode == "37" || e.keyCode == "65") {
      structures.map(function(structure) {
        if (-tilt <= -1 && tFlag == true) {
          structure.structures.translation[0] -= (1 - 1 / tr) / Math.sqrt(length);
          structure.structures.translation[1] += 1 / tr / Math.sqrt(length);

          return 0;
        }

        if (-tilt <= -1 && tFlag == false) {
          structure.structures.translation[0] += (1 - 1 / tr) / Math.sqrt(length);
          structure.structures.translation[1] -= 1 / tr / Math.sqrt(length);

          return 0;
        }

        if (tFlag == false) {
          structure.structures.translation[0] -= (1 - 1 / tr) / Math.sqrt(length);
          structure.structures.translation[1] += 1 / tr / Math.sqrt(length);
        } else {
          structure.structures.translation[0] += (1 - 1 / tr) / Math.sqrt(length);
          structure.structures.translation[1] -= 1 / tr / Math.sqrt(length);
        }
      });
      balls.map(function(ball) {
        if (-tilt <= -1 && tFlag == true) {
          structure.structures.translation[0] -= (1 - 1 / tr) / Math.sqrt(length);
          structure.structures.translation[1] += 1 / tr / Math.sqrt(length);

          return 0;
        }

        if (-tilt <= -1 && tFlag == false) {
          structure.structures.translation[0] += (1 - 1 / tr) / Math.sqrt(length);
          structure.structures.translation[1] -= 1 / tr / Math.sqrt(length);

          return 0;
        }

        if (tFlag == false) {
          structure.structures.translation[0] -= (1 - 1 / tr) / Math.sqrt(length);
          structure.structures.translation[1] += 1 / tr / Math.sqrt(length);
        } else {
          structure.structures.translation[0] += (1 - 1 / tr) / Math.sqrt(length);
          structure.structures.translation[1] -= 1 / tr / Math.sqrt(length);
        }
      });
    }
  };

  function drawAll() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    drawScene(tank.getObj());
    drawStructures(structures);
    balls = balls.filter(function(ball) {
      if (Date.now() - ball.ball.sTime < 1000) {
        structures.map(function(structure) {});

        return ball;
      }
    });
    balls.map(function(ball) {
      var tr = ball.ball.tilt + 1;
      var length = ((1 - 1 / tr) * (1 - 1 / tr) + (1 / tr) * (1 / tr)) * 0.1;
      if (ball.ball.tilt <= -1 && ball.ball.tFlag == true) {
        ball.ball.translation[1] -= (1 - 1 / tr) / Math.sqrt(length);
        ball.ball.translation[0] -= 1 / tr / Math.sqrt(length);
      } else if (ball.ball.tilt <= -1 && ball.ball.tFlag == false) {
        ball.ball.translation[1] += (1 - 1 / tr) / Math.sqrt(length);
        ball.ball.translation[0] += 1 / tr / Math.sqrt(length);
      } else if (ball.ball.tFlag == false) {
        ball.ball.translation[1] -= (1 - 1 / tr) / Math.sqrt(length);
        ball.ball.translation[0] -= 1 / tr / Math.sqrt(length);
      } else {
        ball.ball.translation[1] += (1 - 1 / tr) / Math.sqrt(length);
        ball.ball.translation[0] += 1 / tr / Math.sqrt(length);
      }
    });

    drawStructures(balls);

    window.requestAnimationFrame(drawAll);
  }

  function drawStructures(structures) {
    structures.map(structure => drawScene(structure.getObj()));
  }

  function drawScene(obj) {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.enable(gl.DEPTH_TEST);

    gl.useProgram(program);

    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setGeometry(gl, obj.positions);

    var size = 3;
    var type = gl.FLOAT;
    var normalize = false;
    var stride = 0;
    var offset = 0;
    gl.vertexAttribPointer(
      positionLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );

    gl.enableVertexAttribArray(colorLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setColors(gl, obj.colors);
    var type = gl.UNSIGNED_BYTE;
    var normalize = true;
    var stride = 0;
    var offset = 0;
    gl.vertexAttribPointer(
      colorLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );

    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var zNear = 1;
    var zFar = 2000;
    var matrix = m4.perspective(degToRad(60), aspect, zNear, zFar);

    matrix = m4.translate(
      matrix,
      obj.translation[0],
      obj.translation[1],
      obj.translation[2]
    );
    matrix = m4.xRotate(matrix, obj.rotation[0]);
    matrix = m4.yRotate(matrix, obj.rotation[1]);
    matrix = m4.zRotate(matrix, obj.rotation[2]);
    matrix = m4.scale(matrix, obj.scale[0], obj.scale[1], obj.scale[2]);

    gl.uniformMatrix4fv(matrixLocation, false, matrix);

    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = obj.positions.length / 3;
    gl.drawArrays(primitiveType, offset, count);
  }
}

var m4 = {
  perspective: function(fieldOfViewInRadians, aspect, near, far) {
    var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
    var rangeInv = 1.0 / (near - far);

    return [
      f / aspect,
      0,
      0,
      0,
      0,
      f,
      0,
      0,
      0,
      0,
      (near + far) * rangeInv,
      -1,
      0,
      0,
      near * far * rangeInv * 2,
      0
    ];
  },

  projection: function(width, height, depth) {
    return [
      2 / width,
      0,
      0,
      0,
      0,
      -2 / height,
      0,
      0,
      0,
      0,
      2 / depth,
      0,
      -1,
      1,
      0,
      1
    ];
  },

  multiply: function(a, b) {
    var a00 = a[0 * 4 + 0];
    var a01 = a[0 * 4 + 1];
    var a02 = a[0 * 4 + 2];
    var a03 = a[0 * 4 + 3];
    var a10 = a[1 * 4 + 0];
    var a11 = a[1 * 4 + 1];
    var a12 = a[1 * 4 + 2];
    var a13 = a[1 * 4 + 3];
    var a20 = a[2 * 4 + 0];
    var a21 = a[2 * 4 + 1];
    var a22 = a[2 * 4 + 2];
    var a23 = a[2 * 4 + 3];
    var a30 = a[3 * 4 + 0];
    var a31 = a[3 * 4 + 1];
    var a32 = a[3 * 4 + 2];
    var a33 = a[3 * 4 + 3];
    var b00 = b[0 * 4 + 0];
    var b01 = b[0 * 4 + 1];
    var b02 = b[0 * 4 + 2];
    var b03 = b[0 * 4 + 3];
    var b10 = b[1 * 4 + 0];
    var b11 = b[1 * 4 + 1];
    var b12 = b[1 * 4 + 2];
    var b13 = b[1 * 4 + 3];
    var b20 = b[2 * 4 + 0];
    var b21 = b[2 * 4 + 1];
    var b22 = b[2 * 4 + 2];
    var b23 = b[2 * 4 + 3];
    var b30 = b[3 * 4 + 0];
    var b31 = b[3 * 4 + 1];
    var b32 = b[3 * 4 + 2];
    var b33 = b[3 * 4 + 3];
    return [
      b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
      b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
      b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
      b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
      b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
      b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
      b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
      b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
      b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
      b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
      b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
      b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
      b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
      b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
      b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
      b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33
    ];
  },

  translation: function(tx, ty, tz) {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1];
  },

  xRotation: function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1];
  },

  yRotation: function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1];
  },

  zRotation: function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  },

  scaling: function(sx, sy, sz) {
    return [sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1];
  },

  translate: function(m, tx, ty, tz) {
    return m4.multiply(m, m4.translation(tx, ty, tz));
  },

  xRotate: function(m, angleInRadians) {
    return m4.multiply(m, m4.xRotation(angleInRadians));
  },

  yRotate: function(m, angleInRadians) {
    return m4.multiply(m, m4.yRotation(angleInRadians));
  },

  zRotate: function(m, angleInRadians) {
    return m4.multiply(m, m4.zRotation(angleInRadians));
  },

  scale: function(m, sx, sy, sz) {
    return m4.multiply(m, m4.scaling(sx, sy, sz));
  }
};

function setGeometry(gl, positions) {
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
}

function setColors(gl, colors) {
  gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(colors), gl.STATIC_DRAW);
}

main();
