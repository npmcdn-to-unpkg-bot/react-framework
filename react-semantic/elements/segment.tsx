import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';

export enum raised { no, $raisedStandard, $raisedStacked, $raisedPiled, $raisedStackedTall, }
ui.registerEnum(raised, '$Raised', { $raisedStandard: 'raised', $raisedStacked: 'stacked', $raisedStackedTall: 'stackedTall', $raisedPiled: 'piled' });
export interface IPropsRaisedProp { $raisedStandard?: boolean; $raisedStacked?: boolean; $raisedPiled?: boolean; $raisedStackedTall?: boolean; }

export enum attachedSegment { no, $attachedTop, $attachedBottom, $attachedBoth, }
ui.registerEnum(attachedSegment, '$AttachedSegment', { $attachedBoth: 'attached' });
export interface IPropsAttachedSegmentProp { $attachedTop?: boolean; $attachedBottom?: boolean; $attachedBoth?: boolean; }

export enum padded { no, $paddedStandard, $paddedVery, }
ui.registerEnum(padded, '$Padded', { $paddedVery: 'veryPadded' });
export interface IPropsPaddedProp { $paddedStandard?: boolean; $paddedVery?: boolean; }

export enum emphasis { standard, $secondary, $tertiary, }
ui.registerEnum(emphasis, '$Emphasis');
export interface IPropsEmphasisProp { $secondary?: boolean; $tertiary?: boolean; }

export enum aligned { no, $alignedLeft, $alignedCenter, $alignedRight, }
ui.registerEnum(aligned, '$Aligned', { $alignedLeft: 'leftAligned', $alignedCenter: 'centerAligned', $alignedRight: '$rightAligned' });
export interface IPropsAlignedProp { $alignedLeft?: boolean; $alignedCenter?: boolean; $alignedRight?: boolean; }

export interface SegmentProps extends ui.IProps, IPropsRaisedProp, IPropsAttachedSegmentProp, IPropsPaddedProp, IPropsEmphasisProp, IPropsAlignedProp, ui.IPropsColor, ui.IPropsFloated {
  $Raised?: raised;
  $Attached?: attachedSegment;
  $Padded?: padded;
  $Emphasis?: emphasis;
  $Aligned?: aligned;
  $Color?: ui.color;
  $Floated?: ui.floated;
  $vertical?: boolean;
  $disabled?: boolean;
  $loading?: boolean;
  $inverted?: boolean;
  $compact?: boolean;
  $circular?: boolean;
  $clearing?: boolean;
  $basic?: boolean;
}

var segmentPropsDescr = ui.createDescr<SegmentProps>(val => {
  return {
    $Raised: new ui.enumConverter<raised>(raised, val.$Raised),
    $Attached: new ui.enumConverter<attachedSegment>(attachedSegment, val.$Attached),
    $Padded: new ui.enumConverter<padded>(padded, val.$Padded),
    $Emphasis: new ui.enumConverter<emphasis>(emphasis, val.$Emphasis),
    $Aligned: new ui.enumConverter<aligned>(aligned, val.$Aligned),
    $Color: new ui.enumConverter<ui.color>(ui.color, val.$Color),
    $Floated: new ui.enumConverter<ui.floated>(ui.floated, val.$Floated),
    $vertical: new ui.boolConverter(val.$vertical),
    $disabled: new ui.boolConverter(val.$disabled),
    $loading: new ui.boolConverter(val.$loading),
    $inverted: new ui.boolConverter(val.$inverted),
    $compact: new ui.boolConverter(val.$compact),
    $circular: new ui.boolConverter(val.$circular),
    $clearing: new ui.boolConverter(val.$clearing),
    $basic: new ui.boolConverter(val.$basic)
  };
});


export const Segment: ui.StatelessComponent<SegmentProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui segment'], ui.projection(props, segmentPropsDescr));
  return React.createElement('div', rest);
}

//************* Segments
export enum raisedSegments { no, $raisedStandard, $raisedStacked, $raisedPiled }
ui.registerEnum(raisedSegments, '$Raised', { $raisedStandard: 'raised', $raisedStacked: 'stacked', $raisedPiled: 'piled' });
export interface IPropsRaisedSerments {
  $raisedStandard?: boolean; $raisedStacked?: boolean; $raisedPiled?: boolean;
}

export interface SegmentsProps extends ui.IProps, IPropsRaisedSerments {
  $Raised?: raisedSegments;

  $compact?: boolean;
  $horizontal?: boolean;
}

var segmentsPropsDescr = ui.createDescr<SegmentsProps>(val => {
  return {
    $Raised: new ui.enumConverter<raisedSegments>(raisedSegments, val.$Raised),
    $compact: new ui.boolConverter(val.$compact),
    $horizontal: new ui.boolConverter(val.$horizontal),
  };
});

export const Segments: ui.StatelessComponent<SegmentsProps> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui segments'], ui.projection(props, segmentsPropsDescr));
  return React.createElement('div', rest);
}


