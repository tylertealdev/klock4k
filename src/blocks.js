// blocks.js

// Block type definition
const NUMBER_OF_BLOCKS = 16;

const BLOCK_AIR         = 0;
const BLOCK_GRASS       = 1;
const BLOCK_DIRT        = 2;
const BLOCK_SAND        = 3;
const BLOCK_STONE       = 4;
const BLOCK_BRICKS      = 5;
const BLOCK_GRAVEL      = 6;
const BLOCK_WOOD        = 7;
const BLOCK_LEAVES      = 8;
const BLOCK_COBBLESTONE = 9;
const BLOCK_WATER       = 10;
const BLOCK_TALL_GRASS  = 11;

const BLOCK_PLAYER_HEAD  = 14;
const BLOCK_PLAYER_BODY  = 15;

const BLOCK_NIL         = 255;

// You can also create a typed array if needed for performance
let blocks = new Uint8Array(NUMBER_OF_BLOCKS);
