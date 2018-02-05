declare module 'react-file-reader-input' {
  import * as React from 'react';

  interface FileInputProps {
    as?: 'buffer' | 'binary' | 'url' | 'text';
    multiple?: boolean;
    onChange(event: React.SyntheticEvent<any>, results: ([ProgressEvent, File])[]): void;
  }

  class FileInput extends React.Component<FileInputProps> {
  }

  export = FileInput;
}
