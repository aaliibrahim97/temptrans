/**
 * Find "nested" object
 */
const findNestedObj = (obj, name) => {
  const paths = name.split(".");
  return paths.reduce((object, path) => (object || {})[path], obj);
};

/**
 * Publish and Subscribe class
 */
class PubSub {
  constructor() {
    this.events = {};
  }
  /**
   * Subscribe event
   */
  subscribe(eventName, callback) {
    if (!Object.prototype.hasOwnProperty.call(this.events, eventName)) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
    const unsubscribe = () => {
      this.events[eventName] = this.events[eventName].filter(
        (event) => callback !== event
      );
    };
    return unsubscribe;
  }
  /**
   * Publish the event
   */
  publish(eventName) {
    if (!Object.prototype.hasOwnProperty.call(this.events, eventName)) {
      return;
    }
    this.events[eventName].forEach((callback) => callback());
  }
}

/**
 * AtlpDashboardStateStore class
 */
class AtlpDashboardStore {
  constructor(stores) {
    const { actions, mutations, states, getters } = stores;
    if (!actions || !mutations || !states || !getters) {
      throw new Error("You must add actions, mutations, states, getters");
    }
    this.events = new PubSub();
    this.actions = actions;
    this.mutations = mutations;
    this.states = states;
    this.getters_ = getters;
  }

  /**
   * Dispatch action event
   */
  dispatch(actionName, payload) {
    const action = findNestedObj(this.actions, actionName);
    if (typeof action !== "function") {
      console.error(`Action: actionName doesn't exist => ${actionName}`);
      return window.Promise.reject();
    }
    const context = {
      commit: this.commit.bind(this),
      getters: this.getters.bind(this),
    };
    return action(context, payload);
  }

  /**
   * Commit that modifies the states
   */
  commit(mutationName, payload) {
    const mutation = findNestedObj(this.mutations, mutationName);
    if (typeof mutation !== "function") {
      console.error(`Mutation: mutationName doesn't exist => ${mutationName}`);
      return;
    }
    const context = {
      states: this.states,
    };
    const eventName = mutation(context, payload);
    this.events.publish(eventName);
  }

  /**
   * Get state
   */
  getters(getterName, payload) {
    const getter = findNestedObj(this.getters_, getterName);
    if (typeof getter !== "function") {
      console.error(`Getter: getterName doesn't exist => ${getterName}`);
      return;
    }
    const context = {
      states: this.states,
    };
    return getter(context, payload);
  }

  /**
   * Subscribe event
   */
  subscribe(eventName, callback) {
    return this.events.subscribe(eventName, callback);
  }
}

export { AtlpDashboardStore as default };
