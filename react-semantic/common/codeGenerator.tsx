import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as g from './sourceForGenerated';

export const CodeGenerator: React.StatelessComponent<any> = dt => {
  return <div>
    {g.source.codeData.filter(cd => !cd.locked).map(cd => [
      '############', `${g.genComponentType[cd.type]}\\${cd.name}`, <br/>,
      ComponentGen(g.genData[cd.name]),
      '############', `doc\\${g.genComponentType[cd.type]}\\${cd.name}`, <br/>,
      ComponentTestGen(g.genData[cd.name]),
    ]
    ) }
    {UsesExport(UsesExportType.exports) }
    {UsesExport(UsesExportType.generatedExports) }
    {UsesExport(UsesExportType.import) }
    {UsesExport(UsesExportType.exports) }
  </div>
};

export const CodeGenerator2: React.StatelessComponent<any> = dt => {
  let commonEnums = g.source.enums.map(en => en.name + ', ').join('');
  return <div>
    <pre>
      {`import * as React from 'react';
import * as ui from './lib';
import {icon, flag, flagShort} from './largeEnums';

//********* This code is generated - do not modify it!

//content for "import {} from '???/exports"'
/*
  icon, flag, flagShort, ${commonEnums}`}
      {UsesExport(UsesExportType.import) }
      {`*/

//content for "export {} from '/.generated"'
/*
export {
  animate, animateTo, ${commonEnums}`}
      {UsesExport(UsesExportType.generatedExports) }
{`} from './generated';
*/

export interface IPropsIconProp {}
`}
      {g.source.enums.map(en => EnumDef(en)) }
    </pre>
    {g.source.codeData.map(cd => ComponentGenLow(g.genData[cd.name])) }
  </div>
};

//*********************************** Uses
export const enum UsesExportType { generatedExports, exports, import, test }

function UsesExport(type: UsesExportType) {
  function myEnums(c: g.genComponent) {
    var res = c.enumProps.filter(e => !e.isSystem).map(e => ', ' + e.name);
    return res.join('');
  }
  let join = '';
  var res = g.source.codeData.map(c => {
    switch (type) {
      case UsesExportType.exports: join = '\r\n'; return `export {${up(c.name)}, ${up(c.name)}Props${myEnums(c)}} from './${tp(c)}/${c.name}';
export {${up(c.name)}Test} from './${tp(c)}/${c.name}Test';`;
      case UsesExportType.import: join = ',\r\n'; return `  ${up(c.name)}${myEnums(c)}`;
      case UsesExportType.test: join = ', '; return `${up(c.name)}Test`;
      case UsesExportType.generatedExports: join = '\r\n'; return `  ${c.autoTag ? up(c.name) + ', ' : ''}${up(c.name)}Props${myEnums(c)},`;
    }
  });
  return <pre>{res.join(join) }</pre>;
}

//*********************************** ComponentTestGen
function ComponentTestGen(comp: g.genComponent) {
  return <pre>{
    `import * as React from 'react';

import {
  color, size, floated, icon,
  Button, ButtonAnimated, ButtonLabeled, ButtonIcon, Buttons, ButtonSocial, social, attachedButton, animate, iconLabel, eqWidth,
  Label, Labels, pointing, corner, attachedLabel, ribbon,
  Icon, Icons, 
  Segment, Segments, raised, attachedSegment, padded, emphasis, aligned, raisedSegments,
`}
    {UsesExport(UsesExportType.import) }
    {`
} from '../exports';

import * as ui from '../exports';

export const ${up(comp.name)}Test: ui.StatelessComponent<ui.IProps> = props => {
  return <div>
    <h1>${up(comp.name)}</h1>
    <${up(comp.name)}>
    </${up(comp.name)}>
  </div>;
}
`}
  </pre>;
}

//*********************************** ComponentGen
function ComponentGen(comp: g.genComponent) {

  return <pre>{
    `import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ui from '../exports';
`}
    {/*<ComponentGenLow comp={comp}/>*/}
    {`
export const ${up(comp.name)}: ui.StatelessComponent<${up(comp.name)}Props> = pr => {
  var props = ui.enumValToProp(pr);
  var rest = ui.propsToClasses(['ui ${comp.name}'], ui.projection(props, ${comp.name}PropsDescr));
  return React.createElement('div', rest);
}

`}
  </pre>;
};

function ComponentGenLow(comp: g.genComponent): JSX.Element {
  let enumDef = comp.enumProps.filter(en => !en.isSystem).map(en => EnumDef(en))
  function enumPropsType(enumProps: Array<g.genEnumProp>): string {
    //var res = enumProps.map(en => ', ' + (en.isSystem ? `IProps${up(en.name)}` : `IProps${up(en.name)}Prop`));
    var res = enumProps.map(en => `, IProps${up(en.name)}Prop`);
    return res.join('');
  }
  function enumProp(pr: g.genEnumProp, isMeta: boolean): string {
    return isMeta ?
      `    $${enumPropName(pr)}: new ui.enumConverter<${en(pr)}>(${en(pr)}, val.$${enumPropName(pr)})` :
      `  $${enumPropName(pr)}?: ${en(pr)};`;
  }
  function boolProp(pr: g.genBoolProp, isMeta: boolean): string {
    var meta = '';
    if (pr.ignore) meta += ', true'; if (!pr.ignore && pr.alias) meta += ', false';
    if (pr.alias) meta += ', \'' + pr.alias + '\'';
    return isMeta ?
      `    $${pr.name}: new ui.boolConverter(val.$${pr.name}${meta})` :
      `  $${pr.name}?: boolean;`;
  }
  let enumProps = comp.enumProps.map(en => { });
  let boolProps = comp.boolProps.map(en => { });
  let enumMeta = comp.enumProps.map(en => { });
  let boolMeta = comp.boolProps.map(en => { });
  return <pre>
    {`
//**************************************************************
//*   ${comp.name.toUpperCase()}
//**************************************************************`}
    {comp.otherCode ? comp.otherCode : ''}
    {enumDef}
    {`    
export interface ${up(comp.name)}Props extends ${comp.inheritsFrom ? up(comp.inheritsFrom) + 'Props' : 'ui.IProps'}${enumPropsType(comp.enumProps)} {
`}
    {comp.enumProps.map(en => enumProp(en, false)).concat(comp.boolProps.map(en => boolProp(en, false))).join('\r\n') + '\r\n'}
    {comp.otherProps ? comp.otherProps + '\r\n' : ''}
    {`}

export var ${comp.name}PropsDescr = ui.createDescr<${up(comp.name)}Props>(val => {
  return {
`}
    {comp.enumProps.map(en => enumProp(en, true)).concat(comp.boolProps.map(en => boolProp(en, true))).join(',\r\n') + '\r\n' }
    {comp.otherPropDescr ? comp.otherPropDescr : ''}
    {`  };
}${comp.inheritsFrom ? ', ' + comp.inheritsFrom + 'PropsDescr' : ''});`}

    {!comp.autoTag ? '' : `

export const ${up(comp.name)}: ui.StatelessComponent<${up(comp.name)}Props> = pr => {
  var props: ${up(comp.name)}Props = ui.enumValToProp(pr, ${comp.name}PropsDescr);
  var rest = ui.propsToClasses([${comp.autoClass}], ui.projection(props, ${comp.name}PropsDescr));
  return React.createElement(${comp.autoTag}, rest, pr.children);
}

`}

  </pre>;
};

function enumPropName(pr: g.genEnumProp): string { return pr.aliasPropName ? pr.aliasPropName : up(pr.name); }

//****************************************
function EnumDef(en: g.genEnumProp) {
  function item(val: Array<string>, isProp: boolean) {
    var arr = val.slice(0);
    for (var i = 1; i < arr.length; i++) {
      var parts = arr[i].split('=');
      arr[i] = '$' + parts[0] + (isProp || parts.length==1 ? '' : ' = ' + parts[1]);
    }
    var arr = isProp ? arr.slice(1) : arr;
    let res: Array<String> = arr.map(val => isProp ? `${val}?: boolean; ` : `${val}, `);
    return res.join('')
  };
  return <pre>{`
export enum ${en.name} { ${item(en.values, false)}}
ui.registerEnum(${en.name}, '$${enumPropName(en)}'${en.alias ? en.alias : ''});
export interface IProps${up(en.name)}Prop { ${item(en.values, true)}}
`}
  </pre>;
};

function en(pr: g.genEnumProp): string { return /*(pr.isSystem ? 'ui.' : '') +*/ pr.name; }
function up(val: string): string { return val[0].toUpperCase() + val.substr(1); }
function tp(comp: g.genComponent): string { return g.genComponentType[comp.type]; }

