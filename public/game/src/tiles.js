const TILE_SIZE = 128;

const tiles_pos = [
    {name: 'sol_1', x: 12, y: 6},
    {name: 'sol_2', x: 11, y: 6},
    {name: 'sol_3', x: 10, y: 6},

    {name: 'target_orange', x: 12, y: 1},
    {name: 'target_red', x: 12, y: 2},
    {name: 'target_blue', x: 12, y: 3},
    {name: 'target_green', x: 12, y: 4},
    {name: 'target_grey', x: 12, y: 5},

    {name: 'caisse_orange', x: 6, y: 0},
    {name: 'caisse_red', x: 7, y: 0},
    {name: 'caisse_blue', x: 8, y: 0},
    {name: 'caisse_green', x: 9, y: 0},
    {name: 'caisse_grey', x: 10, y: 0},

    {name: 'char_bottom_1', x: 0, y: 5},
    {name: 'char_bottom_2', x: 1, y: 5},
    {name: 'char_bottom_3', x: 2, y: 5},

    {name: 'char_top_1', x: 3, y: 5},
    {name: 'char_top_2', x: 4, y: 5},
    {name: 'char_top_3', x: 5, y: 5},

    {name: 'char_right_1', x: 0, y: 7},
    {name: 'char_right_2', x: 1, y: 7},
    {name: 'char_right_3', x: 2, y: 7},

    {name: 'char_left_1', x: 3, y: 7},
    {name: 'char_left_2', x: 4, y: 7},
    {name: 'char_left_3', x: 5, y: 7},
]

const tiles = {};

for(let i = 0; i < tiles_pos.length; i++){
    tiles[tiles_pos[i].name] = {
        name: tiles_pos[i].name,
        position: {
            x: tiles_pos[i].x * TILE_SIZE,
            y: tiles_pos[i].y * TILE_SIZE
        },
        width: TILE_SIZE,
        height: TILE_SIZE
    }
}

export default tiles;