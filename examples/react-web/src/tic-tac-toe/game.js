/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { schema, state } from './ui-schema';
import { PluginSandbox } from 'bgio-sandbox';

function IsVictory(api) {
  const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const isRowComplete = row => {
    const symbols = row.map(i => {
      const id = `point-${i + 1}`;
      const card = api.object(id).top();
      return card ? card.opts().text : null;
    });

    return symbols.every(s => s !== null && s === symbols[0]);
  };

  return positions.map(isRowComplete).some(i => i === true);
}

const TicTacToe = {
  name: 'tic-tac-toe',

  setup: () => ({
    cells: new Array(9).fill(null),
  }),

  // TODO: Don't pass state in but create it in the setup
  // function via an API instead.
  plugins: [PluginSandbox(schema, state)],

  moves: {
    move: (G, ctx, { obj }) => {
      const symbol = ctx.currentPlayer === '0' ? 'O' : 'X';
      ctx.api
        .object('point-' + symbol)
        .top()
        .addTo(obj);
    },
  },

  turn: {
    moveLimit: 1,
  },

  endIf: (G, ctx) => {
    if (IsVictory(ctx.api)) {
      return { winner: ctx.currentPlayer };
    }
    if (G.cells.filter(c => c === null).length == 0) {
      return { draw: true };
    }
  },

  ai: {
    enumerate: G => {
      let r = [];
      for (let i = 0; i < 9; i++) {
        if (G.cells[i] === null) {
          r.push({ move: 'clickCell', args: [i] });
        }
      }
      return r;
    },
  },
};

export default TicTacToe;
