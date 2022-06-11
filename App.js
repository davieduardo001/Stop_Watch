import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import moment from 'moment'

const DATA = {
  timer: 1234567,
  laps: [12345, 2344, 31254, 3124342],
}

function Timer({ interval, style }){
  const duration = moment.duration(interval)
  const centiseconds = Math.floor(duration.milliseconds() / 10)
  return (
      <Text style={style}>
        {duration.minutes()}:{duration.seconds()},{centiseconds}
      </Text>
  )
}

function RoundButton({ title, color, background }) {
  return (
    <View style={[ styles.button ,{backgroundColor:background} ]}>
      <View style={styles.buttonBorder}>
        <Text style={[ styles.buttonTitle, {color}]}>{title}</Text>
      </View>
    </View>
  )
}

function Lap({number, interval}) {
  return(<View style={styles.lap}>
    <Text style={styles.lapText}>Lap {number}</Text>
    <Timer style={styles.lapText} interval={interval}/>
  </View>)
}

function LapsTable({laps}) {
  return(
    <ScrollView style={styles.scrollView}>
      {laps.map((lap, index) =>
        <Lap 
          number={laps.length - index} 
          key={laps.length - index} 
          interval={lap}
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
  render(){
    return(
      <View style={[styles.container]}>
        <Timer interval={DATA.timer} style={styles.timer}/>

        <ButtonsRow>
          <RoundButton title='Reset' color='#FFFFFF' background='#3D3D3D'/>
          <RoundButton title='Start' color='#50D167' background='#1B361F'/>
        </ButtonsRow>

        <LapsTable laps={DATA.laps}/>
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
    fontSize: 17
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
  }
});
