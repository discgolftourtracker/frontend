// LIVE tab

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button } from '../../components/Themed';
import { StyleSheet } from 'react-native';
import { IScore, IEvent } from '../interfaces';
import Config from 'react-native-config';
import * as event_data from '../../data/_65288/event.json';
import * as round_1 from '../../data/_65288/MPO/rounds/1.json';
import * as round_2 from '../../data/_65288/MPO/rounds/2.json';
import * as round_3 from '../../data/_65288/MPO/rounds/3.json';
import { joinArray, toArray } from '../../assets/helpers/arrays';
import { useTailwind } from 'tailwind-rn/dist';

interface IAllScores {
  round: number,
  division: string,
  scores: IScore[]
}

const Scorecard = () => {
  const [scores, setScores] = useState<IScore[]>([]);
  const [event, setEvent] = useState<any>([]);
  const [rounds, setRounds] = useState<any>([]);
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

  const roundsToFetch = () => {
    const all_rounds: any[] = [];
    const all_divisions: string[] = event?.data?.Divisions.map((div: { Division: string, LatestRound: string }) => {
      return {
        division: div.Division,
        rounds: parseInt(div.LatestRound)
      }});

    // const projects = require('../projects/_legacy');

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
          RoundtoPar: player?.RoundtoPar,
          RunningPlace: player?.RunningPlace,
          RoundScore: parseInt(String(player?.RoundScore)),
          Played: player?.Played
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
    return <Text style={tw('text-sm text-center w-9 text-gray-500')} key={index}>{score}</Text>;
  };

  const renderButton = (round: number) => {
    return <Text style={tw('p-1')}>{`R${round}`}</Text>;
  };

  const renderButtons = (current_round: number, index: number) => {
    return (
      <View style={tw('border-2 border-white mx-1')} key={index}>
        {renderButton(current_round)}
      </View>
    );
  };

  const renderScores = (score: IScore, index: number) => {
    return (
      <View style={styles.row} key={index}>
        <Text style={tw('font-bold text-gray-500 text-base text-center w-12')}>{score?.RunningPlace}</Text>
        <Text numberOfLines={1} ellipsizeMode='tail' style={tw('flex-row text-xs text-gray-200 text-left w-32')}>{score?.Name}</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {/* {score?.HoleScores?.map(renderHole)} */}
        </ScrollView>
        <View style={tw('flex-row justify-end flex-1')}>
          <Text style={tw('font-bold text-gray-500 text-center w-12')}>{score?.GrandTotal > 500 ? 'DNF' : (score?.GrandTotal) - ((score?.RoundScore - score?.RoundtoPar) * 3)}</Text>
          <Text style={tw('font-bold text-gray-500 text-center w-12')}>{score?.GrandTotal > 500 ? 'DNF' : score?.RoundtoPar}</Text>
          <Text style={tw('font-bold text-gray-500 text-center w-12')}>{score?.Played === 18 ? 'F' : score?.Played}</Text>
          {/* <Text style={tw('font-bold text-gray-500 text-left text-base w-12 text-center')}>{score?.GrandTotal}</Text> */}
        </View>
      </View>
    );
  };

  // console.log(event);

  return (
    <ScrollView style={tw('flex-1 p-1')}>
      <View style={tw('justify-center')}>
        <Text style={tw('text-center text-xl')}>{event?.data?.Name}</Text>
        <Text style={tw('text-center text-lg')}>{event?.data?.DateRange}</Text>
        <Text style={tw('text-center text-lg')}>{event?.data?.LocationShort}</Text>
      </View>

      <View style={tw('flex-row justify-center')}>{[1, 2, 3].map(renderButtons)}</View>

      <View style={styles.row}>
        <Text style={tw('font-bold text-gray-500 text-center w-12')}>#</Text>
        <Text style={tw('font-bold text-gray-500 text-left w-32')}>Name</Text>
        {/* {[...Array(18)].map((_, i) => (
          <Text style={tw('font-bold text-sm text-gray-500 text-center w-9')} key={i}>{i + 1}</Text>
        ))} */}

        <View style={tw('flex-row justify-end flex-1')}>
          <Text style={tw('font-bold text-gray-500 text-center w-12')}>Total</Text>
          <Text style={tw('font-bold text-gray-500 text-center w-12')}>Rd</Text>
          <Text style={tw('font-bold text-gray-500 text-center w-12')}>Thru</Text>
        </View>
      </View>
      {scores.map(renderScores)}
      <Text style={tw('font-bold text-gray-500 text-center my-4')}>Data from PDGA</Text>
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
  },
  // truncate: {
  //   text-overflow: ellipsis
  // }
});

export default Scorecard;
