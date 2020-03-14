/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { ObjectType, PluginSandbox } from 'bgio-sandbox';

function IsVictory(ctx) {
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
      const card = ctx.sandbox.object(id).top();
      return card ? card.opts().text : null;
    });

    return symbols.every(s => s !== null && s === symbols[0]);
  };

  return positions.map(isRowComplete).some(i => i === true);
}

const TicTacToe = {
  name: 'tic-tac-toe',

  setup: (ctx) => {
    for (let i = 1; i <= 9; i++) {
      ctx.sandbox.object(`card-X${i}`).addTo(`point-X`);
      ctx.sandbox.object(`card-O${i}`).addTo(`point-O`);
    }

    return {
      cells: new Array(9).fill(null),
    };
  },

  sandbox: {
    init: (api) => {
      api.create({
        id: 'point-O',
        type: ObjectType.CARD_HOLDER,
        opts: { x: 200, y: 700, enabled: false },
      });

      api.create({
        id: 'point-X',
        type: ObjectType.CARD_HOLDER,
        opts: { x: 400, y: 700, enabled: false },
      });

      const xValues = [100, 300, 500];
      const yValues = [100, 300, 500];

      for (let i = 1; i <= 9; i++) {
        api.create({
          id: `card-O${i}`,
          type: ObjectType.CARD,
          opts: { text: 'O' },
        });

        api.create({
          id: `card-X${i}`,
          type: ObjectType.CARD,
          opts: { text: 'X' },
        });

        const x = xValues[(i - 1) % 3];
        const y = yValues[Math.floor((i - 1) / 3)];

        api.create({
          id: `point-${i}`,
          type: ObjectType.CARD_HOLDER,
          data: { id: i },
          opts: { x, y, onClick: 'move' },
        });
      }
    },
  },

  plugins: [PluginSandbox],

  moves: {
    move: (_, ctx, { obj }) => {
      const symbol = ctx.currentPlayer === '0' ? 'O' : 'X';
      ctx.sandbox
        .object('point-' + symbol)
        .top()
        .addTo(obj);
    },
  },

  turn: {
    moveLimit: 1,
  },

  endIf: (_, ctx) => {
    if (IsVictory(ctx)) {
      return { winner: ctx.currentPlayer };
    }
  },

  onEnd: (_, ctx) => {
    ctx.sandbox
      .object('point-1')
      .top()
      .opts('highlight', true);
    ctx.sandbox
      .object('point-2')
      .top()
      .opts('highlight', true);
    ctx.sandbox
      .object('point-3')
      .top()
      .opts('highlight', true);
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
