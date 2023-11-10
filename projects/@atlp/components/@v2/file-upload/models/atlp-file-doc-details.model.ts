import _ from 'lodash';

export class AtlpFileDocumentDetails {
  fileData: string | ArrayBuffer;
  name: string;
  mimeType: string;
  size: number;
  metaData: any;
  docId: string;

  constructor(
    fileData: string | ArrayBuffer,
    name: string,
    type: string,
    size: number,
    docId: string = null,
    metaData: any = null
  ) {
    this.docId = docId;
    this.fileData = fileData;
    this.name = name;
    this.mimeType = type;
    this.size = size;
    this.metaData = metaData;
  }
}

export const defaultAtlpFileDocumentDetails: AtlpFileDocumentDetails =
  _.cloneDeep({
    docId: '',
    fileData: '',
    name: '',
    mimeType: '',
    size: 0,
    metaData: null,
  });
