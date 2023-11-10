export interface Stores {
  actions: StringKeyObject;
  mutations: StringKeyObject;
  states: unknown;
  getters: StringKeyObject;
}
export interface ActionContext {
  commit: (mutationName: string, payload: StringKeyObject) => void;
  getters: (getterName: string, payload: StringKeyObject) => unknown;
}
export interface StringKeyObject {
  [key: string]: any;
}
/**
 * AtlpDashboardStateStore class
 */
export default class AtlpDashboardStore {
  private events;
  private actions;
  private mutations;
  private states;
  private getters_;
  constructor(stores: Stores);
  /**
   * Dispatch action event
   */
  dispatch(actionName: string, payload?: StringKeyObject): Promise<unknown>;
  /**
   * Commit that modifies the states
   */
  commit(mutationName: string, payload?: StringKeyObject): void;
  /**
   * Get state
   */
  getters(getterName: string, payload?: StringKeyObject): unknown;
  /**
   * Subscribe event
   */
  subscribe(eventName: string, callback: () => void): () => void;
}
