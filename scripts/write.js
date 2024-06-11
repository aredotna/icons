// @ts-check

"use strict"

const path = require("path")
const { transform } = require("@svgr/core")
const { upperFirst, camelCase } = require("lodash")
const { parse } = require("svg-parser")

const SVG_STYLE = {
  position: "absolute",
  top: "0",
  right: "0",
  bottom: "0",
  left: "0",
  width: "100%",
  height: "100%",
}

const getReactSource = ({ componentName, svgSource }) => {
  const svgAsJsx = transform.sync(svgSource, {
    expandProps: false,
    svgProps: { style: `{svgStyle}`, fill: "currentColor" },
    // @ts-ignore
    template: ({ jsx }) => jsx,
  })

  return `
import * as React from "react";

const ${componentName} = () => {
  const svgStyle: React.CSSProperties = {...${JSON.stringify(SVG_STYLE)}};
  return ${svgAsJsx}
};

${componentName}.displayName = '${componentName}';

export default ${componentName};
`
}

const getIndexSource = ({ iconFiles }) => `
console.warn("For internal use only. Import from the individual files rather than from the index.");
export const ICONS = ${JSON.stringify(
  iconFiles.map(({ fileName, componentName, width, height }) => ({
    fileName,
    componentName,
    width,
    height,
  }))
)};

${iconFiles
  .map(
    ({ fileName, componentName }) =>
      `export { default as ${componentName} } from './${fileName}'`
  )
  .join("\n")}
`

const write = ({ svgs }) => {
  const iconFiles = svgs.map(svg => {
    const name = path.basename(svg.path).replace(".svg", "")
    const componentName = `${upperFirst(camelCase(name))}Icon`
    const fileName = componentName

    const [node] = parse(svg.source).children

    if (node.type === "text") return

    const viewBox = node.properties?.viewBox
    const [_x, _y, width, height] = `${viewBox}`
      .split(" ")
      .map(n => parseInt(n, 10))

    const source = getReactSource({
      componentName,
      svgSource: svg.source,
    })

    return {
      filepath: `${fileName}.tsx`,
      source,
      componentName,
      fileName,
      width,
      height,
    }
  })

  return [
    { filepath: "allIcons.ts", source: getIndexSource({ iconFiles }) },
    ...iconFiles,
  ]
}

module.exports = write
