import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../common/lib';
import {ImageProps, imagePropsDescr, outerTagImage
} from '../common/generated';

export const Input: ui.StatelessComponent<ImageProps> = pr => {
  let props: ImageProps = ui.enumValToProp(pr, imagePropsDescr);
  let tag = props.$OuterTag; delete props.$OuterTag;
  if (tag == outerTagImage.$a) {
    let src = props['src']; delete props['src'];
    let rest = ui.propsToClasses(['ui image'], ui.projection(props, imagePropsDescr));
    return React.createElement('a', rest, React.createElement('img', { src: src }));
  } else {
    let rest = ui.propsToClasses(['ui image'], ui.projection(props, imagePropsDescr));
    return React.createElement('img', rest, pr.children);
  }
}


