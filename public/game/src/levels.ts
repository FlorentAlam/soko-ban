// import MoveableObject from "./MoveableObject";

import { MovingObject } from "./MovingObject";

export const levels: [(MovingObject | string | number)[][]] = 
[
    [[0, "br", "br", "br", "br", "br", 0, 0],
    [0, "br", 0, 0, "c", "br", "br", "br"],
    ["br", "br", 0, "br", "bb", 0, 0, "br"],
    ["br", 0, "bb", "tb", 0, "tb", 0, "br"],
    ["br", 0, 0, "bb", "bb", 0, "br", "br"],
    ["br", "br", "br", 0, "br", "tb", "br", 0],
    [0, 0, "br", 0, 0, 0, "br", 0],
    [0, 0, "br", "br", "br", "br", "br", 0]]
]