﻿export enum genComponentType { elements, views, collections, }

export interface genComponent {
  name: string;
  type?: genComponentType;
  boolProps: Array<genBoolProp>;
  enumProps: Array<genEnumProp>;
  locked?: boolean;
  inheritsFrom?: string;
  otherCode?: string;
  otherPropDescr?: string;
  otherProps?: string;
  autoTag?: string; //tag pro automatickou generaci komponenty
  autoClass?: string; //class pro automatickou generaci komponenty
}

export interface genBoolProp {
  name: string;
  ignore?: boolean;
}

export interface genEnumProp {
  name: string;
  aliasPropName?: string;
  values?: Array<string>;
  isSystem?: boolean;
  alias?: string;
}

export var codeData: Array<genComponent> = [
  {
    name: 'button',
    locked: true,
    autoClass: `'ui button', { icon: props.$hasIcon, active: props.$active }`,
    autoTag: `props.$Attached ? 'div' : 'button'`,
    boolProps: [
      { name: 'basic' }, { name: 'inverted' }, { name: 'compact' }, { name: 'fluid' }, { name: 'circular' }, { name: 'labeled' }, { name: 'hasIcon', ignore: true },
      { name: 'active', ignore: true }, { name: 'loading' }, { name: 'disabled' }, { name: 'primary' }, { name: 'secondary' }, { name: 'positive' }, { name: 'negative' }],
    enumProps: [
      { name: 'attachedButton', aliasPropName: 'Attached', values: ['no', 'attachedTop', 'attachedBottom', 'attachedLeft', 'attachedRight'] },
      { name: 'size', isSystem: true },
      { name: 'color', isSystem: true },
      { name: 'floated', isSystem: true }
    ]
  },
  {
    name: 'buttonAnimated',
    locked: true,
    otherCode: `
export enum animate { standard, vertical, fade }
export interface animateTo {
  animate?: animate;
  to: React.ReactNode;
}
`,
    otherProps: '  $animateTo: animateTo;',
    otherPropDescr: '    $animateTo: null,',
    boolProps: [],
    enumProps: [
    ],
    inheritsFrom: 'button'
  },
  {
    name: 'buttonLabeled',
    otherProps: '  $label: React.ReactElement<any>;',
    otherPropDescr: `    ,$label: null
`,
    boolProps: [{ name: 'pointing' }, { name: 'left' }],
    enumProps: [
    ],
    inheritsFrom: 'button'
  },
  {
    name: 'buttonIcon',
    boolProps: [],
    enumProps: [
      { name: 'iconLabel', values: ['no', 'iconLabelRight', 'iconLabelLeft'] },
      { name: 'icon', isSystem: true },
    ],
    inheritsFrom: 'button'
  },
  {
    name: 'buttonSocial',
    boolProps: [],
    enumProps: [
      { name: 'social', values: ['no', 'facebook', 'twitter', 'googlePlus', 'vk', 'linkedin', 'instagram', 'youtube'] },
    ],
    inheritsFrom: 'button'
  },
  {
    name: 'buttons',
    boolProps: [{ name: 'vertical' }, { name: 'labeled' }, { name: 'basic' }, { name: 'hasIcon' }],
    enumProps: [
      { name: 'eqWidth', values: ['no', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'] },
      { name: 'size', isSystem: true },
      { name: 'color', isSystem: true },
    ]
  },
  {
    name: 'label',
    locked: true,
    autoClass: `'ui label'`,
    autoTag: `props.$outerTag ? props.$outerTag : 'span'`,
    otherProps: '  $outerTag?: string;',
    boolProps: [{ name: 'image' }, { name: 'basic' }, { name: 'tag' }, { name: 'horizontal' }, { name: 'floating' }],
    enumProps: [
      {
        name: 'pointing', values: ['no', 'pointingAbove', 'pointingBelow', 'pointingLeft', 'pointingRight'],
        alias: `, { $pointingAbove: 'pointing', $pointingLeft: 'leftPointing', $pointingRight: 'rightPointing' }`
      },
      { name: 'corner', values: ['no', 'cornerLeft', 'cornerRight'] },
      {
        name: 'attachedLabel', aliasPropName: 'Attached', values: ['no', 'attachedTop', 'attachedBottom', 'attachedTopRight', 'attachedTopLeft', 'attachedBottomRight', 'attachedBottomLeft'],
        alias: `, { $attachedBottom: 'bottomAttached', $attachedTop: 'topAttached', $attachedTopRight: 'topRightAttached', $attachedTopLeft: 'topLeftAttached', $attachedBottomRight: 'bottomRightAttached', $attachedBottomLeft: 'bottomLeftAttached'}`
      },
      { name: 'circularLabel', aliasPropName: 'Circular', values: ['no', 'circularStandard', 'circularEmpty'] },
      { name: 'ribbon', values: ['no', 'ribbonLeft', 'ribbonRight'] },
      { name: 'size', isSystem: true },
      { name: 'color', isSystem: true },
    ]
  },
  {
    name: 'labels',
    autoClass: `'ui labels'`,
    autoTag: `'div'`,
    boolProps: [{ name: 'tag' }, { name: 'circular' }],
    enumProps: [
      { name: 'size', isSystem: true },
      { name: 'color', isSystem: true },
    ]
  },
  {
    name: 'icon',
    autoClass:`'icon'`,
    autoTag:`'i'`,
    locked: true,
    boolProps: [{ name: 'disabled' }, { name: 'loading' }, { name: 'fitted' }, { name: 'link' }, { name: 'inverted' }, { name: 'corner' }],
    enumProps: [
      { name: 'flipped', values: ['no', 'flippedHorizontally', 'flippedVertically'] },
      { name: 'rotated', values: ['no', 'rotatedClockwise', 'rotatedCounterclockwise'] },
      { name: 'circularIcon', aliasPropName: 'Circular', values: ['no', 'circularStandard', 'circularInverted'], alias: `, { $circularStandard: 'circular' }` },
      { name: 'bordered', values: ['no', 'borderedStandard', 'borderedInverted'], alias: `, { $borderedStandard: 'bordered' }` },
      { name: 'icon', isSystem: true },
      { name: 'size', isSystem: true },
      { name: 'color', isSystem: true }
    ]
  },
  {
    name: 'icons',
    autoClass: `'icons'`,
    autoTag: `'i'`,
    boolProps: [],
    enumProps: [
      { name: 'size', isSystem: true },
    ]
  },  {
    name: 'segment',
    autoClass:`'ui segment'`,
    autoTag:`'div'`,
    locked: true,
    boolProps: [{ name: 'vertical' }, { name: 'disabled' }, { name: 'loading' }, { name: 'inverted' }, { name: 'compact' }, { name: 'circular' }, { name: 'clearing' }, { name: 'basic' }],
    enumProps: [
      { name: 'raised', values: ['no', 'raisedStandard', 'raisedStacked', 'raisedPiled', 'raisedStackedTall'], alias: `, { $raisedStandard: 'raised', $raisedStacked: 'stacked', $raisedStackedTall: 'stackedTall', $raisedPiled: 'piled' } ` },
      { name: 'attachedSegment', aliasPropName: 'Attached', values: ['no', 'attachedTop', 'attachedBottom', 'attachedBoth'], alias: `, { $attachedBoth: 'attached'} ` },
      { name: 'padded', values: ['no', 'paddedStandard', 'paddedVery'], alias: `, { $paddedVery: 'veryPadded'} ` },
      { name: 'emphasis', values: ['standard', 'secondary', 'tertiary'], alias: ` ` },
      { name: 'aligned', values: ['no', 'alignedLeft', 'alignedCenter', 'alignedRight'], alias: `, { $alignedLeft: 'leftAligned', $alignedCenter: 'centerAligned', $alignedRight:'$rightAligned'} ` },
      { name: 'color', isSystem: true },
      { name: 'floated', isSystem: true },
    ]
  },
  {
    name: 'segments',
    autoClass:`'ui segments'`,
    autoTag:`'div'`,
    boolProps: [{ name: 'compact' }, { name: 'horizontal' }],
    enumProps: [
      { name: 'raisedSegments', aliasPropName: 'Raised', values: ['no', 'raisedStandard', 'raisedStacked', 'raisedPiled'], alias: `, { $raisedStandard: 'raised', $raisedStacked: 'stacked', $raisedPiled: 'piled' }` },
    ]
  },
  {
    name: 'flag',
    autoClass:`'ui flag'`,
    autoTag:`'i'`,
    locked: true,
    otherProps: '  $Flag?: flag;\r\n  $FlagShort?: flagShort;',
    otherPropDescr: '    ,$Flag: new ui.enumConverter<flag>(flag, val.$Flag),\r\n    $FlagShort: new ui.enumConverter<flagShort>(flagShort, val.$FlagShort),',
    boolProps: [],
    enumProps: [
      { name: 'color', isSystem: true }
    ]
  },
  {
    name: 'divider',
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'header',
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'image',
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'input',
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'list',
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'loader',
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'rail',
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'reveal',
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'step',
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'breadcrumb',
    type: genComponentType.collections,
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'form',
    type: genComponentType.collections,
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'grid',
    type: genComponentType.collections,
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'menu',
    type: genComponentType.collections,
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'message',
    type: genComponentType.collections,
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'table',
    type: genComponentType.collections,
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'ad',
    type: genComponentType.views,
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'card',
    type: genComponentType.views,
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'comment',
    type: genComponentType.views,
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'feed',
    type: genComponentType.views,
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'item',
    type: genComponentType.views,
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'statistic',
    type: genComponentType.views,
    boolProps: [],
    enumProps: [
    ]
  },
];

export var genData: { [name: string]: genComponent; } = {};

function genInit() {
  codeData.forEach(c => { if (c.type == undefined) c.type = genComponentType.elements; })
  codeData = codeData.sort((a, b) => {
    if (a.type != b.type) return a.type > b.type ? 1 : -1;
    return a.name.localeCompare(b.name);
  });
  codeData.forEach(c => genData[c.name] = c);
}

genInit();