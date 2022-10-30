import React, {useEffect, useRef} from 'react';
import {
  PixelRatio,
  UIManager,
  findNodeHandle,
  BackHandler,
  Text,
  AppState,
} from 'react-native';

import {MyViewManager} from './MyViewManager';

const createFragment = viewId =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    // we are calling the 'create' command
    UIManager.MyViewManager.Commands.create.toString(),
    [viewId],
  );

export const MyView = props => {
  const ref = useRef(null);
  const appState = useRef(AppState.currentState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const textElement = <Text>Button Added</Text>;
  const currentNode = findNodeHandle(ref.current);
  const addElementToDOM = (node, child) => {
    if (React.isValidElement(node)) {
      node.appendChild(child);
    }
  };
  useEffect(() => {
    AppState.addEventListener('change', () => console.log('Event triggered'));
  }, []);
  useEffect(() => {
    const viewId = findNodeHandle(ref.current);
    if (React.isValidElement(viewId)) {
      viewId.appendChild(props.children);
    }
    createFragment(viewId);
  }, [props.children]);

  return (
    <MyViewManager
      style={{
        // converts dpi to px, provide desired height
        height: PixelRatio.getPixelSizeForLayoutSize(200),
        // converts dpi to px, provide desired width
        width: PixelRatio.getPixelSizeForLayoutSize(200),
      }}
      ref={ref}
      title={props.title}>
      {props.children}
    </MyViewManager>
  );
};
