/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import { Client } from 'boardgame.io/client';
import { Init, ActionRecorder } from 'bgio-ui';
import { schema, state } from './ui-schema';
import { Debug } from 'boardgame.io/debug';
import TicTacToe from './game';

const client = Client({
  game: TicTacToe,
  debug: { impl: Debug },
});

class UI extends React.Component {
  componentDidMount() {
    const svg = Init(schema, state, client);

    client.subscribe(({ G }) => {
      const actionRecorder = ActionRecorder.fromActions(G._ui.actions);
      actionRecorder.applyToSvg(svg);
    });

    client.start();
  }

  render() {
    return <div id="container"></div>;
  }
}

export default UI;
