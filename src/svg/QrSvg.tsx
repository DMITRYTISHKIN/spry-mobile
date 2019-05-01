import React from 'react'
import Svg, { Path } from 'react-native-svg'

const QrSvgComponent = props => (
  <Svg width={35} height={35} fill="none" {...props}>
    <Path stroke="#007AFF" strokeWidth={2} d="M1 1h10.115v10.115H1z" />
    <Path fill="#007AFF" d="M4.039 4.038h4.038v4.038H4.039z" />
    <Path stroke="#007AFF" strokeWidth={2} d="M1 23.885h10.115V34H1z" />
    <Path fill="#007AFF" d="M4.039 26.923h4.038v4.038H4.039z" />
    <Path
      stroke="#007AFF"
      strokeWidth={2}
      d="M23.884 1h10.115v10.115H23.884z"
    />
    <Path
      fill="#007AFF"
      d="M26.923 4.038h4.038v4.038h-4.038zM14.808 0H17.5v2.692h-2.692zM14.808 21.538H17.5v2.692h-2.692zM17.5 32.308h2.692V35H17.5zM32.308 32.308H35V35h-2.692zM22.884 24.231h2.692v2.692h-2.692zM25.577 26.923h2.692v5.385h-2.692zM22.884 29.615h2.692V35h-2.692zM14.808 26.923H17.5v5.385h-2.692zM17.5 2.692h2.692v5.385H17.5zM17.5 10.769h2.692v4.038H17.5z"
    />
    <Path
      fill="#007AFF"
      d="M17.5 24.231h5.385v5.385H17.5zM28.269 24.231H35v5.385h-6.731zM14.808 5.385H17.5v5.385h-2.692zM0 14.808h2.692V17.5H0zM2.692 17.5h5.385v2.692H2.692zM20.192 17.5h4.038v2.692h-4.038zM10.769 17.5H17.5v2.692h-6.731zM26.923 17.5H35v2.692h-8.077zM22.884 21.538h9.423v2.692h-9.423zM5.385 14.808h21.538V17.5H5.385zM29.616 14.808h2.692V17.5h-2.692z"
    />
  </Svg>
)

export default QrSvgComponent
