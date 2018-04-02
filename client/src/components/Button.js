import React from 'react'
import { Button } from 'semantic-ui-react'

const ButtonEx = (props) => (
  <Button onClick={props.clicked}>{props.name}</Button>
)

export default ButtonEx
