var canvas;
var gl;
var vPosition;
var program;
var letter1vertices, letter2vertices;
var buffer1, buffer2, buffer3, buffer4, buffer5, buffer6;
var pos_x = 0;
var pos_y = 0;
var scale_x = 1.0;
var scale_y = 1.0;
var redslide = 1.0;
var greenslide = 0;
var blueslide = 0;
var colorLog;
var color;
var poslog;
var pos;
var scaleLog;
var scale;

window.onload = function init()
{
	canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Create geometry data
    letter1vertices = [
        vec2(-0.9, -0.5),
        vec2(-0.9, 0.5),
        vec2(-0.8, 0.5),
        vec2(-0.8, -0.5),
    
        vec2(-0.9, 0.5),
        vec2(-0.8, 0.5),
        vec2(-0.3, -0.5),
        vec2(-0.4, -0.5),
    
        vec2(-0.4, -0.5),
        vec2(-0.4, 0.5),
        vec2(-0.3, 0.5),
        vec2(-0.3, -0.5),
    ];
     
        letter2vertices = [
    vec2(0.3, -0.5),
    vec2(0.3, 0.5),
    vec2(0.4, 0.5),
    vec2(0.4, -0.5),

    vec2(0.3, 0.5),
    vec2(0.4, 0.5),
    vec2(0.9, -0.5),
    vec2(0.8, -0.5), 

    vec2(0.4, -0.1),
    vec2(0.6, -0.1),
    vec2(0.65, -0.2),
    vec2(0.4, -0.2),
];

    // Load the data into the GPU
	buffer1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(letter1vertices), gl.STATIC_DRAW);  

    buffer3 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer3 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter1vertices), gl.STATIC_DRAW );

    buffer4 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer4 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter1vertices), gl.STATIC_DRAW );
  
    buffer2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter2vertices), gl.STATIC_DRAW );

    buffer5 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer5 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter2vertices), gl.STATIC_DRAW );

    buffer6 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer6 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter2vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation(program, 'vPosition');
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    document.getElementById('posX').oninput = function (event) {
        pos_x = parseFloat(event.target.value);
        render();
    };
    document.getElementById('posY').oninput = function (event) {
        pos_y = parseFloat(event.target.value);
        render();
    };
    document.getElementById('scaleX').oninput = function (event) {
        scale_x = parseFloat(event.target.value);
        render();
    };
    document.getElementById('scaleY').oninput = function (event) {
        scale_y = parseFloat(event.target.value);
        console.log(scale_y);
        render();
    };
    document.getElementById('redSlider').oninput = function (event) {
        redslide = parseFloat(event.target.value);
        render();
    };
    document.getElementById('greenSlider').oninput = function (event) {
        greenslide = parseFloat(event.target.value);
        render();
    };
    document.getElementById('blueSlider').oninput = function (event) {
        blueslide = parseFloat(event.target.value);
        render();
    };
    scaleLog = gl.getUniformLocation(program, 'scale');

    colorLog = gl.getUniformLocation(program, 'color');
    
    poslog = gl.getUniformLocation(program, 'pos');

    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );


    // perform draw calls for drawing letters

    // bind vertex buffer and associate position data with shader variables
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer1 );
    
    color = vec4(redslide, greenslide, blueslide, 1.0);
    
    gl.uniform4fv(colorLog, color);
    
    pos = vec2(pos_x, pos_y);
    
    gl.uniform2fv(poslog, pos);
    
    scale = vec2(scale_x, scale_y);
    
    gl.uniform2fv(scaleLog, scale);
    
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    
    gl.enableVertexAttribArray( vPosition );
    
    // draw triangle
	gl.drawArrays(gl.TRIANGLE_FAN, 0,4);


    // bind vertex buffer and associate position data with shader variables
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer3 );
    
    color = vec4(redslide, greenslide, blueslide, 1.0);
        
    gl.uniform4fv(colorLog, color);
        
    pos = vec2(pos_x, pos_y);
        
    gl.uniform2fv(poslog, pos);
        
    scale = vec2(scale_x, scale_y);
        
    gl.uniform2fv(scaleLog, scale);
        
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
        
    gl.enableVertexAttribArray( vPosition );
        
    // draw triangle
    gl.drawArrays(gl.TRIANGLE_FAN, 4,4);

    // bind vertex buffer and associate position data with shader variables
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer4 );
    
    color = vec4(redslide, greenslide, blueslide, 1.0);
        
    gl.uniform4fv(colorLog, color);
        
    pos = vec2(pos_x, pos_y);
        
    gl.uniform2fv(poslog, pos);
        
    scale = vec2(scale_x, scale_y);
        
    gl.uniform2fv(scaleLog, scale);
        
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
        
    gl.enableVertexAttribArray( vPosition );
        
    // draw triangle
    gl.drawArrays(gl.TRIANGLE_FAN, 8,4);
    
	// bind vertex buffer and associate position data with shader variables
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer2 );
    
    color = vec4(1-redslide, 1-greenslide, 1-blueslide, 1.0);
    
    gl.uniform4fv(colorLog, color);
    
    pos = vec2(pos_x, pos_y);
    gl.uniform2fv(poslog, pos);
    
    scale = vec2(scale_x, scale_y);
    
    gl.uniform2fv(scaleLog, scale);
    
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    
    gl.enableVertexAttribArray( vPosition );
    
    // draw rectangle
	gl.drawArrays(gl.TRIANGLE_FAN, 0,4);

    // bind vertex buffer and associate position data with shader variables
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer5 );
    
    color = vec4(1-redslide, 1-greenslide, 1-blueslide, 1.0);
    
    gl.uniform4fv(colorLog, color);
    
    pos = vec2(pos_x, pos_y);
    gl.uniform2fv(poslog, pos);
    
    scale = vec2(scale_x, scale_y);
    
    gl.uniform2fv(scaleLog, scale);
    
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    
    gl.enableVertexAttribArray( vPosition );
    
    // draw rectangle
	gl.drawArrays(gl.TRIANGLE_FAN, 4,4);

    // bind vertex buffer and associate position data with shader variables
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer6 );
    
    color = vec4(1-redslide, 1-greenslide, 1-blueslide, 1.0);
    
    gl.uniform4fv(colorLog, color);
    
    pos = vec2(pos_x, pos_y);
    gl.uniform2fv(poslog, pos);
    
    scale = vec2(scale_x, scale_y);
    
    gl.uniform2fv(scaleLog, scale);
    
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    
    gl.enableVertexAttribArray( vPosition );
    
    // draw rectangle
	gl.drawArrays(gl.TRIANGLE_FAN, 8,4);

    window.requestAnimFrame(render);
}
