/** possible Column template types */
export enum AtlpRichClassicTableColumnTemplate {
  info = 'info',
  status = 'status',
  select = 'select',
  text = 'text',
  link = 'link',
  innerHtml = 'innerHtml',
  dynamicComponent = 'dynamicComponent',
  richCard = 'richCard',
}

/** Cell template */
export enum AtlpRichClassicTableCellTemplate {
  infoRichClassic = 'infoRichClassic',
  statusRichClassic = 'statusRichClassic',
  select = 'select',
  text = 'text',
  link = 'link',
}

/** Data presentation mode */
export enum AtlpRichClassicTableMode {
  rich = 'rich',
  collapse = 'collapse',
  rolled = 'rolled',
}

export enum AtlpRichClassicTableActionDropColumn {
  hide = 'hide',
  show = 'show',
}
