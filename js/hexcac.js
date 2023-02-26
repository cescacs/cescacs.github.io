'use strict';

class Hexcac {
  static #COLUMNS = ['P', 'T', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'X', 'Z'];
  static #ORTHOGONAL_MOVES = [[1, -1], [1, 1], [0, 2], [-1, 1], [-1, -1], [0, -2]];
  static #DIAGONAL_MOVES = [[1, -3], [2, 0], [1, 3], [-1, 3], [-2, 0], [-1, -3]];
  static #KNIGHT_MOVES = [[1, -5], [2, -4], [3, -1], [3, 1], [2, 4], [1, 5], [-1, 5], [-2, 4], [-3, 1], [-3, -1], [-2, -4], [-1, -5]];
  static get columNames() { return Hexcac.#COLUMNS; }
  static isInsideBoard(c, l) {
    const absc = Math.abs(c);
    return absc <= 7 && l >= absc && l <= 28 - absc;
  }
  static parse(h) {
    let c, l;
    if (h !== undefined) {
      try {
        c = Hexcac.columNames.indexOf(h.substring(0, 1).toUpperCase());
        if (c >= 0) {
          c -= 7;
          l = parseInt(h.substring(1));
          if (((c % 2 === 0) == (l % 2 === 0)) && Hexcac.isInsideBoard(c, l)) {
            return new Hexcac(c, l);
          }
          else { return undefined; }
        }
        else { return undefined; }
      }
      catch (ex) { return undefined; }
    }
    else { return undefined; }
  }
  static CoordParseErrorDescription(h) {
    let c, l;
    if (h !== undefined) {
      try {
        c = Hexcac.columNames.indexOf(h.substring(0, 1).toUpperCase());
        if (c >= 0) {
          c -= 7;
          l = parseInt(h.substring(1));
          if (isNaN(l)) {
            return "Invalid Line number " + h.substring(1);
          }
          else if (((c % 2 === 0) == (l % 2 === 0))) {
            if (Hexcac.isInsideBoard(c, l)) {
              return ""
            }
            else return "Line " + l + " is outside the board."
          }
          else {
            const parity =  (c % 2 === 0) ? "even" : "odd";
            return l + "? Must be " + parity + " line on " + h.substring(0, 1).toUpperCase() + " " + parity + " column";
          }
        }
        else { return "Invalid column name: " + h.substring(0, 1).toUpperCase(); }
      }
      catch (ex) { return "Input error: Must be a column letter followed by a positive number."; }
    }
    else { return undefined; }
}

  #c; #l;
  constructor(c, l) {
    if (!Hexcac.isInsideBoard(c, l)) throw new RangeError("Hexcac out of range.");
    this.#c = c;
    this.#l = l;
  }
  get c() { return this.#c; }
  get l() { return this.#l; }

  get columnName() { return Hexcac.columNames[this.#c + 7]; }

  getId(prefix) {
    return "" + prefix + this.columnName.toUpperCase() + this.#l;
  }

  clone() { return new Hexcac(this.#c, this.#l); }

  //n between 0 and 5;
  //values 0..2 are ascendant, 3..5 descendant
  //values 0 and 3 are the moviments through the column
  orthogonalStep(n) {
    const c = this.#c + Hexcac.#ORTHOGONAL_MOVES[n][0];
    const l = this.#l + Hexcac.#ORTHOGONAL_MOVES[n][1];
    return [c, l];
  }

  //n between 0 and 5;
  //values 0 and 3 are through the horizontal line
  //values 1 and 2 are ascendant, 4 and 5 descendant
  diagonalStep(n) {
    const c = this.#c + Hexcac.#DIAGONAL_MOVES[n][0];
    const l = this.#l + Hexcac.#DIAGONAL_MOVES[n][1];
    return [c, l];
  }

  knightJump(n) {
    const c = this.#c + Hexcac.#KNIGHT_MOVES[n][0];
    const l = this.#l + Hexcac.#KNIGHT_MOVES[n][1];
    return [c, l];
  }

  knightRide(n) {
    const c = this.#c + (Hexcac.#KNIGHT_MOVES[n][0] << 1);
    const l = this.#l + (Hexcac.#KNIGHT_MOVES[n][1] << 1);
    return [c, l];
  }

  //n between 0 and 5;
  //values 0..2 are ascendant, 3..5 descendant
  //values 0 and 3 are the moviments through the column
  fileMove(n) {
    const columna = this.#c + Hexcac.#ORTHOGONAL_MOVES[n][0];
    const linia = this.#l + Hexcac.#ORTHOGONAL_MOVES[n][1];
    const ok = Hexcac.isInsideBoard(columna, linia);
    if (ok) { this.#c = columna; this.#l = linia; }
    return ok;
  }

  //n between 0 and 5;
  //values 0 and 3 are through the horizontal line
  //values 1 and 2 are ascendant, 4 and 5 descendant
  lineMove(n) {
    const columna = this.#c + Hexcac.#DIAGONAL_MOVES[n][0];
    const linia = this.#l + Hexcac.#DIAGONAL_MOVES[n][1];
    const ok = Hexcac.isInsideBoard(columna, linia);
    if (ok) { this.#c = columna; this.#l = linia; }
    return ok;
  }

  knightMove(n) {
    const [columna, linia] = this.knightJump(n);
    if (Hexcac.isInsideBoard(columna, linia)) {
      this.#c = columna; this.#l = linia;
      return true;
    }
    else return false;
  }

  knightRideMove(n) {
    const [columna, linia] = this.knightRide(n);
    if (Hexcac.isInsideBoard(columna, linia)) {
      this.#c = columna; this.#l = linia;
      return true;
    }
    else return false;
  }

  toJSON() {
    return {
      c: this.#c,
      l: this.#l
    }
  }

  toString() {
    return this.columnName.toUpperCase() + this.#l;
  }
}

