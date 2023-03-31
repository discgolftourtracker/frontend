import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from '../../components/Themed';
import { StyleSheet } from 'react-native';
import { IScore } from '../interfaces';
import Config from 'react-native-config';
import data from '../data.json';

const Scorecard = () => {
  const [scores, setScores] = useState<IScore[]>([]);

  const fetchScores = async () => {
    try {
      // const response = await fetch(`${Config.ROUND_URL}`);
      // const json = await response.json();
      // setScores(json.data.scores);
      const valid_scores = data?.data?.scores.map(player => {
        const valid_score: IScore = {
          ShortName: player.ShortName,
          HoleScores: player?.HoleScores,
          GrandTotal: player?.GrandTotal
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
    fetchScores();
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

  return (
    <ScrollView style={styles.container}>
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
