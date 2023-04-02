// LIVE tab

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from '../../components/Themed';
import { StyleSheet } from 'react-native';
import { IScore, IEvent } from '../interfaces';
import Config from 'react-native-config';
import * as event_data from '../../data/2023/ES/_65288/event.json';
import * as round_1 from '../../data/2023/ES/_65288/MPO/rounds/1.json';
import * as round_2 from '../../data/2023/ES/_65288/MPO/rounds/2.json';
import * as round_3 from '../../data/2023/ES/_65288/MPO/rounds/3.json';
import { toArray } from '../../assets/helpers/arrays';
import { useTailwind } from 'tailwind-rn/dist';


const Scorecard = () => {
  const [scores, setScores] = useState<IScore[]>([]);
  const [event, setEvent] = useState<any>([]);
  const tw = useTailwind();
  
  const fetchEvent = async (tournId?: number) => {
    // try db first
    // try {

    // } catch (error) {
    //   console.error(error);
    // }

    // try API if not in db
    try {
      // const response = await fetch(`${Config.ROUND_URL}`);
      // const json = await response.json();
      // setScores(json.data.scores);
      setEvent(event_data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchScores = async (tournId?: number, division?: string, round?: number) => {
    // toArray(round_data);
    try {
      // const response = await fetch(`${Config.ROUND_URL?TournID=${tournId}&Division=${division}&Round=${round}}`);
      // const json = await response.json();
      // setScores(json.data.scores);
      const valid_scores = round_1?.data?.scores.map(player => {
        const valid_score: IScore = {
          ShortName: player.ShortName,
          Name: player?.Name,
          HoleScores: player?.HoleScores,
          GrandTotal: player?.GrandTotal,
        };

        if(player?.ScoreID === null) valid_score.ScoreID = `DNF-${valid_score.ShortName}`;

        return valid_score;
      });

      setScores(valid_scores);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {  
    const fetchData = async () => {
      await fetchEvent();
      fetchScores();
    };
    fetchData();
  }, []);

  const renderHole = (score: string, index: number) => {
    return <Text style={styles.score} key={index}>{score}</Text>;
  };

  const renderScores = (score: IScore, index: number) => {
    return (
      <View style={styles.row} key={index}>
        <Text style={styles.name}>{score?.ShortName}</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {score?.HoleScores?.map(renderHole)}
        </ScrollView>
        <Text style={styles.total}>{score?.GrandTotal}</Text>
      </View>
    );
  };

  // console.log(event);

  return (
    <ScrollView style={styles.container}>
      <View style={tw('justify-center')}>
        <Text style={tw('text-center text-xl')}>{event?.data?.Name}</Text>
        <Text style={tw('text-center text-lg')}>{event?.data?.DateRange}</Text>
        <Text style={tw('text-center text-lg')}>{event?.data?.LocationShort}</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.name}>Name</Text>
        {[...Array(18)].map((_, i) => (
          <Text style={styles.headerText} key={i}>{i + 1}</Text>
        ))}
        <Text style={styles.total}>Total</Text>
      </View>
      {scores.map(renderScores)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#555555',
    textAlign: 'center',
    width: 35
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333333',
    textAlign: 'left',
    width: 80
  },
  score: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
    width: 35
  },
  total: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    width: 35
  }
});

export default Scorecard;
