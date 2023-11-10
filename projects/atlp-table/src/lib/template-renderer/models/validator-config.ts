export interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[];
  };
}
