//Arrays betches

int [] A = new int [3];
int [0] = -3;
int [1] = 5;
int [2] = 7;

// All at once;
int [] A = {-3, 5, 7};
// Can be used at declaration only

// i.e. cannot do
int [] A;
A = {-3, 5, 7};

// In both cases A.length is 3
float [][] B = new float [2][3];
B[0][0] = 1.2;
B[0][1] = 3.4;
B[0][2] = -5.6;
B[1][0] = 7.8;
B[1][1] = 11.0;
B[1][2] = -1.1;

//Shortcut
float [][] B = {{1.2, 3.4, -5.6}, {7.8, 11.0, -1.1}};

// Multi-dimensional arrays can be ragged
float [][] C = {{1.0, 2.0},{3.0, 4.0, 5.0}};

// Long way

float[][] C;
C = new float [2][];
///[c vertical][r horizonal]
C[0] = new float [2];
C[1] = new float [3];
C[0][0] = 1.0;
ETC ETC
