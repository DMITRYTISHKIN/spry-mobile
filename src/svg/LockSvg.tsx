import React from 'react'
import Svg, { Path } from 'react-native-svg'

const LockSvgComponent = props => (
  <Svg width={26} height={30} fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 27.5C0 28.881 1.125 30 2.514 30H22.62a2.506 2.506 0 0 0 2.514-2.5V15c0-1.381-1.125-2.5-2.514-2.5H7.541V8.125c0-2.762 2.25-5 5.027-5s5.027 2.238 5.027 5V12.5h3.142V8.125c0-4.487-3.658-8.125-8.17-8.125C8.056 0 4.4 3.638 4.4 8.125V12.5H2.514A2.506 2.506 0 0 0 0 15v12.5zm10.054-8.125c0-1.381 1.125-2.5 2.514-2.5a2.506 2.506 0 0 1 2.513 2.5c0 .881-.459 1.657-1.15 2.1 0 0 .246 1.476.522 3.213a.939.939 0 0 1-.943.937h-1.885a.939.939 0 0 1-.943-.937l.522-3.213a2.494 2.494 0 0 1-1.15-2.1z"
      fill="red"
    />
  </Svg>
)

export default LockSvgComponent
