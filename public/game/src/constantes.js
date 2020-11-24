export const APPLICATION_SIZE = 256;
export const TILE_SIZE = 128;
export const TILE_SCALE = .25;
export const SCALED_TILE = TILE_SIZE * TILE_SCALE;
export const TILE_QUANTITY = APPLICATION_SIZE / SCALED_TILE;
export const SPEED = 1.4;
export const CHAR_POSITIONS = ['bottom', 'top', 'left', 'right'];

export const MAP_VALUE_ASSOC = {
    br: 'caisse_red',
    bb: 'caisse_blue',
    bg: 'caisse_green',
    by: 'caisse_yellow',
    tr: 'target_red',
    tb: 'target_blue',
    tg: 'target_green',
    ty: 'target_yellow',
    c: 'char_bottom_1'
}

// User in Player.ts in _setDirection
// export const DIRECTIONS = {
//     x: {
//         [SPEED]: "right",
//         [-SPEED]: "left" 
//     },
//     y: {
//         [SPEED]: "bottom",
//         [-SPEED]: "top"
//     }
// }