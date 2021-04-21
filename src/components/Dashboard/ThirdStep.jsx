import { makeStyles } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function ThirdStep() {
  const classes = useStyles()
  const dispatch = useDispatch
  return <div className={classes.stepContainer}></div>
}

const useStyles = makeStyles((theme) => ({
  stepContainer: {
    borderLeft: '2px solid #ff9900',
    padding: '0 50px',
    marginTop: 33,
    marginLeft: 60,
  },
}))
