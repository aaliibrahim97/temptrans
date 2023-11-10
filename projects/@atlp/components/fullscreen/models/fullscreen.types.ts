export interface ATLPDocument extends HTMLDocument {
  mozFullScreenElement?: Element;
  mozCancelFullScreen?: () => void;
  msFullscreenElement?: Element;
  msExitFullscreen?: () => void;
  webkitFullscreenElement?: Element;
  webkitExitFullscreen?: () => void;
}

export interface ATLPDocumentElement extends HTMLElement {
  mozRequestFullScreen?: () => void;
  msRequestFullscreen?: () => void;
  webkitRequestFullscreen?: () => void;
}
