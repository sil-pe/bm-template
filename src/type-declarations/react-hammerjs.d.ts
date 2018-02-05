declare module 'react-hammerjs' {
  import * as React from 'react';
  import {Recognizer} from 'hammerjs';

  export type HammerProps = {
    children: React.ReactNode;
    direction?: number;
    options?: any;
    recognizeWith?: Recognizer[];
    action?: (e: any) => void;
    onDoubleTap?: (e: any) => void;
    onPan?: (e: any) => void;
    onPanCancel?: (e: any) => void;
    onPanEnd?: (e: any) => void;
    onPanStart?: (e: any) => void;
    onPinchEnd?: (e: any) => void;
    onPinch?: (e: any) => void;
    onPinchCancel?: (e: any) => void;
    onPinchIn?: (e: any) => void;
    onPinchOut?: (e: any) => void;
    onPinchStart?: (e: any) => void;
    onPress?: (e: any) => void;
    onPressUp?: (e: any) => void;
    onRotate?: (e: any) => void;
    onRotateCancel?: (e: any) => void;
    onRotateEnd?: (e: any) => void;
    onRotateMove?: (e: any) => void;
    onRotateStart?: (e: any) => void;
    onSwipe?: (e: any) => void;
    onSwipeRight?: (e: any) => void;
    onSwipeLeft?: (e: any) => void;
    onSwipeUp?: (e: any) => void;
    onSwipeDown?: (e: any) => void;
    onTap?: (e: any) => void;
  };

  const Hammer: React.ComponentClass<HammerProps>;

  export default Hammer;
}
