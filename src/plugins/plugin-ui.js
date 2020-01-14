/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Plugin that creates an API through which game logic
 * can interact with the UI environment.
 */
export default {
  fnWrap: moveFn => {
    return (G, ctx, ...args) => {
      const current = ctx.currentPlayer;
      const player = G.players[current];

      G = { ...G, player };

      let other = null;
      let opponent = null;
      if (ctx.numPlayers == 2) {
        other = current == '0' ? '1' : '0';
        opponent = G.players[other];
        G.opponent = opponent;
      }

      G = moveFn(G, ctx, ...args);

      const players = {
        ...G.players,
        [current]: G.player,
      };

      if (other !== null) {
        players[other] = G.opponent;
      }

      {
        /* eslint-disable-next-line no-unused-vars */
        const { player, opponent, ...rest } = G;
        return { ...rest, players };
      }
    };
  },

  G: {
    preMove: G => {
      return { ...G };
    },
  },
};
