// LIVE tab

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button } from '../../components/Themed';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { IScore, IEvent, IHoles } from '../interfaces';
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
  const [holes, setHoles] = useState<IHoles[]>([]);
  const [rounds, setRounds] = useState<any>([]);
  const [cardMoreInfo, setCardMoreInfo] = useState<boolean>(false);
  const tw = useTailwind();

  const collapsed_card_style = 'flex-row items-center justify-between border-b-white border-b py-1';
  const expanded_card_style = 'flex-row items-center justify-between border-b-white border-0 py-1';

  const toggleCardVisibility = (index: number) => {
    setScores(
      scores.map((score, i) =>
        i === index ? { ...score, expanded: !score.expanded } : score
      )
    );
  };
  
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
      }
    });
  };

  const fetchScores = async (tournId?: number, division?: string, round?: number) => {
    // toArray(round_data);
    try {
      // const response = await fetch(`${Config.ROUND_URL?TournID=${tournId}&Division=${division}&Round=${round}}`);
      // const json = await response.json();
      // setScores(json.data.scores);
      const valid_scores = round_1?.data?.scores.map((player, idx) => {
        const valid_score: IScore = {
          id: idx,
          expanded: false,
          ShortName: player.ShortName,
          Name: player?.Name,
          HoleScores: player?.HoleScores,
          GrandTotal: player?.GrandTotal,
          RoundtoPar: player?.RoundtoPar,
          RunningPlace: player?.RunningPlace,
          Tied: player?.Tied,
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

  const fetchHoles = async () => {
    // toArray(round_data);
    try {
      // const response = await fetch(`${Config.ROUND_URL?TournID=${tournId}&Division=${division}&Round=${round}}`);
      // const json = await response.json();
      // setScores(json.data.scores);
      setHoles(round_1?.data?.holes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {  
    const fetchData = async () => {
      await fetchEvent();
      fetchScores();
      fetchHoles();
    };
    fetchData();
  }, []);

  const determineScoreColor = (score: number, par: number): string => {
    const par_tw = '';
    const birdie_tw = 'bg-blue-600';
    const eagle_tw = 'bg-blue-800';
    const albatross_tw = 'bg-blue-900';
    const ace_tw = 'bg-emerald-500';
    const bogey_tw = 'bg-red-500';
    const double_bogey_tw = 'bg-red-700';
    const bigger_bogey_tw = 'bg-red-900';

    if((par - score) === 0) return par_tw;
    else if((par - score) === 1) return birdie_tw;
    
    else if(score === 1) return ace_tw;
    else if((par - score) === 2 && score !== 1) return eagle_tw;
    else if((par - score) === 3 && score !== 1) return albatross_tw;

    else if((par - score) === -1) return bogey_tw;
    else if((par - score) === -2) return double_bogey_tw;
    else if((par - score) <= -3) return bigger_bogey_tw;

    else return par_tw;
  };

  const renderHole = (score: string, index: number) => {
    return (
      <View style={tw('flex-col')} key={index}>
        <Text style={tw('text-xs text-center w-10 text-gray-500')}>{index + 1}</Text>
        <Text style={tw('text-xs text-center w-10 text-gray-500')}>{holes[index].Length}</Text>
        <Text style={tw('text-xs text-center w-10 text-gray-500')}>{holes[index].Par}</Text>
        <View style={tw(determineScoreColor(parseInt(score), holes[index].Par))}>
          <Text style={tw('text-sm text-center w-10')}>{score}</Text>
        </View>
      </View>
    )
  };

  const renderButton = (round: number) => {
    return <Text style={tw('p-1')}>{`R${round}`}</Text>;
  };

  const renderButtons = (current_round: number, index: number) => {
    return (
      <View style={tw('border-2 mx-1')} key={index}>
        {renderButton(current_round)}
      </View>
    );
  };

  const renderScores = (score: IScore, index: number) => {
    return (
      <View key={index}>
        <TouchableOpacity activeOpacity={1} onPress={() => toggleCardVisibility(index)}
          style={!score.expanded ? tw(collapsed_card_style) : tw(expanded_card_style)}
        >
          <Text style={tw('font-bold text-xs text-gray-500 text-center w-12')}>{score?.Tied ? `T${score?.RunningPlace}` : score?.RunningPlace}</Text>
          <Text numberOfLines={1} ellipsizeMode='tail' style={tw('flex-row text-xs text-left w-32')}>{score?.Name}</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            
          </ScrollView>
          <View style={tw('flex-row justify-end flex-1')}>
            <Text style={tw('font-bold text-gray-500 text-center w-12')}>{score?.GrandTotal > 500 ? 'DNF' : (score?.GrandTotal) - ((score?.RoundScore - score?.RoundtoPar) * 3)}</Text>
            <Text style={tw('font-bold text-gray-500 text-center w-12')}>{score?.GrandTotal > 500 ? 'DNF' : score?.RoundtoPar === 0 ? 'E' : score?.RoundtoPar}</Text>
            <Text style={tw('font-bold text-gray-500 text-center w-12')}>{score?.Played === 18 ? 'F' : score?.Played}</Text>
            {/* <Text style={tw('font-bold text-gray-500 text-left text-base w-12 text-center')}>{score?.GrandTotal}</Text> */}
          </View>
        </TouchableOpacity>
        {score.expanded && (
          <View style={tw('flex-row justify-center h-52 border-b-white border-b py-1')}>
            <View style={tw('flex-row flex-wrap justify-center')}>
              {score?.HoleScores?.map(renderHole)}
            </View>
          </View>
        )}
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

      <View style={tw('flex-row items-center justify-between border-b-white border-b py-1')}>
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

export default Scorecard;
