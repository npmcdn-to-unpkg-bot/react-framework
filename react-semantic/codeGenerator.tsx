import * as React from 'react';
import * as ReactDOM from 'react-dom';

enum componentType {views, collections, elements}

export var codeData: Array<component> = [
  {
    name: 'flag',
    boolProps: ['boolTest'],
    enumProps: [
      //{ name: 'enumTest', values: ['val1', 'val2'], alias: `, {$val2: 'xxx'}` },
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
    type: componentType.collections,
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'form',
    type: componentType.collections,
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'grid',
    type: componentType.collections,
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'menu',
    type: componentType.collections,
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'message',
    type: componentType.collections,
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'table',
    type: componentType.collections,
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'ad',
    type: componentType.views,
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'card',
    type: componentType.views,
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'comment',
    type: componentType.views,
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'feed',
    type: componentType.views,
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'item',
    type: componentType.views,
    boolProps: [],
    enumProps: [
    ]
  },
  {
    name: 'statistic',
    type: componentType.views,
    boolProps: [],
    enumProps: [
    ]
  },
];


codeData.forEach(c => { if(c.type==undefined) c.type = componentType.elements;})
codeData = codeData.sort((a, b) => { 
  if (a.type!=b.type) return a.type>b.type ? 1 : -1;
  return a.name.localeCompare(b.name); 
});

export const CodeGenerator: React.StatelessComponent<any> = dt => {
  return <div>
      {codeData.map(cd => [
        '############', cd.name, <br/>,
        <ComponentGen comp={genData[cd.name]}/>,
        '############', cd.name + 'Test', <br/>,
        <ComponentTestGen comp={genData[cd.name]}/>
      ]
      ) }
      <UsesExport type={0}/><br/>
      <UsesExport type={1}/><br/>
      <UsesExport type={2}/><br/>
  </div>
};

//*********************************

interface component {
  name: string;
  type?: componentType;
  boolProps: Array<string>;
  enumProps: Array<enumProp>;
}

interface boolProp {
  name: string;
}

interface enumProp {
  name: string;
  values?: Array<string>;
  isSystem?: boolean;
  alias?: string;
}

//*********************************** Uses
export const enum UsesExportType { exports, import, test }
export const UsesExport: React.StatelessComponent<{ type: UsesExportType; }> = dt => {
  function myEnums(c: component) {
    var res = c.enumProps.filter(e => !e.isSystem).map(e => ', ' + e.name);
    return res.join('');
  }
  let join = '';
  var res = codeData.map(c => {
    switch (dt.type) {
      case UsesExportType.exports: join = '\r\n'; return `export {${up(c.name)}, ${up(c.name)}Props${myEnums(c)}} from './${tp(c)}/${c.name}';
export {${up(c.name)}Test} from './${tp(c)}/${c.name}Test';`;
      case UsesExportType.import: join = ',\r\n'; return `  ${up(c.name)}${myEnums(c)}`;
      case UsesExportType.test: join = ', '; return `${up(c.name)}Test`;
    }
  });
  return <pre>{res.join(join) }</pre>;
}

//*********************************** ComponentTestGen
export const ComponentTestGen: React.StatelessComponent<{ comp: component; }> = dt => {
  return <pre>{
`import * as React from 'react';

import {
  color, size,
  Button, ButtonAnimated, ButtonLabeled, ButtonIcon, Buttons, ButtonSocial, state, social, floated, attachedButton, animate, iconLabel, eqWidth,
  Label, Labels, pointing, corner, attachedLabel, circular, ribbon,
  Icon, Icons, icon,
  Segment, Segments, raised, attachedSegment, padded, emphasis, aligned, raisedSegments,
`}
    <UsesExport type={1}/>
 {`
} from '../exports';

import * as ui from '../exports';

export const ${up(dt.comp.name)}Test: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>${up(dt.comp.name)}</h1>
    <${up(dt.comp.name)}>
    </${up(dt.comp.name)}>
  </div>;
}
`}
    </pre>;
}

//*********************************** ComponentGen
export const ComponentGen: React.StatelessComponent<{ comp: component; }> = dt => {
  var comp = dt.comp;
  let enumDef = comp.enumProps.filter(en => !en.isSystem).map(en => <EnumDef enum={en}/>)
  function enumPropsType(enumProps: Array<enumProp>): string {
    var res = enumProps.map(en => ', ' + (en.isSystem ? `ui.IProps${up(en.name)}` : `IProps${up(en.name)}Prop`));
    return res.join('');
  }
  function enumProp(pr: enumProp, isMeta: boolean): string {
    return isMeta ?
      `    $${up(pr.name)}: new ui.enumConverter<${en(pr)}>(${en(pr)}, val.$${up(pr.name)})` :
      `  $${up(pr.name)}?: ${en(pr)};`;
  }
  function boolProp(pr: string, isMeta: boolean): string {
    return isMeta ?
      `    $${pr}: new ui.boolConverter(val.$${pr})` :
      `  $${pr}?: boolean;`;
  }
  let enumProps = comp.enumProps.map(en => { });
  let boolProps = comp.boolProps.map(en => { });
  let enumMeta = comp.enumProps.map(en => { });
  let boolMeta = comp.boolProps.map(en => { });
  return <pre>{
    `import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';
`}
    {enumDef}
    {`    
export interface ${up(comp.name)}Props extends ui.IProps${enumPropsType(comp.enumProps)} {
`}
    {comp.enumProps.map(en => enumProp(en, false)).concat(comp.boolProps.map(en => boolProp(en, false))).join('\r\n') + '\r\n'}
    {`}

var ${comp.name}PropsDescr = ui.createDescr<${up(comp.name)}Props>(val => {
  return {
`}
    {comp.enumProps.map(en => enumProp(en, true)).concat(comp.boolProps.map(en => boolProp(en, true))).join(',\r\n') + '\r\n' }
    {`  };
});

export const ${up(comp.name)}: ui.StatelessComponent<${up(comp.name)}Props> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui ${comp.name}'], ui.projection(props, ${comp.name}PropsDescr));
  return React.createElement('div', rest);
}

`}
  </pre>;
};

//****************************************
const EnumDef: React.StatelessComponent<{ enum: enumProp; }> = dt => {
  var en = dt.enum;
  function item(val: Array<string>, isProp: boolean) {
    var arr = val.slice(0);
    for (var i = 1; i < arr.length; i++) arr[i] = '$' + arr[i];
    var arr = isProp ? arr.slice(1) : arr;
    let res: Array<String> = arr.map(val => isProp ? `${val}?: boolean; ` : `${val}, `);
    return res.join('')
  };
  return <pre>{`
export enum ${en.name} { ${item(dt.enum.values, false)}}
ui.registerEnum(${en.name}, '$${up(en.name)}'${en.alias});
export interface IProps${up(en.name)}Prop { ${item(dt.enum.values, true)}}
`}
  </pre>;
};

function en(pr: enumProp): string { return (pr.isSystem ? 'ui.' : '') + pr.name; }
function up(val: string): string { return val[0].toUpperCase() + val.substr(1); }
function tp(comp:component): string { return componentType[comp.type]; }

export var genData: { [name: string]: component; } = {};
codeData.forEach(c => genData[c.name] = c);
