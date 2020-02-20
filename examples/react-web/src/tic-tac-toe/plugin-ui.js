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

  fnWrap: moveFn => {
    return (G, ctx, ...args) => {
      const actionRecorder = new ActionRecorder();
      const api = API(schema, G._ui.state, actionRecorder);
      ctx = { ...ctx, api };
      G = moveFn(G, ctx, ...args);
      G = {
        ...G,
        _ui: {
          ...G._ui,
          actions: [...G._ui.actions, ...actionRecorder.getActions()],
        },
      };
      return G;
    };
  },
  beforeMove: Reset,
  beforeEvent: Reset,
  afterMove: UpdateState,
  afterEvent: UpdateState,
});
