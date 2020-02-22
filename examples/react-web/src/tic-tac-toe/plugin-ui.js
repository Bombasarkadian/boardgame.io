import { API, ActionRecorder } from 'bgio-ui';
import { schema } from './ui-schema';

const Reset = state => {
  return {
    ...state,
    G: {
      ...state.G,
      _ui: {
        ...state.G._ui,
        actions: [],
      },
    },
  };
};
const UpdateState = state => {
  const actionRecorder = ActionRecorder.fromActions(state.G._ui.actions);
  return {
    ...state,
    G: {
      ...state.G,
      _ui: {
        ...state.G._ui,
        state: actionRecorder.applyToState(state.G._ui.state),
      },
    },
  };
};

export const PluginUI = initialState => ({
  setup: {
    G: G => {
      return {
        ...G,
        _ui: {
          state: initialState,
          actions: [],
        },
      };
    },
  },

  enhance: {
    ctx: (G, ctx) => {
      const actionRecorder = new ActionRecorder();
      const api = API(schema, G._ui.state, actionRecorder);
      return { ...ctx, api };
    },
  },

  fnWrap: moveFn => {
    return (G, ctx, ...args) => {
      G = moveFn(G, ctx, ...args);
      return {
        ...G,
        _ui: {
          ...G._ui,
          actions: [...G._ui.actions, ...ctx.api._actionRecorder.getActions()],
        },
      };
    };
  },
  beforeMove: Reset,
  beforeEvent: Reset,

  // TODO: Changes to state need to be applied earlier so that triggers after
  // the move can see the state changes.
  afterMove: UpdateState,
  afterEvent: UpdateState,
});
