function createDodecahedron(gl, translation, rotationAxis1, rotationAxis2) {
  // Geometry form: https://wiki.mcneel.com/developer/scriptsamples/dodecahedron

  const phi = (1.0 + Math.sqrt(5.0)) * 0.5
  const a = 1 / phi
  const b = 1 / (phi * phi)

  const allVertices = [
    [0, 1, b],
    [0, 1, -b],
    [0, -1, b],
    [0, -1, -b],
    [1, b, 0],
    [-1, b, 0],
    [1, -b, 0],
    [-1, -b, 0],
    [a, a, a],
    [-a, a, a],
    [a, a, -a],
    [-a, a, -a],
    [a, -a, a],
    [-a, -a, a],
    [a, -a, -a],
    [-a, -a, -a],
    [b, 0, 1],
    [-b, 0, 1],
    [b, 0, -1],
    [-b, 0, -1],
  ];

  const unionIndices =
    [//3 triangulos forman una cara
    16, 17, 9,       9, 0, 8,        16, 9, 8,
    17, 16, 12,      12, 2, 13,      17, 12, 13,
    18, 19, 15,      15, 3, 14,      18, 15, 14,
    19, 18, 10,      10, 1, 11,      19, 10, 11,
    1, 0, 8,         8, 4, 10,       1, 8, 10,
    0, 1, 11,        11, 5, 9,       0, 11, 9,
    3, 2, 13,        13, 7, 15,      3, 13, 15,
    2, 3, 14,        14, 6, 12,      2, 14, 12,
    4, 6, 12,        12, 16, 8,      4, 12, 8,
    6, 4, 10,        10, 18, 14,     6, 10, 14,
    5, 7, 15,        15, 19, 11,     5, 15, 11,
    7, 5, 9,         9, 17, 13,      7, 9, 13,
  ];

  const verts = [];

  for (let i of unionIndices) {
    verts.push(...allVertices[i]);
  }

  const faceInfo = [
    { color: [1, 0, 0, 0.6], nov: 9 },
    { color: [0, 1, 0, 0.6], nov: 9 },
    { color: [0, 0, 1, 0.6], nov: 9 },
    { color: [0.5, 0, 0, 0.6], nov: 9 },
    { color: [0, 0.5, 0, 0.6], nov: 9 },
    { color: [0, 0, 0.5, 0.6], nov: 9 },
    { color: [1, 0, 1, 0.6], nov: 9 },
    { color: [0, 1, 1, 0.6], nov: 9 },
    { color: [1, 1, 1, 0.6], nov: 9 },
    { color: [1, 1, 0, 0.6], nov: 9 },
    { color: [0.5, 0.5, 1, 0.6], nov: 9 },
    { color: [1, 0, 0.5, 0.6], nov: 9 },
  ];

  const indicesArray = [];
  for (let i = 0; i < unionIndices.length; ++i) {
    indicesArray.push(i);
  }

  var vertexColors = [];
  for (let fi of faceInfo) {
    let fic = fi.color;
    let finov = fi.nov;
    for (var j = 0; j < finov; j++)
      vertexColors.push(...fic);
  }

  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

  var indicesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indicesArray), gl.STATIC_DRAW);

  var colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColors), gl.STATIC_DRAW);

  var dodecahedron = {
    buffer: vertexBuffer, colorBuffer: colorBuffer, indices: indicesBuffer,
    vertSize: 3, nVerts: verts.length, colorSize: 4, nColors: vertexColors.length, nIndices: indicesArray.length,
    primtype: gl.TRIANGLES, modelViewMatrix: mat4.create(), currentTime: Date.now()
  };

  mat4.translate(dodecahedron.modelViewMatrix, dodecahedron.modelViewMatrix, translation);

  dodecahedron.update = function () {
    var now = Date.now();
    var deltat = now - this.currentTime;
    this.currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;

    // Rotates a mat4 by the given angle
    // mat4 out the receiving matrix
    // mat4 a the matrix to rotate
    // Number rad the angle to rotate the matrix by
    // vec3 axis the axis to rotate around
    mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, angle, rotationAxis2);
    mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, angle, rotationAxis1);
  };

  return dodecahedron;
}

function createOctahedron(gl, translation, rotationAxis) {
  // Geometry form: https://wiki.mcneel.com/developer/scriptsamples/dodecahedron

  const el = 1;

  const allVertices = [
    [el, 0, 0],
    [0, el, 0],
    [0, 0, el],
    [-el, 0, 0],
    [0, -el, 0],
    [0, 0, -el],
  ];

  const unionIndices =  [
    //3 triangulos forman una cara
    0, 1, 2,
    1, 2, 3,
    3, 2, 4,
    4, 2, 0,
    0, 1, 5,
    1, 5, 3,
    3, 4, 5,
    4, 0, 5,
  ];

  const verts = [];

  for (let i of unionIndices) {
    verts.push(...allVertices[i]);
  }

  const faceInfo = [
    { color: [1, 0, 0, 0.6], nov: 3 },
    { color: [0, 1, 0, 0.6], nov: 3 },
    { color: [0, 0, 1, 0.6], nov: 3 },
    { color: [0.5, 0, 0, 0.6], nov: 3 },
    { color: [0, 0.5, 0, 0.6], nov: 3 },
    { color: [0, 0, 0.5, 0.6], nov: 3 },
    { color: [1, 0, 1, 0.6], nov: 3 },
    { color: [0, 1, 1, 0.6], nov: 3 },
  ];

  const indicesArray = [];
  for (let i = 0; i < unionIndices.length; ++i) {
    indicesArray.push(i);
  }

  var vertexColors = [];
  for (let fi of faceInfo) {
    let fic = fi.color;
    let finov = fi.nov;
    for (var j = 0; j < finov; j++)
      vertexColors.push(...fic);
  }

  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

  var indicesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indicesArray), gl.STATIC_DRAW);

  var colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColors), gl.STATIC_DRAW);

  var dodecahedron = {
    buffer: vertexBuffer, colorBuffer: colorBuffer, indices: indicesBuffer,
    vertSize: 3, nVerts: verts.length, colorSize: 4, nColors: vertexColors.length, nIndices: indicesArray.length,
    primtype: gl.TRIANGLES, modelViewMatrix: mat4.create(), currentTime: Date.now(),beginTime:Date.now(),flag:1
  };

  mat4.translate(dodecahedron.modelViewMatrix, dodecahedron.modelViewMatrix, translation);

  dodecahedron.update = function () {
    var now = Date.now();
    var deltat = now - this.currentTime;
    this.currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;
    var x=.1;
    //console.log(this.currentTime-this.beginTime);
    if(this.currentTime-this.beginTime>500)
    {
      x=-x;
    }

    if(this.currentTime-this.beginTime>1521.5&&this.flag)
    {
      x=-x;
      this.beginTime=Date.now();
      this.flag=0;
    }
    if(this.currentTime-this.beginTime>503&&!this.flag)
    {
      x=-x;
      this.beginTime=Date.now();
      this.flag=1;
    }
    //console.log(this.flag);
    // Rotates a mat4 by the given angle
    // mat4 out the receiving matrix
    // mat4 a the matrix to rotate
    // Number rad the angle to rotate the matrix by
    // vec3 axis the axis to rotate around
    mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, angle, rotationAxis);
    mat4.translate(this.modelViewMatrix, this.modelViewMatrix, [0, x, 0]);
  };

  return dodecahedron;
}

function createPyramid(gl, translation, rotationAxis) {
  // Geometry form: https://wiki.mcneel.com/developer/scriptsamples/dodecahedron

  const el = 1;
  const fullAngle = 2 * Math.PI;
  const fractionAngle = fullAngle / 5;

  const allVertices = [
    [0, 0, 0],
    [el * Math.cos(1 * fractionAngle), el * Math.sin(1 * fractionAngle), 0],
    [el * Math.cos(2 * fractionAngle), el * Math.sin(2 * fractionAngle), 0],
    [el * Math.cos(3 * fractionAngle), el * Math.sin(3 * fractionAngle), 0],
    [el * Math.cos(4 * fractionAngle), el * Math.sin(4 * fractionAngle), 0],
    [el * Math.cos(5 * fractionAngle), el * Math.sin(5 * fractionAngle), 0],
    [0, 0, 2],
  ];

  for (let vertex of allVertices) {
    vec3.rotateX(vertex, vertex, [0, 0, 0], - Math.PI / 2)
  }

  console.log(allVertices);


  const unionIndices =  [
    //3 triangulos forman una cara
    0, 1, 2,
    0, 2, 3,
    0, 3, 4,
    0, 4, 5,
    0, 5, 1,
    6, 1, 2,
    6, 2, 3,
    6, 3, 4,
    6, 4, 5,
    6, 5, 1,
  ];

  const verts = [];

  for (let i of unionIndices) {
    verts.push(...allVertices[i]);
  }

  const faceInfo = [
    { color: [1, 0, 0, 0.6], nov: 9 },
    { color: [0, 1, 0, 0.6], nov: 3 },
    { color: [0, 0, 1, 0.6], nov: 3 },
    { color: [0.5, 0, 0, 0.6], nov: 3 },
    { color: [0, 0.5, 0, 0.6], nov: 3 },
    { color: [0, 0, 0.5, 0.6], nov: 3 },
    { color: [1, 0, 1, 0.6], nov: 3 },
    { color: [0, 1, 1, 0.6], nov: 3 },
  ];

  const indicesArray = [];
  for (let i = 0; i < unionIndices.length; ++i) {
    indicesArray.push(i);
  }

  var vertexColors = [];
  for (let fi of faceInfo) {
    let fic = fi.color;
    let finov = fi.nov;
    for (var j = 0; j < finov; j++)
      vertexColors.push(...fic);
  }

  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

  var indicesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indicesArray), gl.STATIC_DRAW);

  var colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColors), gl.STATIC_DRAW);

  var dodecahedron = {
    buffer: vertexBuffer, colorBuffer: colorBuffer, indices: indicesBuffer,
    vertSize: 3, nVerts: verts.length, colorSize: 4, nColors: vertexColors.length, nIndices: indicesArray.length,
    primtype: gl.TRIANGLES, modelViewMatrix: mat4.create(), currentTime: Date.now(),
  };

  mat4.translate(dodecahedron.modelViewMatrix, dodecahedron.modelViewMatrix, translation);

  dodecahedron.update = function () {
    var now = Date.now();
    var deltat = now - this.currentTime;
    this.currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;

    // Rotates a mat4 by the given angle
    // mat4 out the receiving matrix
    // mat4 a the matrix to rotate
    // Number rad the angle to rotate the matrix by
    // vec3 axis the axis to rotate around
    mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, angle, rotationAxis);
  };

  return dodecahedron;
}
