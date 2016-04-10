import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactMDL from 'react-mdl';

interface IProp {
  type: string;
  value: Array<string> | Array<IProp>;
  required: boolean;
}
function propToType(type: string): string {
  switch (type) {
    case 'string': return 'string';
    case 'number': return 'number';
    case 'bool': return 'boolean';
    //case 'element': return 'React.Element';
    //case 'func': return 'Function';
    case 'node': return 'React.ReactElement<any>';
    case 'object': return '{}';
    default: return 'any';
  }
}


var exportsCode = 'exports.Tooltip = exports.Textfield = exports.TabBar = exports.Tab = exports.Tabs = exports.Switch = exports.Spinner = exports.Snackbar = exports.Slider = exports.RadioGroup = exports.Radio = exports.ProgressBar = exports.MenuItem = exports.Menu = exports.ListItemContent = exports.ListItemAction = exports.ListItem = exports.List = exports.Content = exports.Navigation = exports.Spacer = exports.HeaderTabs = exports.HeaderRow = exports.Drawer = exports.Header = exports.Layout = exports.IconToggle = exports.IconButton = exports.Icon = exports.Cell = exports.Grid = exports.FooterLinkList = exports.FooterDropDownSection = exports.FooterSection = exports.Footer = exports.FABButton = exports.DialogActions = exports.DialogContent = exports.DialogTitle = exports.Dialog = exports.TableHeader = exports.Table = exports.DataTable = exports.Checkbox = exports.CardMenu = exports.CardText = exports.CardMedia = exports.CardActions = exports.CardTitle = exports.Card = exports.Button = exports.Badge = exports.MDLComponent = exports.mdlUpgrade';
var components = exportsCode.split(' = ').map(e => e.substr('exports.'.length));
components = components.filter(c => c != 'MDLComponent' && c != 'mdlUpgrade' && c != 'DataTable').sort();
var functionProps: Array<string> = [];
var compProps = components.map(c => {
  var props = ReactMDL[c]['propTypes'];
  switch (c) {
    case 'FABButton':
    case 'IconButton':
      var inherit = ReactMDL['Button']['propTypes'];
      Object.assign(inherit, props);
      props = inherit;
      break;
  }
  if (c == 'TableHeaderProps') { debugger; }
  var propTxt: Array<string> = [];
  for (let p in props) {
    //if (p == 'children') continue;
    if ((c == 'Radio' || c == 'RadioGroup') && p == 'value') continue; //{ propTxt.push('    value: string | number;'); continue; }
    if (c == 'Table' && p == 'rows') { propTxt.push('    rows: Array<{}>;'); continue; }
    if (c == 'TableHeader' && p == 'onClick') { propTxt.push('    onClick?: React.MouseEventHandler;'); continue; }
    if (c == 'Table' && (p == 'columns' || p == 'data')) continue;
    var val: IProp = props[p];
    if (val && val['isRequired']) delete val['isRequired'];
    var prop: string = '    ' + p;
    if (!val.required) prop += '?';
    prop += ': ';
    if (p == 'component') prop += 'Component';
    else if (p == 'children') prop += 'Children';
    else switch (val.type) {
        case 'oneOfType': prop += (val.value as Array<IProp>).filter(v => v.type != 'element').map(v => propToType(v.type)).join(' | '); break;
        case 'oneOf': prop += (val.value as Array<string>).map(s => "'" + s + "'").join(' | '); break;
        case 'func':
          switch (c + '.' + p) {
            case 'TableHeader.cellFormatter':
              prop += '(val:string, row: any, rowIndex:number) => string'; break;
            case 'TableHeader.sortFn':
              prop += '(a:string, b:string, isAsc:boolean) => number'; break;
            case 'Snackbar.onTimeout':
            case 'Dialog.onCancel':
              prop += '() => void'; break;
            case 'Tab.onTabClick':
            case 'TabBar.onChange':
            case 'Tabs.onChange':
            case 'HeaderTabs.onChange':
              prop += '(tabId:string) => void'; break;
            case 'TableHeader.onClick':
              prop += '(ev:Event, tabId:string) => void'; break;
            default:
              prop += '(ev:Event) => void'; break;
          }
          break;
        default: prop += propToType(val.type); break;
      }
    prop += ';'
    propTxt.push(prop);
    if (val.type == 'func') functionProps.push(`${c}.${p}`);
  }
  //var ancestor = c == 'Table' ? 'React.DOMAttributes' : 'HTMLAttributes'; 
  var ancestor = 'HTMLAttributes'; 
  return `
  //---------- ${c}
  export interface ${c}Props extends ${ancestor} {
${propTxt.join('\r\n')}
  }
  export class ${c} extends React.Component<${c}Props, {}> { }
`;
});

var ts = compProps.join('\r\n');

function code() {
  return `
declare module "react-mdl" {
  import * as React from 'react';
  type Component = string | Function | React.ReactElement<any>;
  type Children = string | Element;

${ts}

${reactCopy}
}
`}

/*
${functionProps.join('\r\n')}
*/

var ReactPropTypes = {
  array: { type: 'array', isRequired: { type: 'array', required: true } },
  bool: { type: 'bool', isRequired: { type: 'bool', required: true } },
  func: { type: 'func', isRequired: { type: 'func', required: true } },
  number: { type: 'number', isRequired: { type: 'number', required: true } },
  object: { type: 'object', isRequired: { type: 'object', required: true } },
  string: { type: 'string', isRequired: { type: 'string', required: true } },
  element: { type: 'element', isRequired: { type: 'element', required: true } },
  node: { type: 'node', isRequired: { type: 'node', required: true } },

  oneOf: function (arr) { return { type: 'oneOf', value: arr }; },
  oneOfType: function (arr) { return { type: 'oneOfType', value: arr }; },
  arrayOf: function (arr) { return { type: 'arrayOf' }; },

  any: function (arr) { return { type: 'any', value: 'error' }; },
  instanceOf: function (arr) { return { type: 'instanceOf', value: 'error' }; },
  objectOf: function (arr) { return { type: 'objectOf', value: 'error' }; },
  shape: function (arr) { return { type: 'shape', value: 'error' }; }
};

export function init() {
  ReactDOM.render(<pre><code>{code()}</code></pre>, document.getElementById('app'));
}

var reactCopy = `
  //There is a collision in react-mdl x React.HTML&DOM atributes. 
  //So I removed those atributes from React definition and leave them in correct MDL form: onChange, label, size, title, value, rows
  interface DOMAttributes {
    children?: React.ReactNode;
    dangerouslySetInnerHTML?: {
      __html: string;
    };

    // Clipboard Events
    onCopy?: React.ClipboardEventHandler;
    onCut?: React.ClipboardEventHandler;
    onPaste?: React.ClipboardEventHandler;

    // Composition Events
    onCompositionEnd?: React.CompositionEventHandler;
    onCompositionStart?: React.CompositionEventHandler;
    onCompositionUpdate?: React.CompositionEventHandler;

    // Focus Events
    onFocus?: React.FocusEventHandler;
    onBlur?: React.FocusEventHandler;

    // Form Events
    //onChange?: React.FormEventHandler;
    onInput?: React.FormEventHandler;
    onSubmit?: React.FormEventHandler;

    // Image Events
    onLoad?: React.ReactEventHandler;
    onError?: React.ReactEventHandler; // also a Media Event

    // Keyboard Events
    onKeyDown?: React.KeyboardEventHandler;
    onKeyPress?: React.KeyboardEventHandler;
    onKeyUp?: React.KeyboardEventHandler;

    // Media Events
    onAbort?: React.ReactEventHandler;
    onCanPlay?: React.ReactEventHandler;
    onCanPlayThrough?: React.ReactEventHandler;
    onDurationChange?: React.ReactEventHandler;
    onEmptied?: React.ReactEventHandler;
    onEncrypted?: React.ReactEventHandler;
    onEnded?: React.ReactEventHandler;
    onLoadedData?: React.ReactEventHandler;
    onLoadedMetadata?: React.ReactEventHandler;
    onLoadStart?: React.ReactEventHandler;
    onPause?: React.ReactEventHandler;
    onPlay?: React.ReactEventHandler;
    onPlaying?: React.ReactEventHandler;
    onProgress?: React.ReactEventHandler;
    onRateChange?: React.ReactEventHandler;
    onSeeked?: React.ReactEventHandler;
    onSeeking?: React.ReactEventHandler;
    onStalled?: React.ReactEventHandler;
    onSuspend?: React.ReactEventHandler;
    onTimeUpdate?: React.ReactEventHandler;
    onVolumeChange?: React.ReactEventHandler;
    onWaiting?: React.ReactEventHandler;

    // MouseEvents
    onClick?: React.MouseEventHandler;
    onContextMenu?: React.MouseEventHandler;
    onDoubleClick?: React.MouseEventHandler;
    onDrag?: React.DragEventHandler;
    onDragEnd?: React.DragEventHandler;
    onDragEnter?: React.DragEventHandler;
    onDragExit?: React.DragEventHandler;
    onDragLeave?: React.DragEventHandler;
    onDragOver?: React.DragEventHandler;
    onDragStart?: React.DragEventHandler;
    onDrop?: React.DragEventHandler;
    onMouseDown?: React.MouseEventHandler;
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
    onMouseMove?: React.MouseEventHandler;
    onMouseOut?: React.MouseEventHandler;
    onMouseOver?: React.MouseEventHandler;
    onMouseUp?: React.MouseEventHandler;

    // Selection Events
    onSelect?: React.ReactEventHandler;

    // Touch Events
    onTouchCancel?: React.TouchEventHandler;
    onTouchEnd?: React.TouchEventHandler;
    onTouchMove?: React.TouchEventHandler;
    onTouchStart?: React.TouchEventHandler;

    // UI Events
    onScroll?: React.UIEventHandler;

    // Wheel Events
    onWheel?: React.WheelEventHandler;
  }

  interface HTMLAttributes extends DOMAttributes {
    // React-specific Attributes
    defaultChecked?: boolean;
    defaultValue?: string | string[];

    // Standard HTML Attributes
    accept?: string;
    acceptCharset?: string;
    accessKey?: string;
    action?: string;
    allowFullScreen?: boolean;
    allowTransparency?: boolean;
    alt?: string;
    async?: boolean;
    autoComplete?: string;
    autoFocus?: boolean;
    autoPlay?: boolean;
    capture?: boolean;
    cellPadding?: number | string;
    cellSpacing?: number | string;
    charSet?: string;
    challenge?: string;
    checked?: boolean;
    classID?: string;
    className?: string;
    cols?: number;
    colSpan?: number;
    content?: string;
    contentEditable?: boolean;
    contextMenu?: string;
    controls?: boolean;
    coords?: string;
    crossOrigin?: string;
    data?: string;
    dateTime?: string;
    default?: boolean;
    defer?: boolean;
    dir?: string;
    disabled?: boolean;
    download?: any;
    draggable?: boolean;
    encType?: string;
    form?: string;
    formAction?: string;
    formEncType?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    frameBorder?: number | string;
    headers?: string;
    height?: number | string;
    hidden?: boolean;
    high?: number;
    href?: string;
    hrefLang?: string;
    htmlFor?: string;
    httpEquiv?: string;
    icon?: string;
    id?: string;
    inputMode?: string;
    integrity?: string;
    is?: string;
    keyParams?: string;
    keyType?: string;
    kind?: string;
    //label?: string;
    lang?: string;
    list?: string;
    loop?: boolean;
    low?: number;
    manifest?: string;
    marginHeight?: number;
    marginWidth?: number;
    max?: number | string;
    maxLength?: number;
    media?: string;
    mediaGroup?: string;
    method?: string;
    min?: number | string;
    minLength?: number;
    multiple?: boolean;
    muted?: boolean;
    name?: string;
    nonce?: string;
    noValidate?: boolean;
    open?: boolean;
    optimum?: number;
    pattern?: string;
    placeholder?: string;
    poster?: string;
    preload?: string;
    radioGroup?: string;
    readOnly?: boolean;
    rel?: string;
    required?: boolean;
    reversed?: boolean;
    role?: string;
    //rows?: number;
    rowSpan?: number;
    sandbox?: string;
    scope?: string;
    scoped?: boolean;
    scrolling?: string;
    seamless?: boolean;
    selected?: boolean;
    shape?: string;
    //size?: number;
    sizes?: string;
    span?: number;
    spellCheck?: boolean;
    src?: string;
    srcDoc?: string;
    srcLang?: string;
    srcSet?: string;
    start?: number;
    step?: number | string;
    style?: React.CSSProperties;
    summary?: string;
    tabIndex?: number;
    target?: string;
    //title?: string;
    type?: string;
    useMap?: string;
    //value?: string | string[];
    width?: number | string;
    wmode?: string;
    wrap?: string;

    // RDFa Attributes
    about?: string;
    datatype?: string;
    inlist?: any;
    prefix?: string;
    property?: string;
    resource?: string;
    typeof?: string;
    vocab?: string;

    // Non-standard Attributes
    autoCapitalize?: string;
    autoCorrect?: string;
    autoSave?: string;
    color?: string;
    itemProp?: string;
    itemScope?: boolean;
    itemType?: string;
    itemID?: string;
    itemRef?: string;
    results?: number;
    security?: string;
    unselectable?: boolean;

    // Allows aria- and data- Attributes
    [key: string]: any;
  }
`;