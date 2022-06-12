import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import moment, { now } from 'moment'

function Timer({ interval, style }){
  const pad = (n) => n < 10 ? '0' + n : n
  const duration = moment.duration(interval)
  const centiseconds = Math.floor(duration.milliseconds() / 10)
  return (
      <View style={styles.timerContainer}>
        <Text style={style}>{pad(duration.minutes())}:</Text>
        <Text style={style}>{pad(duration.seconds())},</Text>  
        <Text style={style}>{pad(centiseconds)}</Text>
      </View>
  )
}

function RoundButton({ title, color, background, onPress, disabled }) {
  return (
    <TouchableOpacity 
      onPress={ () => !disabled && onPress() }
      style={[ styles.button ,{backgroundColor:background} ]}
      activeOpacity={disabled ? 1 :  0.4}
    >
      <View style={styles.buttonBorder}>
        <Text style={[ styles.buttonTitle, {color}]}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

function Lap({number, interval, fastest, slowest }) {
  const lapStyle = [
    styles.lapText,
    fastest && styles.fastest,
    slowest && styles.slowest,
  ]
  
  return(<View style={styles.lap}>
    <Text style={lapStyle}>Lap {number}</Text>
    <Timer style={ lapStyle } interval={interval}/>
  </View>)
}

function LapsTable({ laps, timer }) {
  const finishedLaps = laps.slice(1)
  let min = Number.MAX_SAFE_INTEGER
  let max = Number.MIN_SAFE_INTEGER
  if (finishedLaps.length >= 2) {
    finishedLaps.forEach(lap => {
      if (lap < min ) min = lap
      if (lap > max) max = lap
    });
  }
  return(
    <ScrollView style={styles.scrollView}>
      {laps.map((lap, index) =>
        <Lap 
          number={laps.length - index} 
          key={laps.length - index} 
          interval={index === 0 ? timer + lap : lap}
          fastest={lap === min}
          slowest={lap === max}
        />
      )}
    </ScrollView>
  )
}

function ButtonsRow({children}) {
  return(
    <View style={styles.buttonsRow}>{children}</View>
  )
}

export default class App extends Component{
  constructor(props) {
      super(props)
      this.state = {
      start: 0,
      now: 0,
      laps: [  ],
    }
  }

  start = () => {
    const now = new Date().getTime()
    this.setState({
      start: now,
      now,
      laps: [0],
    })
    this.timer = setInterval(() => {
      this.setState({now: new Date().getTime()})
    }, 100)
  }

  lap = () => {
    const timesTamp = new Date().getTime()
    const { laps, now, start } = this.state
    const [fistLap, ... othet] = laps

    this.setState({
      laps: [0, fistLap + now - start, ... laps],
      start: timesTamp,
      now: timesTamp
    })
  }

  render(){
    const { now, start, laps } = this.state
    const timer = now - start

    return(
      <View style={[styles.container]}>
        <Timer interval={timer} style={styles.timer}/>

        {laps.length === 0 && (
          <ButtonsRow>
            <RoundButton title='Reset' color='#FFFFFF' background='#3D3D3D'/>

            <RoundButton 
              title='Start' 
              color='#50D167' 
              background='#1B361F'
              onPress={this.start}
            />
          </ButtonsRow>
        )} 

        {start > 0 && (
          <ButtonsRow>
            <RoundButton 
              title='Lap' 
              color='#FFFFFF' 
              background='#3D3D3D'
              onPress={this.lap}
            />

            <RoundButton 
              title='Stop' 
              color='#E33935' 
              background='#3C1715'
              onPress={this.stop}
            />
          </ButtonsRow>
        )}

        <LapsTable laps={laps} timer={timer}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    paddingTop: 130,
    paddingHorizontal:20,
  },

  timer:{
    color: 'white',
    fontSize:70,
    fontWeight: '200',
    width: 95,
  },

  button:{
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent:'center',
    alignItems:'center',
  },

  buttonTitle:{
    fontSize:17,
  },

  buttonBorder:{
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    justifyContent:'center',
    alignItems:'center',
  },

  buttonsRow:{
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent:'space-between',
    marginTop: 70,
    marginBottom: 30,
  },

  lapText:{
    color: 'white',
    fontSize: 17,
    width: 28,
  },

  lap: {
    flexDirection:'row',
    justifyContent: 'space-between',
    borderColor: '#151515',
    borderTopWidth: 1,
    paddingVertical: 10,
  },

  scrollView:{
    alignSelf: 'stretch'
  },

  fastest:{
    color: '#4BC05F',
  },  

  slowest:{
    color: '#CC3531',
  },

  timerContainer:{
    flexDirection: 'row'
  }
});
