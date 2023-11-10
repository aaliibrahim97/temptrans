/** Column template */
export enum ColumnTemplate {
  /** Information */
  info = 'info',

  /** Status */
  status = 'status',

  /** Column select */
  select = 'select',

  /** Column text */
  text = 'text',

  /** Column link */
  link = 'link'
}

/** Cell template */
export enum CellTemplate {
  /** Information voyage */
  infoVoyage = 'infoVoyage',

  /** Status voyage */
  statusVoyage = 'statusVoyage',

  /** Column select */
  select = 'select',

  /** Column text */
  text = 'text',

  /** Column link */
  link = 'link'
}

/** Data presentation mode */
export enum TableMode {
  /** Presentation by cards */
  rich = 'rich',

  /** List view to screen width */
  collapse = 'collapse',

  /** Scrolling list view */
  rolled = 'rolled'
}

export enum ActionDropColumn {
  hide = 'hide',
  show = 'show'
}
