export interface IModalDialog {
    open: boolean;
    title?: string;
    content?: string;
    onAgree: () => void; // Renamed to follow camelCase convention
    onDisagree: () => void;
  }
  