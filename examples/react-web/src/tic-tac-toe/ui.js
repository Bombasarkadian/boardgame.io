/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import { Client } from 'boardgame.io/client';
import { Init } from 'bgio-ui';
import { Debug } from 'boardgame.io/debug';
import TicTacToe from './game';

export const CARD = 0;
export const CARD_ROW = 1;
export const SNAP_POINT = 2;

const client = Client({
  game: TicTacToe,
  debug: { impl: Debug },
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
});

client.start();

const schema = {
  'card-O1': { type: CARD, opts: { text: 'O' } },
  'card-O2': { type: CARD, opts: { text: 'O' } },
  'card-O3': { type: CARD, opts: { text: 'O' } },
  'card-O4': { type: CARD, opts: { text: 'O' } },
  'card-O5': { type: CARD, opts: { text: 'O' } },
  'card-O6': { type: CARD, opts: { text: 'O' } },
  'card-O7': { type: CARD, opts: { text: 'O' } },
  'card-O8': { type: CARD, opts: { text: 'O' } },
  'card-O9': { type: CARD, opts: { text: 'O' } },

  'card-X1': { type: CARD, opts: { text: 'X' } },
  'card-X2': { type: CARD, opts: { text: 'X' } },
  'card-X3': { type: CARD, opts: { text: 'X' } },
  'card-X4': { type: CARD, opts: { text: 'X' } },
  'card-X5': { type: CARD, opts: { text: 'X' } },
  'card-X6': { type: CARD, opts: { text: 'X' } },
  'card-X7': { type: CARD, opts: { text: 'X' } },
  'card-X8': { type: CARD, opts: { text: 'X' } },
  'card-X9': { type: CARD, opts: { text: 'X' } },

  'point-O': {
    type: SNAP_POINT,
    opts: { x: 800, y: 300, enabled: false },
  },

  'point-X': {
    type: SNAP_POINT,
    opts: { x: 1000, y: 300, enabled: false },
  },

  'point-1': {
    type: SNAP_POINT,
    data: { id: 0 },
    opts: { x: 100, y: 100, onDrop: 'move' },
  },

  'point-2': {
    type: SNAP_POINT,
    data: { id: 1 },
    opts: { x: 300, y: 100, onDrop: 'move' },
  },

  'point-3': {
    type: SNAP_POINT,
    data: { id: 2 },
    opts: { x: 500, y: 100, onDrop: 'move' },
  },

  'point-4': {
    type: SNAP_POINT,
    data: { id: 3 },
    opts: { x: 100, y: 300, onDrop: 'move' },
  },

  'point-5': {
    type: SNAP_POINT,
    data: { id: 4 },
    opts: { x: 300, y: 300, onDrop: 'move' },
  },

  'point-6': {
    type: SNAP_POINT,
    data: { id: 5 },
    opts: { x: 500, y: 300, onDrop: 'move' },
  },

  'point-7': {
    type: SNAP_POINT,
    data: { id: 6 },
    opts: { x: 100, y: 500, onDrop: 'move' },
  },

  'point-8': {
    type: SNAP_POINT,
    data: { id: 7 },
    opts: { x: 300, y: 500, onDrop: 'move' },
  },

  'point-9': {
    type: SNAP_POINT,
    data: { id: 8 },
    data: { id: 1 },
    opts: { x: 500, y: 500, onDrop: 'move' },
  },
};

const state = {
  'point-1': {},
  'point-2': {},
  'point-3': {},
  'point-4': {},
  'point-5': {},
  'point-6': {},
  'point-7': {},
  'point-8': {},
  'point-9': {},
  'point-O': {
    children: [
      'card-O1',
      'card-O2',
      'card-O3',
      'card-O4',
      'card-O5',
      'card-O6',
      'card-O7',
      'card-O8',
      'card-O9',
    ],
  },
  'point-X': {
    children: [
      'card-X1',
      'card-X2',
      'card-X3',
      'card-X4',
      'card-X5',
      'card-X6',
      'card-X7',
      'card-X8',
      'card-X9',
    ],
  },
};

class UI extends React.Component {
  componentDidMount() {
    Init(schema, state, client);
  }

  render() {
    return <div id="container"></div>;
  }
}

export default UI;
